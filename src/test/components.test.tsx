import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '../App';
import { sectionOrder } from '../content/site';

describe('assembled page', () => {
 it('renders the required anchors in specification order',()=>{ const {container}=render(<App/>); const actual=[...container.querySelectorAll('[id]')].map(n=>n.id).filter(id=>sectionOrder.includes(id as never)); expect(actual).toEqual(sectionOrder); });
 it('uses semantic landmarks and exactly one h1',()=>{render(<App/>);expect(screen.getAllByRole('banner')).toHaveLength(1);expect(screen.getByRole('main')).toBeInTheDocument();expect(screen.getByRole('contentinfo')).toBeInTheDocument();expect(screen.getAllByRole('heading',{level:1})).toHaveLength(1);});
 it('renders approved grid content counts',()=>{const {container}=render(<App/>);expect(container.querySelectorAll('.story-card')).toHaveLength(3);expect(container.querySelectorAll('.project-card')).toHaveLength(6);expect(container.querySelectorAll('.service-card')).toHaveLength(9);expect(container.querySelectorAll('.review-card')).toHaveLength(4);expect(container.querySelectorAll('.process-grid li')).toHaveLength(4);});
 it('exposes an accessible responsive navigation state',()=>{render(<App/>);const toggle=screen.getByRole('button',{name:'Toggle navigation'});expect(toggle).toHaveAttribute('aria-expanded','false');fireEvent.click(toggle);expect(toggle).toHaveAttribute('aria-expanded','true');expect(screen.getByRole('navigation',{name:'Primary navigation'})).toHaveClass('nav-open');});
 it('places urgent assistance beside the lower main content',()=>{const {container}=render(<App/>);const grid=container.querySelector('.lower-grid')!;expect(grid.children[0]).toHaveClass('lower-main');expect(grid.children[1]).toHaveClass('urgent-column');expect(grid.children[1].querySelector('#urgent-assistance')).toBeInTheDocument();});
});
