import { useEffect } from 'react';
import { metadataFor, structuredDataFor } from './metadata';

function upsertMeta(property: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!element) { element = document.createElement('meta'); element.setAttribute('property', property); document.head.append(element); }
  element.content = content;
}

export function Seo() {
  useEffect(() => {
    const metadata = metadataFor(window.location.origin);
    document.title = metadata.title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', metadata.canonical);
    upsertMeta('og:title', metadata.openGraph.title);
    upsertMeta('og:description', metadata.openGraph.description);
    upsertMeta('og:type', metadata.openGraph.type);
    upsertMeta('og:url', metadata.openGraph.url);
    const script = document.getElementById('structured-data');
    if (script) script.textContent = JSON.stringify(structuredDataFor(window.location.origin));
  }, []);
  return null;
}
