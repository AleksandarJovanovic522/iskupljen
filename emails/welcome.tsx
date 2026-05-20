import { Body, Container, Head, Heading, Hr, Html, Img, Preview, Text } from '@react-email/components'

const darkModeStyle = `
    :root { color-scheme: dark; supported-color-schemes: dark; }
    body, table, td { background-color: #050505 !important; }
    a { color: #ffffff !important; }
    @media (prefers-color-scheme: light) {
        body, table, td { background-color: #050505 !important; }
        body * { color: #ffffff !important; }
    }
    [data-ogsc] body, [data-ogsc] table, [data-ogsc] td { background-color: #050505 !important; }
    [data-ogsc] body * { color: #ffffff !important; }
`

export const WelcomeEmail = () => (
    <Html lang='sr-Cyrl'>
        <Head>
            <meta name='color-scheme' content='dark only' />
            <meta name='supported-color-schemes' content='dark only' />
            <style>{darkModeStyle}</style>
        </Head>
        <Preview>Хвала што си се пријавио на Искупљен.</Preview>
        <Body style={main}>
            <Container style={container}>
                <Img src='https://www.iskupljen.com/logo.png' alt='Искупљен' width={160} height={62} style={logo} />
                <Hr style={accent} />
                <Heading as='h1' style={heading}>
                    Хвала што си се пријавио
                </Heading>
                <Text style={text}>Обавестићемо те чим искупљење крене.</Text>
                <Text style={textSecondary}>Одевен у Христа, не у трендове.</Text>
            </Container>
        </Body>
    </Html>
)

WelcomeEmail.PreviewProps = {} as Record<string, never>

export default WelcomeEmail

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
    margin: '0 0 16px'
}

const text = {
    color: '#ffffff',
    fontSize: '16px',
    lineHeight: '24px',
    margin: '0 0 12px'
}

const textSecondary = {
    color: '#cccccc',
    fontSize: '14px',
    lineHeight: '22px',
    margin: '0 0 12px'
}
