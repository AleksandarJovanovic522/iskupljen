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

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://iskupljen.com'
const TITLE = 'Искупљен — Долазимо ускоро'
const DESCRIPTION = 'Одевен у Христа, не у трендове. Пријави се за рани приступ Искупљен колекцији.'

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: TITLE,
    description: DESCRIPTION,
    applicationName: 'Искупљен',
    keywords: ['Искупљен', 'Iskupljen', 'православна одећа', 'српски бренд', 'хришћанска мода', 'худи', 'духовна одећа'],
    authors: [{ name: 'Искупљен' }],
    creator: 'Искупљен',
    publisher: 'Искупљен',
    formatDetection: {
        email: false,
        address: false,
        telephone: false
    },
    icons: {
        icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
        shortcut: '/favicon.svg',
        apple: '/favicon.svg'
    },
    alternates: {
        canonical: '/'
    },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: SITE_URL,
        siteName: 'Искупљен',
        type: 'website',
        locale: 'sr_RS',
        images: [
            {
                url: '/iskupljen.png',
                width: 2400,
                height: 1280,
                alt: 'Искупљен — Одевен у Христа, не у трендове',
                type: 'image/webp'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        images: ['/iskupljen.png']
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
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
