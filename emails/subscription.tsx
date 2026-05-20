import { Body, Container, Head, Heading, Hr, Html, Img, Preview, Section, Text } from '@react-email/components'

const darkModeStyle = `
    :root { color-scheme: dark !important; supported-color-schemes: dark !important; }
    body, table, td, .email-bg, .email-card { background-color: #050505 !important; }
    .email-card { background-color: #0a0a0a !important; }
    body, body * { color: #ffffff !important; }
    .text-secondary { color: #cccccc !important; }
    a { color: #ffffff !important; }
    [data-ogsc] body, [data-ogsc] table, [data-ogsc] td, [data-ogsc] .email-bg { background-color: #050505 !important; }
    [data-ogsc] .email-card { background-color: #0a0a0a !important; }
    [data-ogsc] body, [data-ogsc] body * { color: #ffffff !important; }
    [data-ogsc] .text-secondary { color: #cccccc !important; }
`

interface SubscriptionEmailProps {
    email: string
}

export const SubscriptionEmail = ({ email }: SubscriptionEmailProps) => (
    <Html lang='sr-Cyrl'>
        <Head>
            <meta name='color-scheme' content='dark' />
            <meta name='supported-color-schemes' content='dark' />
            <style>{darkModeStyle}</style>
        </Head>
        <Preview>Нова пријава на Искупљен: {email}</Preview>
        <Body style={main} className='email-bg'>
            <Container style={container} className='email-card'>
                <Section style={inner}>
                    <Img
                        src='https://www.iskupljen.com/logo.png'
                        alt='Искупљен'
                        width={160}
                        height={62}
                        style={logo}
                    />
                    <Hr style={accent} />
                    <Heading as='h1' style={heading}>
                        Нова пријава
                    </Heading>
                    <Text style={label} className='text-secondary'>
                        Имејл адреса
                    </Text>
                    <Text style={value}>{email}</Text>
                </Section>
            </Container>
        </Body>
    </Html>
)

SubscriptionEmail.PreviewProps = { email: 'test@example.com' } as SubscriptionEmailProps

export default SubscriptionEmail

const main = {
    backgroundColor: '#050505',
    color: '#ffffff',
    fontFamily: '"Sofia Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: '40px 16px'
}

const container = {
    maxWidth: '560px',
    margin: '0 auto',
    backgroundColor: '#0a0a0a',
    border: '1px solid #1f1f1f'
}

const inner = {
    padding: '40px 32px'
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
    margin: '40px 0 32px'
}

const heading = {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '32px',
    margin: '0 0 24px'
}

const label = {
    color: '#cccccc',
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
