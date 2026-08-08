// lib/hashtagFilter.ts

/**
 * Pull every #hashtag token out of a block of text.
 */
export function extractHashtags(text: string): string[] {
  const matches = text.match(/#[a-z0-9_]+\b/gi) || [];
  return matches.map((h) => h.toLowerCase());
}

/**
 * Extracts full post text or falls back to textContent.
 */
export function getPostFullText(item: Element): string {
  const linkWithData = item.querySelector('[data-post]');
  const raw = linkWithData?.getAttribute('data-post');

  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed.message === 'string') {
        return parsed.message;
      }
    } catch {
      // Fall through to textContent
    }
  }

  return item.textContent || '';
}

/**
 * Checks if a post contains no hashtags at all.
 */
export function hasNoHashtags(text: string): boolean {
  return extractHashtags(text).length === 0;
}