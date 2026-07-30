import { servicesContent as content } from '../content/site';
import { SectionHeading } from './shared';

export function ServicesGrid() {
  return (
    <section id={content.sectionId} className="services-section">
      <SectionHeading>{content.heading}</SectionHeading>
      <div className="services-grid">
        {content.services.map((service) => (
          <article className="service-card" key={service.title}>
            <span className="service-card__icon" aria-hidden="true">
              <img
                src={`/assets/icons/${service.icon}.svg`}
                alt=""
                width="52"
                height="52"
              />
            </span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
