import { Body, Container, Head, Heading, Hr, Html, Img, Preview, Text } from '@react-email/components'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://iskupljen.com'

export const WelcomeEmail = () => (
    <Html lang='sr-Cyrl'>
        <Head />
        <Preview>Хвала што си се пријавио на Искупљен.</Preview>
        <Body style={main}>
            <Container style={container}>
                <Img src={`${BASE_URL}/logo.svg`} alt='Искупљен' width={160} height={62} style={logo} />
                <Hr style={accent} />
                <Heading as='h1' style={heading}>
                    Хвала што си се пријавио
                </Heading>
                <Text style={text}>Обавестићемо те чим Искупљене крене.</Text>
                <Text style={textMuted}>Одевен у Христа, не у трендове.</Text>
            </Container>
        </Body>
    </Html>
)

WelcomeEmail.PreviewProps = {} as Record<string, never>

export default WelcomeEmail

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
    margin: '0 0 16px'
}

const text = {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '16px',
    lineHeight: '24px',
    margin: '0 0 12px'
}

const textMuted = {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '14px',
    fontStyle: 'italic' as const,
    lineHeight: '22px',
    margin: '0 0 12px'
}

