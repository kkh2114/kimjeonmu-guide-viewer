import { getAllEpisodes, getAllTags, getIndex } from '@/lib/content'
import EpisodeList from '@/components/EpisodeList'

export default function HomePage() {
  const index = getIndex()
  const episodes = getAllEpisodes()
  const allTags = getAllTags()

  return (
    <main className="py-12">
      {/* Header */}
      <header className="mb-14">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-[var(--gold)]/40 text-[var(--gold)] bg-[var(--gold)]/10">
            연재중
          </span>
          <span className="text-[var(--muted-text)] text-xs">{episodes.length}편</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] leading-tight mb-3">
          {index.title}
        </h1>

        <p className="text-[var(--muted-text)] text-sm leading-relaxed mb-5 max-w-xl">
          {index.description}
        </p>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[var(--ep-num-bg)] flex items-center justify-center text-xs">
            🎖️
          </div>
          <span className="text-[var(--muted-text)] text-xs">{index.author}</span>
        </div>
      </header>

      {/* Divider */}
      <div className="border-t border-[var(--border)] mb-8" />

      {/* Episode List with Tag Filter */}
      <EpisodeList episodes={episodes} allTags={allTags} />
    </main>
  )
}
