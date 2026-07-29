import { useState } from 'react';
import { projectSpotlightContent as content } from '../content/site';
import { getImageAsset } from '../content/image-manifest';
import { SectionHeading } from './shared';
import { ResponsiveImage } from './ResponsiveImage';

const imageIds = [
  'OutdatedProp-spotlight-main',
  'OutdatedProp-spotlight-detail-01',
  'OutdatedProp-spotlight-detail-02',
  'OutdatedProp-spotlight-detail-03',
  'OutdatedProp-spotlight-detail-04',
] as const;

export function ProjectSpotlight() {
  const [activeId, setActiveId] = useState<string>(imageIds[0]);
  const activeAsset = getImageAsset(activeId);

  return (
    <section id={content.sectionId} className="section spotlight-section">
      <div className="spotlight-grid">
        <div className="spotlight-gallery">
          <div className="spotlight-main">
            <ResponsiveImage
              key={activeId}
              asset={activeAsset}
              sizes="(max-width: 1024px) 100vw, 48vw"
              priority
            />
          </div>
          <div className="spotlight-thumbnails" aria-label="Project gallery">
            {imageIds.slice(1).map((id) => {
              const asset = getImageAsset(id);
              return (
                <button
                  key={id}
                  type="button"
                  className={activeId === id ? 'is-active' : undefined}
                  aria-label={`Show ${asset.alt}`}
                  onMouseEnter={() => setActiveId(id)}
                  onFocus={() => setActiveId(id)}
                  onClick={() => setActiveId(id)}
                >
                  <ResponsiveImage asset={asset} sizes="150px" />
                </button>
              );
            })}
          </div>
        </div>
        <div className="spotlight-copy">
          <SectionHeading eyebrow={content.eyebrow}>
            {content.heading[0]}<br />{content.heading[1]}
          </SectionHeading>
          <p>{content.body}</p>
          <ul>{content.scope.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <blockquote className="spotlight-quote">
          <p>“{content.testimonial.quote}”</p>
          <cite>— {content.testimonial.attribution}</cite>
          <a className="button button--gold" href={content.cta.target}>{content.cta.label}</a>
        </blockquote>
      </div>
    </section>
  );
}
