import { render, screen } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { App } from '../App';
import { formFields, sectionOrder, siteContent } from '../content/site';

const requiredTokens = ['--color-navy-900', '--color-gold-500', '--radius-medium', '--shadow-card', '--container-max', '--section-spacing', '--header-height', '--breakpoint-desktop'];

describe('application foundation', () => {
  it('publishes the required design token groups', () => {
    const tokens = readFileSync(new URL('../styles/tokens.css', import.meta.url), 'utf8');
    requiredTokens.forEach((token) => expect(tokens).toContain(token));
  });

  it('provides a valid typed content model', () => {
    expect(siteContent.navigation.length).toBeGreaterThan(0);
    expect(formFields.every(({ name, label }) => name.length > 0 && label.length > 0)).toBe(true);
    expect(formFields.find(({ type }) => type === 'file')?.accept).toEqual(['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.mov']);
  });

  it('renders every required section ID in the specified one-page order', () => {
    const { container } = render(<App />);
    const sections = [...container.querySelectorAll('section')];
    expect(sections.map(({ id }) => id)).toEqual(sectionOrder);
    sectionOrder.forEach((id) => expect(document.getElementById(id)).toBeInTheDocument());
    expect(screen.getByRole('heading', { name: 'customer stories' })).toBeVisible();
  });
});
