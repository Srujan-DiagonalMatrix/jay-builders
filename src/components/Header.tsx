import { useEffect, useRef, useState } from 'react';
import { headerHeroContent } from '../content/site';

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(false);

  function closeDrawer(restoreFocus = false) {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => toggleRef.current?.focus());
  }

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) document.body.style.overflow = '';
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    document.body.style.overflow = 'hidden';
    navRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDrawer(true);
      if (event.key === 'Tab' && navRef.current) {
        const focusable = [toggleRef.current, ...navRef.current.querySelectorAll<HTMLAnchorElement>('a')].filter(Boolean) as HTMLElement[];
        const first = focusable[0];
        const last = focusable.at(-1)!;
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  return <header className="site-header"><div className="container header-inner">
    <a className="brand" href="#home" aria-label="JAY Builders home"><img src="/assets/images/JayLogo.png" alt="" /></a>
    <button ref={toggleRef} className="menu-button" type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="site-navigation" onClick={() => open ? closeDrawer() : setOpen(true)}><i/><i/><i/></button>
    {open && <button className="drawer-backdrop" type="button" aria-label="Close navigation menu" onClick={() => closeDrawer(true)}/>}
    <nav ref={navRef} id="site-navigation" aria-label="Primary navigation" className={open ? 'nav-open' : ''}>{headerHeroContent.navigation.map(n => <a key={n.target} href={n.target} onClick={() => closeDrawer()}>{n.label}</a>)}<a className="button button--gold nav-cta" href={headerHeroContent.primaryCta.target} onClick={() => closeDrawer()}>{headerHeroContent.primaryCta.label}</a></nav>
  </div></header>;
}
