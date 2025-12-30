import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import FlywheelSection from '@/components/FlywheelSection';
import MembershipSection from '@/components/MembershipSection';
import PlansSection from '@/components/PlansSection';
import WhoItsForSection from '@/components/WhoItsForSection';
import ApplicationForm from '@/components/ApplicationForm';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import StickyApplyButton from '@/components/StickyApplyButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <FlywheelSection />
        <MembershipSection />
        <PlansSection />
        <WhoItsForSection />
        <ApplicationForm />
        <ContactSection />
      </main>
      <Footer />
      <StickyApplyButton />
    </div>
  );
};

export default Index;
