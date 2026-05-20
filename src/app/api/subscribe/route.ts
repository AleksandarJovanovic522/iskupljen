import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { SubscriptionEmail } from '../../../../emails/subscription'
import { WelcomeEmail } from '../../../../emails/welcome'
import { subscribeSchema } from '@/lib/schemas'

export const runtime = 'nodejs'

export async function POST(request: Request) {
    const body = await request.json().catch(() => null)
    if (!body) {
        return NextResponse.json({ ok: false, message: 'Неисправан захтев.' }, { status: 400 })
    }

    const parsed = subscribeSchema.safeParse(body)
    if (!parsed.success) {
        return NextResponse.json({ ok: false, message: 'Имејл није валидан.' }, { status: 400 })
    }

    // Honeypot: bots fill hidden field, return success silently
    if (parsed.data._website && parsed.data._website.length > 0) {
        return NextResponse.json({ ok: true })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
        console.error('[subscribe] RESEND_API_KEY missing')
        return NextResponse.json({ ok: false, message: 'Сервер није конфигурисан.' }, { status: 500 })
    }

    const resend = new Resend(apiKey)

    const recipientsEnv = process.env.SUBSCRIBE_TO_EMAILS
    const recipients = recipientsEnv
        ? recipientsEnv
              .split(',')
              .map(s => s.trim())
              .filter(Boolean)
        : ['shop@iskupljen.com', 'gagiac@gmail.com']

    const sendResult = await resend.emails.send({
        from: 'Искупљен <noreply@shop.iskupljen.com>',
        to: recipients,
        subject: 'Нова пријава на Искупљен',
        react: SubscriptionEmail({ email: parsed.data.email })
    })

    if (sendResult.error) {
        console.error('[subscribe] Resend send error:', sendResult.error)
        return NextResponse.json(
            { ok: false, message: 'Слање није успело. Покушај поново.' },
            { status: 500 }
        )
    }

    try {
        await resend.emails.send({
            from: 'Искупљен <noreply@shop.iskupljen.com>',
            to: [parsed.data.email],
            replyTo: 'shop@iskupljen.com',
            subject: 'Хвала што си се пријавио на Искупљен',
            react: WelcomeEmail()
        })
    } catch (err) {
        console.error('[subscribe] Welcome mail error:', err)
    }

    try {
        await resend.contacts.create({
            email: parsed.data.email,
            unsubscribed: false
        })
    } catch (err) {
        console.error('[subscribe] Resend contacts.create error:', err)
    }

    return NextResponse.json({ ok: true })
}
