import { footerContent as content, placeholderBusinessData as business } from '../content/site';

const socialIcons = {
  facebook: <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.7.3-1 1-1Z" />,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>,
  whatsapp: <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7A8.5 8.5 0 1 1 20.5 11.7Zm-5 2.2c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.4.2-.6.1a7 7 0 0 1-3.4-3c-.2-.3 0-.5.1-.6l.6-.7c.1-.2.1-.4 0-.6L8.4 7.7c-.2-.5-.5-.5-.7-.5h-.5c-.3 0-.7.1-.9.4-.3.3-1.1 1.1-1.1 2.6 0 1.6 1.1 3.1 1.3 3.3.1.2 2.2 3.5 5.5 4.7 2.7 1 3.3.8 3.9.7.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3Z" />,
} as const;

export function Footer() {
  return <footer id={content.sectionId} className="site-footer">
    <div className="container footer-grid">
      <section className="footer-brand" aria-label="JAY Builders brand">
        <a className="footer-logo" href="#home"><img src={content.logo.src} width={content.logo.width} height={content.logo.height} alt={content.brand} /></a>
      </section>
      <section className="footer-contact" aria-labelledby="footer-contact-heading">
        <h2 id="footer-contact-heading">{content.columnHeadings.contact}</h2>
        <address>
          <span><strong>{content.contactLabels.phone}</strong><a href={business.phoneHref}>{business.phoneLabel}</a></span>
          <span><strong>{content.contactLabels.email}</strong><a href={`mailto:${business.email}`}>{business.email}</a></span>
          <span><strong>{content.contactLabels.serviceArea}</strong>{business.serviceArea}</span>
        </address>
      </section>
      <section className="footer-services" aria-labelledby="footer-services-heading">
        <h2 id="footer-services-heading">{content.columnHeadings.services}</h2>
        <ul>{content.services.map(entry => <li key={entry}>{entry}</li>)}</ul>
      </section>
      <section className="footer-company" aria-labelledby="footer-company-heading">
        <h2 id="footer-company-heading">{content.columnHeadings.company}</h2>
        <ul>{content.company.map(entry => <li key={entry.label}>{'target' in entry ? <a href={entry.target}>{entry.label}</a> : entry.label}</li>)}</ul>
      </section>
      <section className="footer-social" aria-labelledby="footer-social-heading">
        <h2 id="footer-social-heading">{content.columnHeadings.followUs}</h2>
        <ul>{content.social.map(entry => <li key={entry.label}><a href={entry.url} aria-label={`Follow JAY Builders on ${entry.label}`}><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">{socialIcons[entry.icon]}</svg></a></li>)}</ul>
      </section>
    </div>
    <div className="footer-legal"><div className="container footer-bottom"><p>{content.legal.copyright}</p><p>{content.legal.companyNumberLabel}: {business.companyNumber} <span aria-hidden="true">·</span> {content.legal.insurance}</p></div></div>
  </footer>;
}
