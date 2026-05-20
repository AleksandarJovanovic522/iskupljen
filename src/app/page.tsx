import { SubscribeForm } from '@/components/SubscribeForm'
import Image from 'next/image'

export default function Home() {
    return (
        <main className='relative min-h-svh overflow-hidden bg-black'>
            {/* Background slike */}
            <Image
                src='/images/coming-soon-bg.webp'
                alt=''
                fill
                priority
                sizes='100vw'
                className='hidden object-cover xl:block'
                aria-hidden
            />
            <Image
                src='/images/mobile-coming-soon-bg.webp'
                alt=''
                fill
                priority
                sizes='100vw'
                className='object-cover xl:hidden'
                aria-hidden
            />

            {/* Content */}
            <div className='relative z-10 flex min-h-svh flex-col'>
                {/* Logo */}
                <header className='px-6 pt-10 xl:px-10'>
                    <Image
                        src='/logo.svg'
                        alt='Iskupljen'
                        width={160}
                        height={62}
                        priority
                        className='hidden h-15.5 w-auto xl:block'
                    />
                    <Image
                        src='/logo-vertical.svg'
                        alt='Iskupljen'
                        width={52}
                        height={62}
                        priority
                        className='mx-auto h-[76px] w-auto xl:hidden'
                    />
                </header>

                {/* Hero slika — full sirina sa 40px gutter, zalepljena na cards row */}
                <section className='mt-auto px-6 pt-8 xl:px-10 xl:pt-10'>
                    <Image
                        src='/images/coming-soon-header.webp'
                        alt='Iskupljen kolekcija'
                        width={3316}
                        height={1200}
                        priority
                        sizes='(min-width: 1280px) calc(100vw - 80px), 100vw'
                        className='hidden h-auto w-full xl:block'
                    />
                    <Image
                        src='/images/mobile-coming-soon-header.webp'
                        alt='Iskupljen kolekcija'
                        width={722}
                        height={992}
                        priority
                        sizes='100vw'
                        className='mx-auto h-auto w-full max-w-md xl:hidden'
                    />
                </section>

                {/* Cards row — zalepljen na hero */}
                <section className='w-full'>
                    {/* Desktop: 3 col grid */}
                    <div className='hidden items-end xl:grid xl:grid-cols-3'>
                        <div className='relative aspect-1146/640'>
                            <Image
                                src='/images/coming-soon-left-card.webp'
                                alt=''
                                fill
                                sizes='33vw'
                                className='object-cover'
                                aria-hidden
                            />
                        </div>
                        <SubscribeForm />
                        <div className='relative aspect-1148/640'>
                            <Image
                                src='/images/coming-soon-right-card.webp'
                                alt=''
                                fill
                                sizes='33vw'
                                className='object-cover'
                                aria-hidden
                            />
                        </div>
                    </div>
                    {/* Mobile: samo forma */}
                    <div className='xl:hidden xl:px-4'>
                        <SubscribeForm />
                    </div>
                </section>
            </div>
        </main>
    )
}
