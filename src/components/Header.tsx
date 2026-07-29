import { useState } from 'react';
import { headerHeroContent } from '../content/site';
export function Header() {
 const [open,setOpen]=useState(false);
 return <header className="site-header"><div className="container header-inner"><a className="brand" href="#home" aria-label="JAY Builders home"><span>JAY</span> BUILDERS</a><button className="menu-button" aria-expanded={open} aria-controls="site-navigation" onClick={()=>setOpen(!open)}><span className="visually-hidden">Toggle navigation</span><i/><i/><i/></button><nav id="site-navigation" aria-label="Primary navigation" className={open?'nav-open':''}>{headerHeroContent.navigation.map(n=><a key={n.target} href={n.target} onClick={()=>setOpen(false)}>{n.label}</a>)}<a className="button button--gold nav-cta" href={headerHeroContent.primaryCta.target}>{headerHeroContent.primaryCta.label}</a></nav></div></header>;
}
