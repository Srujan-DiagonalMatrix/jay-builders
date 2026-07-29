import { headerHeroImage as headerHero } from '../content/header-hero-image';
import { headerHeroContent as content } from '../content/site';

export function Hero() {
  return (
    <section id={content.sectionId} className="hero" aria-labelledby="hero-title">
      <div className="hero-media">
        <img
          src={headerHero}
          srcSet={`${headerHero} 813w`}
          sizes="100vw"
          width="1440"
          height="810"
          alt="Contemporary kitchen after a complete renovation"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
      </div>
      <div className="container hero-inner">
        <div className="hero-copy">
          <h1 id="hero-title">{content.headline[0]}<br/><strong>{content.headline[1]}</strong></h1>
          <p className="hero-subhead">{content.subhead[0]}<br/>{content.subhead[1]}</p>
          <ul className="trust-list">{content.trustPoints.map(point=><li key={point}>{point}</li>)}</ul>
          <div className="hero-actions">
            <a className="button button--gold" href={content.primaryCta.target}>{content.primaryCta.label}</a>
            <a className="button button--outline" href={content.secondaryCta.target}>{content.secondaryCta.label}</a>
          </div>
          <blockquote>“{content.featuredCustomerQuote.quote}”<cite>— {content.featuredCustomerQuote.attribution}</cite></blockquote>
        </div>
      </div>
    </section>
  );
}
