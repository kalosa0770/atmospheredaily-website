// components/JuicerFeedProvider.tsx
'use client';

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import Script from 'next/script';
import styles from './JuicerFeedProvider.module.css';
import { getPostFullText, extractHashtags, hasNoHashtags } from '@/lib/hashtagFilter';

interface JuicerFeedContextValue {
  registerTarget: (tag: string, el: HTMLElement) => void;
  unregisterTarget: (tag: string) => void;
}

const JuicerFeedContext = createContext<JuicerFeedContextValue | null>(null);

const ROUTED_ATTR = 'data-hashtag-routed';
export const UNTAGGED_TAG = '__untagged__';

export function useJuicerFeedTarget<T extends HTMLElement = HTMLUListElement>(
  tag: string
) {
  const ctx = useContext(JuicerFeedContext);
  if (!ctx) {
    throw new Error(
      'useJuicerFeedTarget must be used inside a <JuicerFeedProvider>'
    );
  }
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;
    ctx.registerTarget(tag, ref.current);
    return () => ctx.unregisterTarget(tag);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  return ref;
}

interface JuicerFeedProviderProps {
  feedId: string;
  children: ReactNode;
}

export default function JuicerFeedProvider({
  feedId,
  children,
}: JuicerFeedProviderProps) {
  const masterId = useId().replace(/[:]/g, '');
  const targetsRef = useRef<Map<string, HTMLElement>>(new Map());
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const syncPosts = () => {
    const master = document.getElementById(masterId);
    if (!master) return;

    // 1. Route unrouted posts into matching section containers
    const items = master.querySelectorAll(
      `.jcr-post:not([${ROUTED_ATTR}]), .juicer-item:not([${ROUTED_ATTR}])`
    );

    items.forEach((item) => {
      const text = getPostFullText(item) || item.textContent || '';
      const postHashtags = extractHashtags(text);
      const isUntagged = hasNoHashtags(text);

      const matchingTargets: HTMLElement[] = [];

      if (isUntagged) {
        const untaggedTarget = targetsRef.current.get(UNTAGGED_TAG);
        if (untaggedTarget) {
          matchingTargets.push(untaggedTarget);
        }
      } else {
        targetsRef.current.forEach((targetEl, targetTag) => {
          if (
            targetTag !== UNTAGGED_TAG &&
            postHashtags.includes(targetTag.toLowerCase())
          ) {
            matchingTargets.push(targetEl);
          }
        });
      }

      if (matchingTargets.length > 0) {
        item.setAttribute(ROUTED_ATTR, 'true');

        matchingTargets.forEach((target, index) => {
          const elementToAppend =
            index === 0 ? item : (item.cloneNode(true) as HTMLElement);
          target.appendChild(elementToAppend);
        });
      }
    });

    // 2. Check if Juicer's internal load button exists
    const nativeLoadMoreBtn = master.querySelector(
      '.jcr-load-more, .j-paginate, a.juicer-button'
    );
    setHasMorePosts(!!nativeLoadMoreBtn);
  };

  // Programmatically trigger Juicer's internal pagination call
  const handleLoadMoreClick = () => {
    const master = document.getElementById(masterId);
    if (!master) return;

    const nativeBtn = master.querySelector(
      '.jcr-load-more, .j-paginate, a.juicer-button'
    ) as HTMLElement;

    if (nativeBtn) {
      nativeBtn.click();
    }
  };

  const registerTarget = (tag: string, el: HTMLElement) => {
    targetsRef.current.set(tag.toLowerCase(), el);
    syncPosts();
  };

  const unregisterTarget = (tag: string) => {
    targetsRef.current.delete(tag.toLowerCase());
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Juicer) {
      (window as any).Juicer.initialize();
    }

    const master = document.getElementById(masterId);
    if (!master) return;

    syncPosts();

    const observer = new MutationObserver(() => syncPosts());
    observer.observe(master, { childList: true, subtree: true });

    const intervalId = setInterval(syncPosts, 1000);

    return () => {
      observer.disconnect();
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [masterId]);

  return (
    <JuicerFeedContext.Provider value={{ registerTarget, unregisterTarget }}>
      <link
        rel="stylesheet"
        href="https://assets.juicer.io/embed.css"
        type="text/css"
      />

      {/* Hidden Master Feed Container */}
      <ul
        id={masterId}
        className={`juicer-feed jcr-feed ${styles.visuallyHidden}`}
        data-feed-id={feedId}
        data-endpoint="https://www.juicer.io/api"
        data-overlay="true"
        data-per="100"
        data-page="1"
        aria-hidden="true"
      ></ul>

      {/* Section Content */}
      {children}

      {/* Functional Load More Button */}
      {hasMorePosts && (
        <div className="w-full my-12 text-center">
          <button
            type="button"
            onClick={handleLoadMoreClick}
            className="jcr-load-more cursor-pointer inline-block bg-gray-900 hover:bg-[#1a3a3f] text-white font-bold text-xs uppercase px-6 py-3 transition-colors duration-200"
          >
            Load More Posts
          </button>
        </div>
      )}

      <Script
        src={`https://www.juicer.io/embed/${feedId}/embed-code.js`}
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== 'undefined' && (window as any).Juicer) {
            (window as any).Juicer.initialize();
          }
          syncPosts();
        }}
      />
    </JuicerFeedContext.Provider>
  );
}