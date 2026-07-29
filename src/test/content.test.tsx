import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '../App';
import { customerSaysContent, headerHeroContent, ourWorkContent, preferredContactOptions, processContent, projectFormContent, projectSpotlightContent, recommendationsContent, servicesContent, typeOfWorkOptions, urgentAssistanceContent, whyJayContent } from '../content/site';

describe('approved content contract', () => {
  it('provides a unique, canonical YouTube video ID for every customer story', () => {
    const videoIds = customerSaysContent.stories.map(story => story.youtubeVideoId);
    expect(new Set(videoIds).size).toBe(customerSaysContent.stories.length);
    videoIds.forEach(videoId => expect(videoId).toMatch(/^[A-Za-z0-9_-]{11}$/));
  });

  it('renders every approved collection record exactly once in its section', () => {
    render(<App />);
    const cases = [
      ['customer-stories', customerSaysContent.stories], ['our-work', ourWorkContent.projects],
      ['services', servicesContent.services], ['why-jay', whyJayContent.reasons],
      ['recommendations', recommendationsContent.reviews], ['process', processContent.steps],
    ] as const;
    cases.forEach(([sectionId, records]) => {
      const section = within(document.getElementById(sectionId)!);
      records.forEach(({ title }) => expect(section.getAllByRole('heading', { name: title })).toHaveLength(1));
    });
    projectFormContent.fields.forEach(({ label }) => expect(screen.getAllByLabelText(new RegExp(`^${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`))).toHaveLength(1));
  });

  it('does not render prohibited section headings', () => {
    render(<App />);
    ['Blog', 'FAQ', 'Pricing', 'Newsletter', 'Awards', 'Statistics', 'Biographies'].forEach(name =>
      expect(screen.queryByRole('heading', { name: new RegExp(name, 'i') })).not.toBeInTheDocument());
  });

  it('renders every CTA label from its source module without substitutions', () => {
    render(<App />);
    const ctas = [headerHeroContent.primaryCta.label, headerHeroContent.secondaryCta.label, customerSaysContent.cta.label, ourWorkContent.cta.label, servicesContent.guidance.cta.label, projectSpotlightContent.cta.label, projectFormContent.cta.label, urgentAssistanceContent.secondaryCta.label];
    ctas.forEach(label => expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1));
    expect(screen.getAllByText(headerHeroContent.primaryCta.label)).toHaveLength(2);
  });

  it('renders the required project form options exactly from the form module', () => {
    render(<App />);
    const work = screen.getByLabelText(/Type of Work Required/);
    const contact = screen.getByLabelText(/Preferred Contact Method/);
    expect(within(work).getAllByRole('option').slice(1).map(option => option.textContent)).toEqual(typeOfWorkOptions);
    expect(within(contact).getAllByRole('option').slice(1).map(option => option.textContent)).toEqual(preferredContactOptions);
  });
});
