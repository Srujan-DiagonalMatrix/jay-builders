import { render, screen } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { App } from '../App';
import { headerHeroContent, projectFormContent, sectionOrder } from '../content/site';

const requiredTokens = ['--color-navy-900', '--color-gold-500', '--radius-medium', '--shadow-card', '--container-max', '--section-spacing', '--header-height', '--breakpoint-desktop'];

describe('application foundation', () => {
  it('publishes the required design token groups', () => {
    const tokens = readFileSync('src/styles/tokens.css', 'utf8');
    requiredTokens.forEach((token) => expect(tokens).toContain(token));
  });

  it('provides a valid typed content model', () => {
    expect(headerHeroContent.navigation.length).toBeGreaterThan(0);
    expect(projectFormContent.fields.every(({ name, label }) => name.length > 0 && label.length > 0)).toBe(true);
    expect(projectFormContent.fields.find(({ type }) => type === 'file')?.accept).toEqual(['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.mov']);
  });

  it('renders every required section ID in the specified one-page order', () => {
    const { container } = render(<App />);
    const sections = [...container.querySelectorAll('[id]')].filter(({ id }) => sectionOrder.includes(id as never));
    expect(sections.map(({ id }) => id)).toEqual(sectionOrder);
    sectionOrder.forEach((id) => expect(document.getElementById(id)).toBeInTheDocument());
    expect(screen.getByRole('heading', { name: /see what our customers say/i })).toBeVisible();
  });

  it('enables smooth anchor scrolling and removes motion for reduced-motion users', () => {
    const styles = readFileSync('src/styles/global.css', 'utf8');
    expect(styles).toMatch(/html\s*\{[^}]*scroll-behavior:\s*smooth/);
    expect(styles).toMatch(/prefers-reduced-motion:\s*reduce/);
    expect(styles).toMatch(/scroll-behavior:\s*auto/);
    expect(styles).toMatch(/transition-duration:\s*0\.01ms/);
  });
});
