import type { Metadata } from 'next'
import './globals.css'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: '김전무의 오픈클로 실전기록',
  description: '에스유디자인주식회사 AI 팀 세팅 실전 가이드. 새로 합류하는 직원이 시행착오 없이 따라할 수 있도록.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              if (theme === 'light') {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
              }
            } catch(e) {}
          })();
        `}} />
      </head>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased transition-colors duration-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex justify-end pt-4">
            <ThemeToggle />
          </div>
          {children}
        </div>
      </body>
    </html>
  )
}
