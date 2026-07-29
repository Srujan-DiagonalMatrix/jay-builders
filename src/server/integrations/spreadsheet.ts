import { createSign } from 'node:crypto';

export const ENQUIRY_COLUMNS = ['enquiry ID','received timestamp in UTC','full name','email','phone','postcode','type of work','estimated start date','budget','preferred contact method','description','upload references','submission status','request/source metadata'] as const;

export type SpreadsheetEnquiry = {
  enquiryId:string; receivedAt:string; fullName:string; email:string; phone:string; postcode:string;
  workType:string; startDate?:string; budget?:string; contactMethod:string; description:string;
  uploadReferences:readonly string[]; status:string; metadata:Record<string,string>;
};
export interface SpreadsheetAdapter { appendEnquiry(enquiry:SpreadsheetEnquiry):Promise<'appended'|'duplicate'> }
export type SpreadsheetConfig={spreadsheetId:string;sheetName:string;clientEmail:string;privateKey:string};

export function neutralizeCell(value:string):string { return /^[=+\-@]/.test(value.trimStart()) ? `'${value}` : value; }
export function enquiryRow(e:SpreadsheetEnquiry):string[]{
  const values=[e.enquiryId,e.receivedAt,e.fullName,e.email,e.phone,e.postcode,e.workType,e.startDate??'',e.budget??'',e.contactMethod,e.description,e.uploadReferences.join('\n'),e.status,JSON.stringify(e.metadata)];
  return values.map(neutralizeCell);
}
const b64=(input:string|Buffer)=>Buffer.from(input).toString('base64url');
async function accessToken(config:SpreadsheetConfig,fetcher:typeof fetch):Promise<string>{
  const now=Math.floor(Date.now()/1000),header=b64(JSON.stringify({alg:'RS256',typ:'JWT'})),claims=b64(JSON.stringify({iss:config.clientEmail,scope:'https://www.googleapis.com/auth/spreadsheets',aud:'https://oauth2.googleapis.com/token',iat:now,exp:now+3600}));
  const unsigned=`${header}.${claims}`,signer=createSign('RSA-SHA256');signer.update(unsigned);const assertion=`${unsigned}.${signer.sign(config.privateKey,'base64url')}`;
  const response=await fetcher('https://oauth2.googleapis.com/token',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion})});
  if(!response.ok)throw new Error('spreadsheet_auth_failed');const body=await response.json() as {access_token?:string};if(!body.access_token)throw new Error('spreadsheet_auth_failed');return body.access_token;
}
export class GoogleSheetsAdapter implements SpreadsheetAdapter{
  private pending=new Map<string,Promise<'appended'|'duplicate'>>();
  constructor(private config:SpreadsheetConfig,private fetcher:typeof fetch=fetch){}
  appendEnquiry(enquiry:SpreadsheetEnquiry){const active=this.pending.get(enquiry.enquiryId);if(active)return active;const operation=this.append(enquiry).finally(()=>this.pending.delete(enquiry.enquiryId));this.pending.set(enquiry.enquiryId,operation);return operation;}
  private async append(enquiry:SpreadsheetEnquiry):Promise<'appended'|'duplicate'>{
    const token=await accessToken(this.config,this.fetcher),base=`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(this.config.spreadsheetId)}/values`,range=encodeURIComponent(`${this.config.sheetName}!A:A`),headers={authorization:`Bearer ${token}`};
    const existing=await this.fetcher(`${base}/${range}?majorDimension=COLUMNS`,{headers});if(!existing.ok)throw new Error('spreadsheet_read_failed');const values=(await existing.json() as {values?:string[][]}).values?.[0]??[];if(values.includes(enquiry.enquiryId))return 'duplicate';
    const target=encodeURIComponent(`${this.config.sheetName}!A:N`),response=await this.fetcher(`${base}/${target}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,{method:'POST',headers:{...headers,'content-type':'application/json'},body:JSON.stringify({values:[enquiryRow(enquiry)]})});
    if(!response.ok)throw new Error('spreadsheet_append_failed');return 'appended';
  }
}
export function spreadsheetConfig(env:NodeJS.ProcessEnv=process.env):SpreadsheetConfig{
  const spreadsheetId=env.GOOGLE_SHEETS_SPREADSHEET_ID, sheetName=env.GOOGLE_SHEETS_TAB_NAME,clientEmail=env.GOOGLE_SERVICE_ACCOUNT_EMAIL,privateKey=env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g,'\n');
  if(!spreadsheetId||!sheetName||!clientEmail||!privateKey)throw new Error('spreadsheet_configuration_missing');return{spreadsheetId,sheetName,clientEmail,privateKey};
}
