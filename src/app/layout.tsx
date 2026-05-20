import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import type { ReactNode } from 'react'
import './globals.css'

const sofiaSans = localFont({
    src: '../fonts/sofia-sans/SofiaSans-Variable.ttf',
    variable: '--font-sofia-sans',
    display: 'swap',
    weight: '100 900'
})

export const metadata: Metadata = {
    title: 'Искупљен — Долазимо ускоро',
    description: 'Одевен у Христа, не у трендове. Пријави се за рани приступ Искупљен колекцији.',
    icons: [
        {
            url: '/favicon.svg',
            rel: 'icon',
            type: 'image/svg+xml'
        }
    ],
    openGraph: {
        title: 'Искупљен — Долазимо ускоро',
        description: 'Одевен у Христа, не у трендове. Пријави се за рани приступ Искупљен колекцији.',
        url: 'https://iskupljen.com',
        siteName: 'Искупљен',
        type: 'website',
        locale: 'sr_RS'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Искупљен — Долазимо ускоро',
        description: 'Одевен у Христа, не у трендове. Пријави се за рани приступ Искупљен колекцији.'
    }
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='sr-Cyrl' className={sofiaSans.variable}>
            <body>
                {children}
                <Analytics />
            </body>
        </html>
    )
}
