export type ImageSection = 'Header' | 'CustomerSays' | 'OurWork' | 'OutDatedProp' | 'UrgentAssis';
export type ImageClassification = 'meaningful' | 'decorative';
export interface ImageVariant { format: 'avif' | 'webp'; width: 480 | 960 | 1440; height: number; src: string; }
export interface ImageAsset { id: string; section: ImageSection; reference: string; purpose: string; alt: string; classification: ImageClassification; sourceFilename: string; cropRatio: `${number}:${number}`; focalPoint: { x: number; y: number }; width: number; height: number; variants: ImageVariant[]; }
const dimensions=(ratio:string,width:number)=>{const [x,y]=ratio.split(':').map(Number);return Math.round(width*y/x)};
const asset=(id:string,section:ImageSection,reference:string,purpose:string,alt:string,ratio:`${number}:${number}`,focalPoint={x:50,y:50}):ImageAsset=>({id,section,reference,purpose,alt,classification:alt?'meaningful':'decorative',sourceFilename:`${id}.png`,cropRatio:ratio,focalPoint,width:1440,height:dimensions(ratio,1440),variants:(['webp','avif'] as const).flatMap(format=>([480,960,1440] as const).map(width=>({format,width,height:dimensions(ratio,width),src:`/assets/images/${id}-${width}.${format}`})))});
const projectAlt=['Full property renovation interior','Rear home extension','Kitchen transformation','Bathroom renovation','Driveway and landscaping project','Roofing and exterior renovation'];
export const imageManifest:readonly ImageAsset[]=[
 asset('Header-hero','Header','Header.png','Primary hero kitchen renovation','Contemporary kitchen after a complete renovation','16:9',{x:70,y:48}),
 asset('CustomerSays-story-01','CustomerSays','CustomerSays.png','Customer story video thumbnail','Completed open-plan kitchen renovation','16:9'),
 asset('CustomerSays-story-02','CustomerSays','CustomerSays.png','Customer story video thumbnail','Completed rear kitchen extension','16:9'),
 asset('CustomerSays-story-03','CustomerSays','CustomerSays.png','Customer story video thumbnail','Completed modern bathroom renovation','16:9'),
 ...projectAlt.flatMap((alt,index)=>{const number=String(index+1).padStart(2,'0');return [asset(`OurWork-project-${number}-before`,'OurWork','OurWork.png','Before view for project comparison',`${alt} before work began`,'4:3'),asset(`OurWork-project-${number}-after`,'OurWork','OurWork.png','After view for project comparison',`${alt} after completion`,'4:3')]}),
 asset('OutDatedProp-project-spotlight','OutDatedProp','OutDatedProp.png','Project spotlight before-and-after composite','Before-and-after views of a renovated home exterior, kitchen and bathroom','407:91'),
 asset('UrgentAssis-background','UrgentAssis','UrgentAssis.png','Decorative urgent-assistance vehicle treatment','','3:4',{x:50,y:68}),
] as const;
export function getImageAsset(id:string):ImageAsset{const found=imageManifest.find(image=>image.id===id);if(!found)throw new Error(`Unknown image asset: ${id}`);return found}
