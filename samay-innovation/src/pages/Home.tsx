import Hero from '../components/sections/Hero';
import ServicesHighlight from '../components/sections/ServicesHighlight';
import HorizontalPortfolio from '../components/sections/HorizontalPortfolio';
import Testimonials from '../components/sections/Testimonials';
import Stats from '../components/sections/Stats';
import InstagramSection from '../components/sections/InstagramSection';
import ContactCTA from '../components/sections/ContactCTA';
import SEO from '../components/seo/SEO';
import { localBusinessSchema, websiteSchema } from '../components/seo/schemas';

export default function Home() {
  return (
    <div>
      <SEO
        title="Samay Innovation — Luxury Interior Designer in Ahmedabad | Award-Winning Firm"
        description="Samay Innovation is an award-winning luxury interior design firm in Ahmedabad, Gujarat. Residential villas, 4BHK flats, farmhouses & commercial interiors. Featured in Forbes, Vogue & De-Mode. Serving Ahmedabad, Gujarat & US clients."
        keywords="best interior designer India, best Indian interior designer, award winning interior designer India, top interior design firm India, luxury interior designer India, best interior design studio India, premium interior designers India, Indian interior design firm, international interior design firm India, creative interior designers India, luxury home interior design India, modern interior designer India, best residential interior designer India, best commercial interior designer India, hospitality interior design India, interior designer Ahmedabad, luxury interior design Ahmedabad, residential interior designer Gujarat, villa interior design Ahmedabad, turnkey interior solutions Gujarat, Seme Nadvi designer"
        path="/"
        structuredData={[localBusinessSchema, websiteSchema]}
      />
      <Hero />
      
      <ServicesHighlight />
      
      <HorizontalPortfolio />
      
      <Testimonials />
      
      <Stats />

      <InstagramSection />

      <ContactCTA />
    </div>
  );
}
