import type { PropsWithChildren } from 'react';
export function SectionHeading({ eyebrow, children, light = false }: PropsWithChildren<{ eyebrow?: string; light?: boolean }>) {
  return <header className={`section-heading${light ? ' section-heading--light' : ''}`}>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{children}</h2><span aria-hidden="true" /></header>;
}
export function ArrowIcon() { return <span aria-hidden="true">→</span>; }
