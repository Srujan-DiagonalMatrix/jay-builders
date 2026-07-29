import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '../App';
import { sectionOrder } from '../content/site';

describe('assembled page', () => {
 it('renders the required anchors in specification order',()=>{ const {container}=render(<App/>); const actual=[...container.querySelectorAll('[id]')].map(n=>n.id).filter(id=>sectionOrder.includes(id as never)); expect(actual).toEqual(sectionOrder); });
 it('uses semantic landmarks and exactly one h1',()=>{render(<App/>);expect(screen.getAllByRole('banner')).toHaveLength(1);expect(screen.getByRole('main')).toBeInTheDocument();expect(screen.getByRole('contentinfo')).toBeInTheDocument();expect(screen.getAllByRole('heading',{level:1})).toHaveLength(1);});
 it('renders approved grid content counts',()=>{const {container}=render(<App/>);expect(container.querySelectorAll('.story-card')).toHaveLength(3);expect(container.querySelectorAll('.project-card')).toHaveLength(6);expect(container.querySelectorAll('.service-card')).toHaveLength(9);expect(container.querySelectorAll('.review-card')).toHaveLength(4);expect(container.querySelectorAll('.process-grid li')).toHaveLength(4);});
 it('opens the named drawer, moves focus, closes with Escape, and restores focus and scrolling',async()=>{render(<App/>);const toggle=screen.getByRole('button',{name:'Open navigation menu'});expect(toggle).toHaveAttribute('aria-expanded','false');fireEvent.click(toggle);expect(toggle).toHaveAttribute('aria-expanded','true');expect(document.body).toHaveStyle({overflow:'hidden'});expect(screen.getByRole('link',{name:'Home'})).toHaveFocus();fireEvent.keyDown(document,{key:'Escape'});await waitFor(()=>expect(toggle).toHaveFocus());expect(toggle).toHaveAttribute('aria-expanded','false');expect(document.body.style.overflow).toBe('');});
 it.each([
  ['Complete Home Renovation', 'pU5kvweq-EE'],
  ['Kitchen Extension', 'Jw7s42Op2ao'],
  ['Bathroom Renovation', 'tOwjEOt1zYU'],
 ])('opens the %s privacy-enhanced video only after activation and restores focus on Escape',async(title,videoId)=>{render(<App/>);const trigger=screen.getByRole('button',{name:`Play ${title} customer story`});expect(screen.queryByTitle(`${title} customer story video`)).not.toBeInTheDocument();trigger.focus();fireEvent.click(trigger);expect(screen.getByRole('dialog',{name:title})).toBeInTheDocument();const iframe=screen.getByTitle(`${title} customer story video`);expect(iframe).toHaveAttribute('src',`https://www.youtube-nocookie.com/embed/${videoId}`);expect(iframe).toHaveAttribute('allowfullscreen');expect(screen.getByRole('button',{name:'Close customer story'})).toHaveFocus();fireEvent.keyDown(document,{key:'Escape'});await waitFor(()=>expect(screen.queryByRole('dialog')).not.toBeInTheDocument());expect(trigger).toHaveFocus();});
 it('connects every link to a present anchor or contact protocol',()=>{const {container}=render(<App/>);container.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(link=>{const target=link.getAttribute('href')!;if(target.startsWith('#')) expect(document.querySelector(target),target).toBeInTheDocument();else expect(target).toMatch(/^(tel:|mailto:)/);});});
 it('places urgent assistance beside the lower main content',()=>{const {container}=render(<App/>);const grid=container.querySelector('.lower-grid')!;expect(grid.children[0]).toHaveClass('lower-main');expect(grid.children[1]).toHaveClass('urgent-column');expect(grid.children[1].querySelector('#urgent-assistance')).toBeInTheDocument();});
});
