'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Episode } from '@/lib/content'

interface Props {
  episodes: Episode[]
  allTags: string[]
}

export default function EpisodeList({ episodes, allTags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = activeTag
    ? episodes.filter(ep => ep.tags.includes(activeTag))
    : episodes

  return (
    <div>
      {/* Tag Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors border ${
            activeTag === null
              ? 'bg-[var(--gold)] text-[var(--bg)] border-[var(--gold)]'
              : 'border-[var(--muted-bg)] text-[var(--muted-text)] hover:border-[var(--gold)] hover:text-[var(--gold)]'
          }`}
        >
          전체
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors border ${
              activeTag === tag
                ? 'bg-[var(--gold)] text-[var(--bg)] border-[var(--gold)]'
                : 'border-[var(--muted-bg)] text-[var(--muted-text)] hover:border-[var(--gold)] hover:text-[var(--gold)]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Episode Cards */}
      <div className="flex flex-col gap-3">
        {filtered.map(ep => (
          <Link key={ep.slug} href={`/episodes/${ep.slug}`} className="block group">
            <article className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 transition-all duration-200 hover:border-[var(--border-hover)] hover:bg-[var(--card-hover)]">
              <div className="flex items-start gap-4">
                {/* Episode Number */}
                <div className="shrink-0 w-10 h-10 rounded-lg bg-[var(--ep-num-bg)] flex items-center justify-center">
                  <span className="text-[var(--gold)] font-bold text-sm">
                    {String(ep.episode).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-[var(--text)] font-semibold text-base leading-snug group-hover:text-[var(--gold)] transition-colors mb-1">
                    {ep.title}
                  </h2>
                  <p className="text-[var(--muted-text)] text-sm leading-relaxed mb-3 line-clamp-2">
                    {ep.summary}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[var(--muted-text)] text-xs">{ep.date}</span>
                    <span className="text-[var(--muted-bg)] text-xs">·</span>
                    {ep.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-md bg-[var(--ep-num-bg)] text-[var(--muted-text)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="shrink-0 text-[var(--muted-bg)] group-hover:text-[var(--gold)] transition-colors mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </article>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="text-[var(--muted-text)] text-sm text-center py-12">
            해당 태그의 에피소드가 없습니다.
          </p>
        )}
      </div>
    </div>
  )
}
