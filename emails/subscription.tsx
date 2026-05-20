import { Body, Container, Head, Heading, Hr, Html, Img, Preview, Text } from '@react-email/components'

const darkModeStyle = `
    :root { color-scheme: light dark; supported-color-schemes: light dark; }
    .logo-dark { display: block; }
    .logo-light { display: none; }
    @media (prefers-color-scheme: dark) {
        body, table, td { background-color: #050505 !important; }
        body *:not(.logo-dark):not(.logo-light) { color: #ffffff !important; }
        .logo-dark { display: none !important; }
        .logo-light { display: block !important; }
    }
    [data-ogsc] body, [data-ogsc] table, [data-ogsc] td { background-color: #050505 !important; }
    [data-ogsc] body *:not(.logo-dark):not(.logo-light) { color: #ffffff !important; }
    [data-ogsc] .logo-dark { display: none !important; }
    [data-ogsc] .logo-light { display: block !important; }
`

interface SubscriptionEmailProps {
    email: string
}

export const SubscriptionEmail = ({ email }: SubscriptionEmailProps) => (
    <Html lang='sr-Cyrl'>
        <Head>
            <meta name='color-scheme' content='light dark' />
            <meta name='supported-color-schemes' content='light dark' />
            <style>{darkModeStyle}</style>
        </Head>
        <Preview>Нова пријава на Искупљен: {email}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src='https://www.iskupljen.com/logo-dark.png'
                    alt='Искупљен'
                    width={160}
                    height={62}
                    className='logo-dark'
                    style={logo}
                />
                <Img
                    src='https://www.iskupljen.com/logo.png'
                    alt='Искупљен'
                    width={160}
                    height={62}
                    className='logo-light'
                    style={{ ...logo, display: 'none' }}
                />
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
    color: '#ffffff',
    fontFamily: '"Sofia Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: '40px 16px'
}

const container = {
    maxWidth: '560px',
    margin: '0 auto',
    backgroundColor: '#0a0a0a',
    padding: '40px 32px',
    border: '1px solid #1f1f1f'
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
