import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4A017',
        'gold-dark': '#B8860B',
        surface: '#0D1117',
        card: '#161B22',
        border: '#21262D',
        muted: '#30363D',
        'text-primary': '#E6EDF3',
        'text-secondary': '#8B949E',
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'Noto Sans KR', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#E6EDF3',
            a: { color: '#D4A017', '&:hover': { color: '#B8860B' } },
            h1: { color: '#E6EDF3' },
            h2: { color: '#E6EDF3' },
            h3: { color: '#E6EDF3' },
            h4: { color: '#E6EDF3' },
            strong: { color: '#E6EDF3' },
            code: { color: '#D4A017', backgroundColor: '#21262D', borderRadius: '4px', padding: '2px 6px' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            blockquote: {
              color: '#8B949E',
              borderLeftColor: '#D4A017',
              borderLeftWidth: '3px',
              fontStyle: 'normal',
            },
            hr: { borderColor: '#21262D' },
            'ul > li::marker': { color: '#D4A017' },
            'ol > li::marker': { color: '#D4A017' },
            thead: {
              borderBottomColor: '#30363D',
            },
            'thead th': {
              color: '#D4A017',
            },
            'tbody tr': {
              borderBottomColor: '#21262D',
            },
            'tbody tr:nth-child(even)': {
              backgroundColor: '#161B22',
            },
            pre: {
              backgroundColor: '#0D1117',
              border: '1px solid #21262D',
              borderRadius: '8px',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
