import { Body, Container, Head, Heading, Hr, Html, Img, Preview, Section, Text } from '@react-email/components'

const darkModeStyle = `
    :root { color-scheme: dark !important; supported-color-schemes: dark !important; }
    body, table, td, .email-bg, .email-card { background-color: #0a0a0a !important; }
    body, body * { color: #ffffff !important; }
    .text-secondary { color: #cccccc !important; }
    a { color: #ffffff !important; }
`

export const WelcomeEmail = () => (
    <Html lang='sr-Cyrl'>
        <Head>
            <meta name='color-scheme' content='dark' />
            <meta name='supported-color-schemes' content='dark' />
            <style>{darkModeStyle}</style>
        </Head>
        <Preview>Хвала што си се пријавио на Искупљен.</Preview>
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
                        Хвала што сте се пријавили
                    </Heading>
                    <Text style={text}>Обавестићемо вас чим искупљење крене.</Text>
                    <Text style={textSecondary} className='text-secondary'>
                        Одевен у Христа, не у трендове.
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
)

WelcomeEmail.PreviewProps = {} as Record<string, never>

export default WelcomeEmail

const main = {
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
    fontFamily: '"Sofia Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: '40px 16px'
}

const container = {
    maxWidth: '560px',
    margin: '0 auto',
    backgroundColor: '#0a0a0a'
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
