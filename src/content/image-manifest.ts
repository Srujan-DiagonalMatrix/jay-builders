import needHelpBase64 from '../../requirements/image-assets/NeedHelp.png.base64?raw';
import spotlightMain from '../../assets-source/images/spotlight/main.png.base64?raw';
import spotlightDetail01 from '../../assets-source/images/spotlight/detail-01.png.base64?raw';
import spotlightDetail02 from '../../assets-source/images/spotlight/detail-02.png.base64?raw';
import spotlightDetail03 from '../../assets-source/images/spotlight/detail-03.png.base64?raw';
import spotlightDetail04 from '../../assets-source/images/spotlight/detail-04.png.base64?raw';

export type ImageSection = 'Header' | 'CustomerSays' | 'OurWork' | 'OutDatedProp' | 'UrgentAssis';
export type ImageClassification = 'meaningful' | 'decorative';
export interface ImageVariant { format: 'avif' | 'webp'; width: 480 | 960 | 1440; height: number; src: string; }
export interface ImageAsset { id: string; section: ImageSection; reference: string; purpose: string; alt: string; classification: ImageClassification; sourceFilename: string; cropRatio: `${number}:${number}`; focalPoint: { x: number; y: number }; width: number; height: number; variants: ImageVariant[]; inlineSrc?: string; }
const dimensions=(ratio:string,width:number)=>{const [x,y]=ratio.split(':').map(Number);return Math.round(width*y/x)};
const asset=(id:string,section:ImageSection,reference:string,purpose:string,alt:string,ratio:`${number}:${number}`,focalPoint={x:50,y:50}):ImageAsset=>({id,section,reference,purpose,alt,classification:alt?'meaningful':'decorative',sourceFilename:`${id}.png`,cropRatio:ratio,focalPoint,width:1440,height:dimensions(ratio,1440),variants:(['webp','avif'] as const).flatMap(format=>([480,960,1440] as const).map(width=>({format,width,height:dimensions(ratio,width),src:`/assets/images/${id}-${width}.${format}`})))});
const projectAlt=['Full property renovation interior','Rear home extension','Kitchen transformation','Bathroom renovation','Driveway and landscaping project','Roofing and exterior renovation'];
export const imageManifest:readonly ImageAsset[]=[
 asset('Header-hero','Header','Header.png','Primary hero kitchen renovation','Contemporary kitchen after a complete renovation','16:9',{x:70,y:48}),
 asset('CustomerSays-story-01','CustomerSays','CustomerSays.png','Customer story video thumbnail','Completed open-plan kitchen renovation','16:9'),
 asset('CustomerSays-story-02','CustomerSays','CustomerSays.png','Customer story video thumbnail','Completed rear kitchen extension','16:9'),
 asset('CustomerSays-story-03','CustomerSays','CustomerSays.png','Customer story video thumbnail','Completed modern bathroom renovation','16:9'),
 ...projectAlt.flatMap((alt,index)=>{const number=String(index+1).padStart(2,'0');return [asset(`OurWork-project-${number}-before`,'OurWork','OurWork.png','Before view for project comparison',`${alt} before work began`,'4:3'),asset(`OurWork-project-${number}-after`,'OurWork','OurWork.png','After view for project comparison',`${alt} after completion`,'4:3')]}),
 {...asset('OutdatedProp-spotlight-main','OutDatedProp','main.png','Project Spotlight main image','Renovated open-plan kitchen with a central island, dining area and garden doors','341:119',{x:50,y:48}),sourceFilename:'main.png',width:341,height:119,inlineSrc:`data:image/png;base64,${spotlightMain.replace(/\s/g,'')}`},
 {...asset('OutdatedProp-spotlight-detail-01','OutDatedProp','detail-01.png','Project Spotlight kitchen view','Renovated kitchen cabinetry and worktops','83:52'),sourceFilename:'detail-01.png',width:83,height:52,inlineSrc:`data:image/png;base64,${spotlightDetail01.replace(/\s/g,'')}`},
 {...asset('OutdatedProp-spotlight-detail-02','OutDatedProp','detail-02.png','Project Spotlight dining view','Open-plan dining area beside the renovated kitchen','81:52'),sourceFilename:'detail-02.png',width:81,height:52,inlineSrc:`data:image/png;base64,${spotlightDetail02.replace(/\s/g,'')}`},
 {...asset('OutdatedProp-spotlight-detail-03','OutDatedProp','detail-03.png','Project Spotlight living view','Bright living area in the completed renovation','81:52'),sourceFilename:'detail-03.png',width:81,height:52,inlineSrc:`data:image/png;base64,${spotlightDetail03.replace(/\s/g,'')}`},
 {...asset('OutdatedProp-spotlight-detail-04','OutDatedProp','detail-04.png','Project Spotlight island view','Kitchen island and garden doors in the completed renovation','81:52'),sourceFilename:'detail-04.png',width:81,height:52,inlineSrc:`data:image/png;base64,${spotlightDetail04.replace(/\s/g,'')}`},
 {...asset('NeedHelp','UrgentAssis','NeedHelp.png','Decorative urgent-assistance vehicle treatment','','16:9',{x:50,y:68}),inlineSrc:`data:image/png;base64,${needHelpBase64.replace(/\s/g,'')}`},
] as const;
export function getImageAsset(id:string):ImageAsset{const found=imageManifest.find(image=>image.id===id);if(!found)throw new Error(`Unknown image asset: ${id}`);return found}
