import { useEffect, useRef, useState } from 'react';
import { bathroomRenovationThumbnail } from '../content/bathroom-renovation-thumbnail';
import { headerHeroImage as headerHero } from '../content/header-hero-image';
import { headerHeroContent as content } from '../content/site';

export function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const videoTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isVideoOpen) return;
    const trigger = videoTriggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector<HTMLButtonElement>('.modal-close')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsVideoOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [isVideoOpen]);

  return (
    <>
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
          <blockquote className="hero-testimonial">
            <button ref={videoTriggerRef} type="button" className="hero-testimonial__video" aria-label="Play Bathroom Renovation customer testimonial" onClick={() => setIsVideoOpen(true)}>
              <img src={bathroomRenovationThumbnail} alt="" width="1672" height="941" decoding="async" />
              <span className="hero-testimonial__play" aria-hidden="true">▶</span>
            </button>
            <div>“{content.featuredCustomerQuote.quote}”<cite>— {content.featuredCustomerQuote.attribution}</cite></div>
          </blockquote>
        </div>
      </div>
    </section>
    {isVideoOpen && <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setIsVideoOpen(false); }}><div ref={dialogRef} className="video-modal" role="dialog" aria-modal="true" aria-labelledby="hero-video-title"><button type="button" className="modal-close" aria-label="Close customer testimonial" onClick={() => setIsVideoOpen(false)}>×</button><h2 id="hero-video-title">Bathroom Renovation</h2><iframe src="https://www.youtube-nocookie.com/embed/tOwjEOt1zYU?autoplay=1" title="Bathroom Renovation customer testimonial video" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/><p>Slough · 1:15</p></div></div>}
    </>
  );
}
