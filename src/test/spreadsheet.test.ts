import { describe,expect,it,vi } from 'vitest';
import { EnquiryService } from '../server/enquiries';
import { ENQUIRY_COLUMNS,enquiryRow,neutralizeCell,spreadsheetConfig,type SpreadsheetAdapter,type SpreadsheetEnquiry } from '../server/integrations/spreadsheet';

const enquiry=(overrides:Partial<SpreadsheetEnquiry>={}):SpreadsheetEnquiry=>({enquiryId:'enq-1',receivedAt:'2026-07-29T12:00:00.000Z',fullName:'Jane Builder',email:'jane@example.com',phone:'020 0000 0000',postcode:'SW1A 1AA',workType:'Renovation',contactMethod:'Email',description:'Details',uploadReferences:[],status:'received',metadata:{requestId:'req-1',source:'web-form'},...overrides});
const validForm=()=>{const form=new FormData();Object.entries({fullName:'Jane Builder',email:'jane@example.com',phone:'020 0000 0000',postcode:'SW1A 1AA',workType:'Complete Renovation',startDate:'',budget:'',contactMethod:'Email',description:'A detailed project description.',website:''}).forEach(([key,value])=>form.set(key,value));return form};

describe('spreadsheet mapping',()=>{
  it('maps all stable columns, UTC timestamps, and optional values',()=>{const row=enquiryRow(enquiry());expect(ENQUIRY_COLUMNS).toHaveLength(14);expect(row).toHaveLength(14);expect(row.slice(0,7)).toEqual(['enq-1','2026-07-29T12:00:00.000Z','Jane Builder','jane@example.com','020 0000 0000','SW1A 1AA','Renovation']);expect(row[7]).toBe('');expect(row[8]).toBe('');expect(row[11]).toBe('')});
  it.each(['=IMPORTDATA("bad")','+cmd','-2+3','@SUM(A1)'])('neutralizes formula input %s',value=>expect(neutralizeCell(`  ${value}`)).toBe(`'  ${value}`));
  it('reads credentials only from explicitly supplied server environment',()=>{expect(()=>spreadsheetConfig({})).toThrow('spreadsheet_configuration_missing');expect(spreadsheetConfig({GOOGLE_SHEETS_SPREADSHEET_ID:'id',GOOGLE_SHEETS_TAB_NAME:'Enquiries',GOOGLE_SERVICE_ACCOUNT_EMAIL:'service@example.test',GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY:'line1\\nline2'})).toEqual({spreadsheetId:'id',sheetName:'Enquiries',clientEmail:'service@example.test',privateKey:'line1\nline2'})});
});

describe('adapter contract',()=>{
  it('a fake adapter receives one ordered enquiry and deduplicates retries',async()=>{class FakeAdapter implements SpreadsheetAdapter{ids=new Set<string>();rows:SpreadsheetEnquiry[]=[];appendEnquiry(item:SpreadsheetEnquiry){if(this.ids.has(item.enquiryId))return Promise.resolve('duplicate' as const);this.ids.add(item.enquiryId);this.rows.push(item);return Promise.resolve('appended' as const)}}const fake=new FakeAdapter(),service=new EnquiryService(fake,undefined,()=>Date.parse('2026-07-29T12:00:00Z'),()=>{});expect((await service.handle(validForm(),'one','req-1','stable-id')).status).toBe(201);expect((await service.handle(validForm(),'two','req-2','stable-id')).status).toBe(201);expect(fake.rows).toHaveLength(1);expect(fake.rows[0].receivedAt).toBe('2026-07-29T12:00:00.000Z')});
  it('supports safe retry after a provider error',async()=>{const appendEnquiry=vi.fn().mockRejectedValueOnce(new Error('provider_error')).mockResolvedValueOnce('appended');const service=new EnquiryService({appendEnquiry},undefined,undefined,()=>{});expect((await service.handle(validForm(),'one','req-1','stable-id')).status).toBe(503);expect((await service.handle(validForm(),'two','req-2','stable-id')).status).toBe(201);expect(appendEnquiry).toHaveBeenCalledTimes(2)});
});
