import { projectSpotlightContent as content } from '../content/site';
import { getImageAsset } from '../content/image-manifest';
import { SectionHeading } from './shared';
import { ResponsiveImage } from './ResponsiveImage';
import spotlightReference from '../../requirements/image-assets/section-references/OutDatedProp.png';

export function ProjectSpotlight() {
  return (
    <section id={content.sectionId} className="section">
      <div className="container spotlight-grid">
        <ResponsiveImage
          className="spotlight-gallery"
          asset={getImageAsset('OutDatedProp-project-spotlight')}
          sizes="(max-width: 575px) 100vw, (max-width: 991px) 100vw, 44vw"
          staticSource={{ src: spotlightReference, width: 814, height: 182 }}
        />
        <div className="spotlight-copy">
          <SectionHeading eyebrow={content.eyebrow}>
            {content.heading[0]}<br />{content.heading[1]}
          </SectionHeading>
          <p>{content.body}</p>
          <ul>{content.scope.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <blockquote className="spotlight-quote">
          “{content.testimonial.quote}”
          <cite>— {content.testimonial.attribution}</cite>
          <a className="button button--gold" href={content.cta.target}>{content.cta.label}</a>
        </blockquote>
      </div>
    </section>
  );
}
