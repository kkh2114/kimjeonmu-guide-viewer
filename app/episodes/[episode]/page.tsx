import { getEpisodeBySlug, getIndex } from '@/lib/content'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const index = getIndex()
  return index.episodes.map(ep => ({
    episode: ep.file.replace('.md', ''),
  }))
}

interface Props {
  params: { episode: string }
}

export async function generateMetadata({ params }: Props) {
  const data = await getEpisodeBySlug(params.episode)
  if (!data) return {}
  return {
    title: `EP${String(data.meta.episode).padStart(2, '0')}. ${data.meta.title} — 김전무의 오픈클로 실전기록`,
    description: data.meta.summary,
  }
}

export default async function EpisodePage({ params }: Props) {
  const data = await getEpisodeBySlug(params.episode)
  if (!data) notFound()

  const { meta, contentHtml, prev, next } = data

  return (
    <main className="py-12">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[var(--muted-text)] text-sm hover:text-[var(--gold)] transition-colors mb-10"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        목록으로
      </Link>

      {/* Episode Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-[var(--gold)]">
            EP{String(meta.episode).padStart(2, '0')}
          </span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-[var(--text)] leading-tight mb-4">
          {meta.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[var(--muted-text)] text-sm">{meta.date}</span>
          <span className="text-[var(--muted-bg)] text-sm">·</span>
          {meta.tags.map((tag: string) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md bg-[var(--ep-num-bg)] text-[var(--muted-text)] border border-[var(--border)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Divider */}
      <div className="border-t border-[var(--border)] mb-10" />

      {/* Markdown Content */}
      <article
        className="prose max-w-none
          prose-headings:font-bold prose-headings:text-[var(--text)]
          prose-h1:text-xl prose-h2:text-lg prose-h2:border-b prose-h2:border-[var(--border)] prose-h2:pb-2
          prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed
          prose-a:text-[var(--gold)] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-[var(--text)]
          prose-li:text-[var(--text-secondary)]
          prose-code:text-[var(--gold)] prose-code:bg-[var(--code-bg)] prose-code:rounded prose-code:px-1.5 prose-code:py-0.5
          prose-pre:bg-[var(--pre-bg)] prose-pre:border prose-pre:border-[var(--border)]
          prose-blockquote:border-l-[var(--gold)] prose-blockquote:bg-[var(--card)]
          prose-th:text-[var(--gold)] prose-td:text-[var(--text)]"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Navigation */}
      <div className="mt-14 pt-8 border-t border-[var(--border)]">
        <div className="grid grid-cols-2 gap-4">
          {/* Previous */}
          <div>
            {prev ? (
              <Link
                href={`/episodes/${prev.slug}`}
                className="group flex flex-col gap-1 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all"
              >
                <span className="text-[var(--muted-text)] text-xs flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  이전 에피소드
                </span>
                <span className="text-[var(--text)] text-sm font-medium group-hover:text-[var(--gold)] transition-colors line-clamp-2 leading-snug">
                  EP{String(prev.episode).padStart(2, '0')}. {prev.title}
                </span>
              </Link>
            ) : <div />}
          </div>

          {/* Next */}
          <div>
            {next ? (
              <Link
                href={`/episodes/${next.slug}`}
                className="group flex flex-col gap-1 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all text-right"
              >
                <span className="text-[var(--muted-text)] text-xs flex items-center justify-end gap-1">
                  다음 에피소드
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="text-[var(--text)] text-sm font-medium group-hover:text-[var(--gold)] transition-colors line-clamp-2 leading-snug">
                  EP{String(next.episode).padStart(2, '0')}. {next.title}
                </span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </div>
    </main>
  )
}
