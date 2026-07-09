
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
      <Head />
      <Preview>Ayubowan! Your Sri Lankan adventure begins...</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header section with Logo */}
          <Section style={header}>
            <Img
              src={`${baseUrl}/logococnut.png`}
              width="180"
              alt="The Coconut Tree Trails"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={contentSection}>
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
              <strong>The Coconut Tree Trails Team</strong> 🇱🇰
            </Text>

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
  fontFamily: '"Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '40px auto',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#173036',
  padding: '30px 20px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const inspirationSection = {
  margin: '40px 0 0',
};

const cardImage = {
  width: '100%',
  height: '140px',
  objectFit: 'cover' as const,
  borderRadius: '0px',
  display: 'block',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
};


const contentSection = {
  padding: '40px',
};

const greeting = {
  color: '#0d5a53',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 24px',
};

const paragraph = {
  color: '#173036',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 16px',
};

const tagline = {
  color: '#0d5a53',
  fontSize: '22px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '32px 0',
  fontStyle: 'italic',
};

const signoff = {
  color: '#173036',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '32px 0 0',
};

const divider = {
  borderColor: '#a7d9d5',
  borderWidth: '1px',
  borderStyle: 'solid',
  margin: '0 40px',
};


const footerSection = {
  backgroundColor: '#173036',
  padding: '40px',
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
