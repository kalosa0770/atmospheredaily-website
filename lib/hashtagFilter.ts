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

/* =========================================
   CONTAINER LOADER & STATE UTILITIES
   ========================================= */

/**
 * Attaches an animated spinner/loader element inside a target container.
 */
export function showContainerLoader(
  container: HTMLElement,
  loaderId = 'hashtag-filter-loader'
): void {
  if (container.querySelector(`#${loaderId}`)) return;

  const loader = document.createElement('div');
  loader.id = loaderId;
  loader.className =
    'flex items-center justify-center w-full py-12 text-slate-500 col-span-full';

  loader.innerHTML = `
    <div class="flex items-center space-x-3">
      <svg class="w-6 h-6 animate-spin text-red-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <span class="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-600">Loading Posts...</span>
    </div>
  `;

  if (getComputedStyle(container).position === 'static') {
    container.style.position = 'relative';
  }

  container.appendChild(loader);
}

/**
 * Removes the loader element from the container once posts are loaded.
 */
export function hideContainerLoader(
  container: HTMLElement,
  loaderId = 'hashtag-filter-loader'
): void {
  const loader = container.querySelector(`#${loaderId}`);
  if (loader) {
    loader.remove();
  }
}

/**
 * Displays a fallback notice if no posts match the target hashtag.
 */
export function showEmptyState(
  container: HTMLElement,
  tag: string,
  emptyId = 'hashtag-empty-state'
): void {
  if (container.querySelector(`#${emptyId}`)) return;

  const emptyMsg = document.createElement('div');
  emptyMsg.id = emptyId;
  emptyMsg.className =
    'flex items-center justify-center w-full py-10 text-slate-400 col-span-full text-xs sm:text-sm uppercase tracking-wider font-semibold';
  emptyMsg.textContent = `No posts available for ${tag}`;

  container.appendChild(emptyMsg);
}

/**
 * Removes the empty state notice if posts become available.
 */
export function hideEmptyState(
  container: HTMLElement,
  emptyId = 'hashtag-empty-state'
): void {
  const emptyMsg = container.querySelector(`#${emptyId}`);
  if (emptyMsg) {
    emptyMsg.remove();
  }
}

/**
 * Executes a full filter pass on a container and returns item counts:
 * Shows loader -> Filters items -> Displays empty state if no matches remain.
 */
export function filterPostsInContainer(
  container: HTMLElement,
  targetTag: string
): { totalItems: number; visibleCount: number } {
  const normalizedTag = targetTag.toLowerCase();
  const items = container.querySelectorAll('.jcr-post, .juicer-item, li');

  // 1. Return 0 total items if Juicer hasn't injected elements yet
  if (items.length === 0) {
    showContainerLoader(container);
    hideEmptyState(container);
    return { totalItems: 0, visibleCount: 0 };
  }

  // 2. Hide loader once elements are found
  hideContainerLoader(container);

  let visibleCount = 0;

  items.forEach((item) => {
    if (item.id === 'hashtag-filter-loader' || item.id === 'hashtag-empty-state') {
      return;
    }

    const text = getPostFullText(item);
    const presentHashtags = extractHashtags(text);
    const shouldShow = presentHashtags.includes(normalizedTag);

    const el = item as HTMLElement;
    if (shouldShow) {
      visibleCount++;
      el.classList.remove('hidden');
      el.style.setProperty('display', 'flex', 'important');
    } else {
      el.classList.add('hidden');
      el.style.setProperty('display', 'none', 'important');
    }
  });

  // 3. Display fallback state if no matches were found
  if (visibleCount === 0) {
    showEmptyState(container, targetTag);
  } else {
    hideEmptyState(container);
  }

  return { totalItems: items.length, visibleCount };
}