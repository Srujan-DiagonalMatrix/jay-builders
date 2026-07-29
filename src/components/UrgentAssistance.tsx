import { urgentAssistanceContent as content } from '../content/site';
import { getImageAsset } from '../content/image-manifest';
import { ResponsiveImage } from './ResponsiveImage';

export function UrgentAssistance() {
  return (
    <aside id={content.sectionId} className="urgent-card" aria-labelledby="urgent-title">
      <div className="urgent-content">
        <span className="urgent-alert" aria-hidden="true">!</span>
        <h2 id="urgent-title">{content.heading[0]}<br />{content.heading[1]}</h2>
        <p>{content.body}</p>
        <a
          className="urgent-enquiry-button"
          href={content.secondaryCta.target}
          aria-label="Send an urgent property assistance enquiry"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          </svg>
          <span>{content.secondaryCta.label}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </a>
      </div>
      <ResponsiveImage
        asset={getImageAsset('NeedHelp')}
        sizes="(max-width: 991px) 100vw, 24vw"
        className="urgent-media"
      />
    </aside>
  );
}
