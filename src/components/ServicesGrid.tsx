import { servicesContent as content } from '../content/site';
import { SectionHeading } from './shared';

export function ServicesGrid() {
  return (
    <section id={content.sectionId} className="services-section">
      <SectionHeading>{content.heading}</SectionHeading>
      <div className="services-grid">
        {content.services.map((service) => (
          <article className="service-card" key={service.title}>
            <img
              src={`/assets/icons/${service.icon}.svg`}
              alt=""
              aria-hidden="true"
              width="34"
              height="34"
            />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
        <aside className="guidance-card">
          <h3>{content.guidance.heading}</h3>
          <p>{content.guidance.body}</p>
          <a href={content.guidance.cta.target} aria-label={content.guidance.cta.label}>
            {content.guidance.cta.label}<span aria-hidden="true"> →</span>
          </a>
        </aside>
      </div>
    </section>
  );
}
