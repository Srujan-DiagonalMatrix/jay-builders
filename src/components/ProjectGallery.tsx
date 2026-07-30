import { bathroomRenovationProjectThumbnail } from '../content/bathroom-renovation-project-thumbnail';
import { drivewayLandscapingThumbnail } from '../content/driveway-landscaping-thumbnail';
import { fullPropertyRenovationThumbnail } from '../content/full-property-renovation-thumbnail';
import { getImageAsset } from '../content/image-manifest';
import { kitchenTransformationThumbnail } from '../content/kitchen-transformation-thumbnail';
import { rearExtensionThumbnail } from '../content/rear-extension-thumbnail';
import { roofingExteriorThumbnail } from '../content/roofing-exterior-thumbnail';
import { ourWorkContent as content } from '../content/site';
import { ResponsiveImage } from './ResponsiveImage';
import { SectionHeading } from './shared';

type SuppliedThumbnail = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const suppliedThumbnails: Partial<
  Record<(typeof content.projects)[number]['title'], SuppliedThumbnail>
> = {
  'Full Property Renovation': {
    src: fullPropertyRenovationThumbnail,
    alt: 'Full property renovation before and after',
    width: 1578,
    height: 997,
  },
  'Rear Extension': {
    src: rearExtensionThumbnail,
    alt: 'Rear extension before and after',
    width: 1573,
    height: 1000,
  },
  'Kitchen Transformation': {
    src: kitchenTransformationThumbnail,
    alt: 'Kitchen transformation before and after',
    width: 1536,
    height: 1024,
  },
  'Bathroom Renovation': {
    src: bathroomRenovationProjectThumbnail,
    alt: 'Bathroom renovation before and after',
    width: 1528,
    height: 1029,
  },
  'Driveway & Landscaping': {
    src: drivewayLandscapingThumbnail,
    alt: 'Driveway and landscaping before and after',
    width: 1536,
    height: 1024,
  },
  'Roofing & Exterior': {
    src: roofingExteriorThumbnail,
    alt: 'Roofing and exterior renovation before and after',
    width: 1900,
    height: 828,
  },
};

export function ProjectGallery() {
  return (
    <section id={content.sectionId} className="section section--soft">
      <div className="container">
        <SectionHeading>{content.heading}</SectionHeading>

        <div className="projects-grid">
          {content.projects.map((project, index) => {
            const id = `OurWork-project-${String(index + 1).padStart(2, '0')}`;
            const thumbnail = suppliedThumbnails[project.title];

            return (
              <article className="project-card" key={project.title}>
                <div
                  className={`project-image${
                    thumbnail ? ' project-image--combined' : ''
                  }`}
                >
                  {thumbnail ? (
                    <img
                      src={thumbnail.src}
                      alt={thumbnail.alt}
                      width={thumbnail.width}
                      height={thumbnail.height}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <>
                      <ResponsiveImage
                        asset={getImageAsset(`${id}-before`)}
                        sizes="(max-width: 575px) 50vw, 17vw"
                      />

                      <ResponsiveImage
                        asset={getImageAsset(`${id}-after`)}
                        sizes="(max-width: 575px) 50vw, 17vw"
                      />

                      <span aria-hidden="true">Before</span>
                      <span aria-hidden="true">After</span>
                    </>
                  )}
                </div>

                <h3>{project.title}</h3>

                <p>
                  {project.location} <b>{project.duration}</b>
                </p>
              </article>
            );
          })}
        </div>

        <a
          className="button button--navy centered-button"
          href={content.cta.target}
        >
          {content.cta.label}
        </a>
      </div>
    </section>
  );
}
