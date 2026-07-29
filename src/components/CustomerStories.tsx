import { useEffect, useRef, useState } from 'react';
import { customerSaysContent as content } from '../content/site';
import { getImageAsset } from '../content/image-manifest';
import { ResponsiveImage } from './ResponsiveImage';
import { SectionHeading } from './shared';

function storyImage(index: number) {
  return getImageAsset(`CustomerSays-story-0${index + 1}`);
}

export function CustomerStories() {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (active === null) return;
    const trigger = triggerRefs.current[active];
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector<HTMLButtonElement>('.modal-close')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'Tab' && dialogRef.current) {
        const controls = [...dialogRef.current.querySelectorAll<HTMLElement>('button, video[controls]')];
        const first = controls[0], last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [active]);

  const story = active === null ? null : content.stories[active];
  const activeImage = storyImage(active ?? 0);
  return <section id={content.sectionId} className="section"><div className="container"><SectionHeading eyebrow={content.subheading}>{content.heading}</SectionHeading><div className="stories-grid">{content.stories.map((s, i) => <article className="story-card" key={s.title}><button ref={node => { triggerRefs.current[i] = node; }} type="button" className="story-trigger" aria-label={`Play ${s.title} customer story`} onClick={() => setActive(i)}><ResponsiveImage asset={storyImage(i)} sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 33vw"/><span className="play-icon" aria-hidden="true">▶</span><span className="duration">{s.durationLabel}</span></button><div><h3>{s.title}</h3><p>{s.location}</p></div></article>)}</div><a className="text-link" href={content.cta.target}>{content.cta.label} →</a></div>
    {story && <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setActive(null); }}><div ref={dialogRef} className="video-modal" role="dialog" aria-modal="true" aria-labelledby="story-modal-title"><button type="button" className="modal-close" aria-label="Close customer story" onClick={() => setActive(null)}>×</button><h2 id="story-modal-title">{story.title}</h2><video controls tabIndex={0} aria-label={`${story.title} video`} poster={activeImage.variants.find(variant => variant.format === 'webp' && variant.width === 1440)?.src}>Your browser does not support embedded video.</video><p>{story.location} · {story.durationLabel}</p></div></div>}
  </section>;
}
