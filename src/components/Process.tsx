import { processContent as content } from '../content/site'; import { SectionHeading } from './shared';
export function Process(){return <section id={content.sectionId} className="subsection"><SectionHeading>{content.heading}</SectionHeading><ol className="process-grid">{content.steps.map(s=><li key={s.order}><span>{s.order}</span><h3>{s.title}</h3><p>{s.description}</p></li>)}</ol></section>}
