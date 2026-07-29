import { processSteps } from '../content/site'; import { SectionHeading } from './shared';
export function Process(){return <section id="process" className="subsection"><SectionHeading>A clear &amp; simple process</SectionHeading><ol className="process-grid">{processSteps.map(s=><li key={s.id}><span>{s.order}</span><h3>{s.title}</h3><p>{s.description}</p></li>)}</ol></section>}
