// lib/juicer.ts

export interface JuicerPost {
  id: number;
  message: string;
  image: string | null;
  external_created_at: string;
  full_url: string;
  source_type: string;
  poster_name?: string;
  poster_image?: string;
}

export interface JuicerFeedResponse {
  posts: {
    items: JuicerPost[];
  };
}

// lib/juicer.ts

/**
 * Formats ISO date strings into relative time ("3 hours ago", "12 mins ago") 
 * or formatted dates for older posts ("AUG 11, 2026 • 02:30 PM")
 */
export function formatRelativeDateTime(dateString: string, fullMonth = false): string {
  if (!dateString) return '';

  const dateObj = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  // If the date is invalid or in the future
  if (isNaN(diffInSeconds) || diffInSeconds < 0) {
    return dateObj.toLocaleDateString('en-US', {
      month: fullMonth ? 'long' : 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (days < 7) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }

  // Fallback to standard date formatting for older posts
  const dateStr = dateObj.toLocaleDateString('en-US', {
    month: fullMonth ? 'long' : 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const timeStr = dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${dateStr} • ${timeStr}`;
}

/**
 * Regex pattern to match standard http/https URLs
 */
const URL_REGEX = /(https?:\/\/[^\s<]+)/gi;

/**
 * Extract the first URL found in a block of text
 */
export function extractFirstUrl(text: string): string | null {
  if (!text) return null;
  const matches = text.match(URL_REGEX);
  return matches ? matches[0] : null;
}

/**
 * Clean post message by removing raw HTML tags (<p>, <br>, etc.) and hashtag strings
 */
export function cleanPostMessage(text: string): string {
  if (!text) return '';

  // 1. Remove HTML tags
  let cleaned = text.replace(/<[^>]*>/g, ' ');

  // 2. Remove URLs
  cleaned = cleaned.replace(URL_REGEX, '');

  // 3. Remove hashtag tokens
  cleaned = cleaned.replace(/#[a-z0-9_]+\b/gi, '');

  // 4. Normalize whitespace
  return cleaned.replace(/\s+/g, ' ').trim();
}

/**
 * Extract #hashtags from raw text for section filtering
 */
export function extractHashtags(text: string): string[] {
  const matches = text.match(/#[a-z0-9_]+\b/gi) || [];
  return matches.map((h) => h.toLowerCase());
}

/**
 * Fetch posts directly from Juicer REST API
 */
export async function getJuicerPosts(feedSlug: string): Promise<JuicerPost[]> {
  const apiKey = process.env.JUICER_API_KEY;
  const baseUrl = `https://www.juicer.io/api/feeds/${feedSlug}?per=100`;
  const url = apiKey ? `${baseUrl}&api_token=${apiKey}` : baseUrl;

  const res = await fetch(url, {
    next: { revalidate: 300 }, // Revalidate cache every 5 minutes
  });

  if (!res.ok) {
    console.error(`Failed to fetch Juicer feed: ${res.statusText}`);
    return [];
  }

  const data: JuicerFeedResponse = await res.json();
  return data.posts?.items || [];
}

/**
 * Filter posts by a specific hashtag
 */
export function filterPostsByHashtag(
  posts: JuicerPost[],
  tag: string
): JuicerPost[] {
  const normalizedTag = tag.toLowerCase();
  return posts.filter((post) => {
    if (!post.message) return false;
    const tags = extractHashtags(post.message);
    return tags.includes(normalizedTag);
  });
}



