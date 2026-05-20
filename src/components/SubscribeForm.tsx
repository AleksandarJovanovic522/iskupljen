'use client'

import BudiMedjuPrvimaIcon from '@/icons/budi-medju-prvima.svg'
import EmailIcon from '@/icons/email.svg'
import MobileBudiMedjuPrvimaIcon from '@/icons/mobile-budi-medju-prvima.svg'
import SpinnerIcon from '@/icons/spinner.svg'
import { subscribeSchema, type SubscribeInput } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type Status = 'idle' | 'pending' | 'success' | 'error'

export function SubscribeForm() {
    const [status, setStatus] = useState<Status>('idle')
    const [serverMessage, setServerMessage] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SubscribeInput>({
        resolver: zodResolver(subscribeSchema),
        defaultValues: { email: '', _website: '' },
        mode: 'onSubmit'
    })

    const onSubmit = async (values: SubscribeInput) => {
        setStatus('pending')
        setServerMessage(null)
        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })
            const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string }
            if (res.ok && data.ok) {
                setStatus('success')
                return
            }
            setStatus('error')
            setServerMessage(data.message ?? 'Дошло је до грешке. Покушај поново.')
        } catch {
            setStatus('error')
            setServerMessage('Мрежа није доступна. Покушај поново.')
        }
    }

    return (
        <div className='bg-primary flex h-full w-full flex-col items-center justify-center px-6 py-5 xl:px-4 xl:py-12'>
            {/* Headline + sub copy: flex-row mobile, flex-col xl */}
            <div className='flex w-full max-w-lg flex-row items-center justify-between gap-4 xl:flex-col xl:gap-2'>
                {/* Headline SVG */}
                <BudiMedjuPrvimaIcon
                    aria-label='Буди међу првима'
                    role='img'
                    width={188}
                    height={60}
                    className='hidden h-auto w-47 shrink-0 text-white xl:block'
                />
                <MobileBudiMedjuPrvimaIcon
                    aria-label='Буди међу првима'
                    role='img'
                    width={127}
                    height={38}
                    className='flex shrink-0 items-center text-white xl:hidden'
                />

                {/* Sub copy */}
                <p className='max-w-57.5 text-right font-sans text-sm text-white xl:max-w-70 xl:text-center xl:text-base'>
                    Пријави се за рани приступ, прве комаде у ексклузивним колекцијама.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='mt-5 w-full max-w-lg' noValidate>
                {/* Honeypot */}
                <input
                    type='text'
                    tabIndex={-1}
                    autoComplete='off'
                    aria-hidden='true'
                    className='hidden'
                    {...register('_website')}
                />

                {/* Input + button: stacked < xl, button-in-input >= xl */}
                <div className='relative'>
                    {/* Input wrapper: glassy bg + blur, bez border-radius, 54px mobile / 58px xl */}
                    <div className='relative h-13.5 w-full overflow-hidden bg-black/10 backdrop-blur-[3.5px] xl:h-14.5'>
                        {/* Email icon — koristi currentColor, stilizovano kroz text-* klasu */}
                        <EmailIcon
                            aria-hidden
                            className='pointer-events-none absolute top-1/2 left-4 h-6 w-6 -translate-y-1/2 text-white'
                        />
                        {/* Email input */}
                        <input
                            type='email'
                            inputMode='email'
                            autoComplete='email'
                            placeholder='Ваша имејл адреса'
                            aria-label='Имејл адреса'
                            aria-invalid={errors.email ? 'true' : 'false'}
                            disabled={status === 'pending'}
                            className='h-full w-full rounded-none bg-transparent pr-4 pl-12 font-sans text-base text-white outline-none placeholder:text-white/90 disabled:opacity-60 xl:pr-40'
                            {...register('email')}
                        />
                    </div>

                    {/* Validaciona poruka apsolutno ispod inputa */}
                    {errors.email && (
                        <p role='alert' className='absolute top-full left-0 mt-2 font-sans text-xs text-white/90'>
                            {errors.email.message}
                        </p>
                    )}

                    {/* Success / error message — above button on mobile, hidden on xl (xl button is inset) */}
                    {status === 'success' && (
                        <p role='status' className='mt-4 text-center font-sans text-sm font-semibold text-white xl:hidden'>
                            Успешно сте се пријавили!
                        </p>
                    )}
                    {status === 'error' && serverMessage && (
                        <p role='alert' className='mt-4 text-center font-sans text-sm text-white xl:hidden'>
                            {serverMessage}
                        </p>
                    )}

                    {/* Submit dugme: full width pravougaonik ispod inputa < xl, paralelogram inset >= xl */}
                    <button
                        type='submit'
                        disabled={status === 'pending'}
                        className='mt-4 flex h-13.5 w-full cursor-pointer items-center justify-center gap-2 bg-black px-6 font-sans text-base leading-6 font-medium tracking-[3.2px] whitespace-nowrap text-white uppercase transition-[clip-path,opacity] duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 xl:absolute xl:top-2.25 xl:right-2.25 xl:bottom-2.25 xl:mt-0 xl:h-auto xl:w-auto xl:tracking-normal xl:normal-case xl:[clip-path:polygon(12px_0,100%_0,calc(100%-12px)_100%,0_100%)] xl:hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]'>
                        {status === 'pending' ? (
                            <SpinnerIcon aria-hidden className='h-6 w-6 text-white' />
                        ) : (
                            <span>Обавести ме</span>
                        )}
                    </button>
                </div>

                {/* xl-only inline status row below the form (button is inset on xl, so the message goes here) */}
                {status === 'success' && (
                    <p role='status' className='mt-4 hidden text-center font-sans text-sm font-semibold text-white xl:block'>
                        Успешно сте се пријавили!
                    </p>
                )}
                {status === 'error' && serverMessage && (
                    <p role='alert' className='mt-4 hidden text-center font-sans text-sm text-white xl:block'>
                        {serverMessage}
                    </p>
                )}
            </form>
        </div>
    )
}
