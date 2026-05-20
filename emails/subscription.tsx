import { Body, Container, Head, Heading, Hr, Html, Img, Preview, Text } from '@react-email/components'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://iskupljen.com'

interface SubscriptionEmailProps {
    email: string
}

export const SubscriptionEmail = ({ email }: SubscriptionEmailProps) => (
    <Html lang='sr-Cyrl'>
        <Head />
        <Preview>Нова пријава на Искупљен: {email}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Img src={`${BASE_URL}/logo.svg`} alt='Искупљен' width={160} height={62} style={logo} />
                <Hr style={accent} />
                <Heading as='h1' style={heading}>
                    Нова пријава
                </Heading>
                <Text style={label}>Имејл адреса</Text>
                <Text style={value}>{email}</Text>
            </Container>
        </Body>
    </Html>
)

SubscriptionEmail.PreviewProps = { email: 'test@example.com' } as SubscriptionEmailProps

export default SubscriptionEmail

const main = {
    backgroundColor: '#050505',
    fontFamily: '"Sofia Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: '40px 16px'
}

const container = {
    maxWidth: '560px',
    margin: '0 auto',
    backgroundColor: '#0a0a0a',
    padding: '40px 32px',
    border: '1px solid rgba(255, 255, 255, 0.08)'
}

const logo = {
    display: 'block',
    height: 'auto',
    margin: 0
}

const accent = {
    border: 'none',
    borderTop: '2px solid #FE131C',
    width: '48px',
    margin: '24px 0 32px'
}

const heading = {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '32px',
    margin: '0 0 24px'
}

const label = {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '2px',
    lineHeight: '16px',
    margin: '0 0 6px',
    textTransform: 'uppercase' as const
}

const value = {
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '26px',
    margin: 0,
    wordBreak: 'break-all' as const
}
