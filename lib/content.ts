import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'

const contentDir = path.join(process.cwd(), 'guides-content')

export interface Episode {
  episode: number
  file: string
  title: string
  date: string
  tags: string[]
  summary: string
  slug: string
}

export interface IndexData {
  title: string
  description: string
  author: string
  episodes: Episode[]
}

export function getIndex(): IndexData {
  const filePath = path.join(contentDir, 'index.json')
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  return {
    ...raw,
    episodes: raw.episodes.map((ep: Omit<Episode, 'slug'>) => ({
      ...ep,
      slug: ep.file.replace('.md', ''),
    })),
  }
}

export function getAllEpisodes(): Episode[] {
  const index = getIndex()
  return [...index.episodes].sort((a, b) => b.episode - a.episode)
}

export function getAllTags(): string[] {
  const episodes = getAllEpisodes()
  const tagSet = new Set<string>()
  episodes.forEach(ep => ep.tags.forEach(tag => tagSet.add(tag)))
  return Array.from(tagSet)
}

export async function getEpisodeBySlug(slug: string) {
  const index = getIndex()
  const episodes = index.episodes.sort((a, b) => a.episode - b.episode)
  const currentIndex = episodes.findIndex(ep => ep.slug === slug)
  const meta = episodes[currentIndex]

  if (!meta) return null

  const filePath = path.join(contentDir, meta.file)
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { content } = matter(fileContent)

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content)

  const prev = currentIndex > 0 ? episodes[currentIndex - 1] : null
  const next = currentIndex < episodes.length - 1 ? episodes[currentIndex + 1] : null

  return {
    meta,
    contentHtml: processed.toString(),
    prev,
    next,
  }
}
