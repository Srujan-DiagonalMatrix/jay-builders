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
              <path d="M8 7V5.75C8 4.78 8.78 4 9.75 4h4.5C15.22 4 16 4.78 16 5.75V7M5.75 7h12.5C19.22 7 20 7.78 20 8.75v8.5c0 .97-.78 1.75-1.75 1.75H5.75C4.78 19 4 18.22 4 17.25v-8.5C4 7.78 4.78 7 5.75 7Z" />
              <path d="M4 11.5h16M10 11.5v2h4v-2" />
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
