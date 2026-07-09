import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components';

interface InquiryConfirmationProps {
  name: string;
}

// IMPORTANT: Update this URL to your actual production domain when you deploy!
// Email clients require absolute URLs for images.
const baseUrl = 'https://thecoconuttreetrails.com';

export const InquiryConfirmationEmail = ({
  name = 'Traveller',
}: InquiryConfirmationProps) => {
  // Extract first name for the greeting
  const firstName = name.split(' ')[0];

  return (
    <Html>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Droid+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          @media only screen and (max-width: 600px) {
            .mobile-container {
              margin: 0 auto !important;
              max-width: 100% !important;
              border-radius: 0 !important;
            }
            .mobile-padding {
              padding: 32px 24px !important;
            }
          }
        `}</style>
      </Head>
      <Preview>Ayubowan! Your Sri Lankan adventure begins...</Preview>
      <Body style={main}>
        <Container style={container} className="mobile-container">
          {/* Header section with Logo */}
          <Section style={header}>
            <Img
              src={`${baseUrl}/logococnut.png`}
              width="160"
              alt="The Coconut Tree Trails"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={contentSection} className="mobile-padding">
            <Text style={greeting}>Ayubowan {firstName}! 🇱🇰</Text>

            <Text style={paragraph}>
              Thank you for getting in touch with The Coconut Tree Trails!
            </Text>

            <Text style={paragraph}>
              Your enquiry has landed safely with us (just like a fresh king coconut on a sunny beach! 🥥), and our team is already putting together the perfect Sri Lankan adventure for you.
            </Text>

            <Text style={paragraph}>
              Whether you're dreaming of spotting elephants on safari, chasing waterfalls, sipping world-famous Ceylon tea, relaxing on golden beaches, or discovering hidden trails that most travellers never see, we've got you covered.
            </Text>

            <Text style={paragraph}>
              One of our travel specialists will be in touch very soon with a personalised itinerary designed just for you.
            </Text>

            <Text style={paragraph}>
              Until then, start imagining the ocean breeze, the smell of fresh spices, spectacular sunsets, and the warm Sri Lankan smiles waiting to welcome you.
            </Text>

            <Text style={tagline}>Every Trail Makes a Memory!</Text>

            <Text style={signoff}>
              See you soon,<br />
              <strong style={{ color: '#173036' }}>The Coconut Tree Trails Team</strong> 🇱🇰
            </Text>
          </Section>
          {/* Inspiration Photos (3 Cards) */}
          <Section style={inspirationSection}>
            <Row>
              <Column style={{ width: '33.33%', paddingRight: '4px' }}>
                <Img src={`${baseUrl}/images/home/yala-3.jpg`} width="100%" style={cardImage} alt="Wildlife 1" />
              </Column>
              <Column style={{ width: '33.33%', padding: '0 4px' }}>
                <Img src={`${baseUrl}/images/home/bentota.jpg`} width="100%" style={cardImage} alt="Bentota Beach" />
              </Column>
              <Column style={{ width: '33.33%', paddingLeft: '4px' }}>
                <Img src={`${baseUrl}/images/home/yala-4.jpg`} width="100%" style={cardImage} alt="Wildlife 2" />
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Footer with Contact and Socials */}
          <Section style={footerSection}>
            <Row>
              <Column>
                <Text style={footerContact}>
                  <strong>The Coconut Tree Trails</strong><br />
                  59, St Paul's Road<br />
                  Cheltenham, UK<br />
                  <Link href="mailto:info@thecoconuttreetrails.com" style={footerLink}>info@thecoconuttreetrails.com</Link>
                </Text>
              </Column>
            </Row>

            <Row style={socialRow}>
              {/* Instagram */}
              <Column style={socialIconCell}>
                <Link href="https://www.instagram.com/thecoconuttreetrails/">
                  <Img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="24" height="24" alt="Instagram" style={socialIcon} />
                </Link>
              </Column>
              {/* Facebook */}
              <Column style={socialIconCell}>
                <Link href="https://www.facebook.com/TCTTrails/">
                  <Img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="24" height="24" alt="Facebook" style={socialIcon} />
                </Link>
              </Column>
              {/* LinkedIn */}
              <Column style={socialIconCell}>
                <Link href="https://www.linkedin.com/">
                  <Img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" width="24" height="24" alt="LinkedIn" style={socialIcon} />
                </Link>
              </Column>
              {/* YouTube */}
              <Column style={socialIconCell}>
                <Link href="https://www.youtube.com/@TheCoconutTreeTrails">
                  <Img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" width="24" height="24" alt="YouTube" style={socialIcon} />
                </Link>
              </Column>
            </Row>

            <Text style={footerCopyright}>
              © 2026 The Coconut Tree Trails. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f4f7f6',
  fontFamily: '"Droid Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: '30px 0',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  overflow: 'hidden',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
  maxWidth: '600px',
  border: '1px solid #e2e8f0',
};

const header = {
  backgroundColor: '#173036',
  padding: '36px 20px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const contentSection = {
  padding: '40px 32px 30px',
};

const greeting = {
  color: '#173036',
  fontFamily: '"Bebas Neue", sans-serif',
  fontSize: '28px',
  fontWeight: 'bold',
  letterSpacing: '1px',
  margin: '0 0 24px',
};

const paragraph = {
  color: '#2a4a52',
  fontSize: '15px',
  lineHeight: '25px',
  margin: '0 0 16px',
};

const tagline = {
  color: '#0d5a53',
  fontFamily: '"Bebas Neue", sans-serif',
  fontSize: '24px',
  fontWeight: 'bold',
  letterSpacing: '1px',
  textAlign: 'center' as const,
  margin: '32px 0',
};

const signoff = {
  color: '#2a4a52',
  fontSize: '15px',
  lineHeight: '25px',
  margin: '32px 0 0',
};

const inspirationSection = {
  padding: '0 32px 40px',
};

const cardImage = {
  borderRadius: '8px',
  objectFit: 'cover' as const,
  height: '120px',
};

const divider = {
  borderColor: '#e2e8f0',
  borderWidth: '1px',
  borderStyle: 'solid',
  margin: '0 32px',
};

const footerSection = {
  backgroundColor: '#173036',
  padding: '40px 32px',
  textAlign: 'center' as const,
};

const footerContact = {
  color: '#a7d9d5',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 24px',
  textAlign: 'center' as const,
};

const footerLink = {
  color: '#ffffff',
  textDecoration: 'underline',
};

const socialRow = {
  margin: '0 auto 24px',
  width: '180px',
};

const socialIconCell = {
  padding: '0 10px',
  textAlign: 'center' as const,
};

const socialIcon = {
  display: 'inline-block',
  filter: 'brightness(0) invert(1) opacity(0.8)', // Makes black icons white
};

const footerCopyright = {
  color: '#6b8a87',
  fontSize: '12px',
  margin: '0',
  textAlign: 'center' as const,
};

export default InquiryConfirmationEmail;