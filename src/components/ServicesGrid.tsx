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
          <span className="guidance-card__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M4 13v-2a8 8 0 0 1 16 0v2" />
              <path d="M5.5 12H4.75A1.75 1.75 0 0 0 3 13.75v2.5C3 17.22 3.78 18 4.75 18H6v-6h-.5ZM18 12h1.25c.97 0 1.75.78 1.75 1.75v2.5c0 .97-.78 1.75-1.75 1.75H18v-6Z" />
              <path d="M18 18c0 1.1-.9 2-2 2h-2M14 20h-2" />
            </svg>
          </span>
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
