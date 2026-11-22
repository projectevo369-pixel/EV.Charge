import { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
}

function updateMetaTag(selector: string, content: string) {
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el) {
    el.setAttribute('content', content);
  }
}

export function SeoHead({ title, description }: SeoHeadProps) {
  useEffect(() => {
    document.title = title;
    updateMetaTag('meta[name="description"]', description);
    updateMetaTag('meta[property="og:title"]', title);
    updateMetaTag('meta[property="og:description"]', description);
    updateMetaTag('meta[name="twitter:title"]', title);
    updateMetaTag('meta[name="twitter:description"]', description);
  }, [title, description]);

  return null;
}
