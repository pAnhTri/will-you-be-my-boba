import Hero from "@/components/About/About-Hero";
import Section from "@/components/About/About-Section";
import ContactSection from "@/components/About/About-Section-Contact";
import DeveloperSection from "@/components/About/About-Section-Developer";
import FAQSection from "@/components/About/About-Section-FAQ";
import MissionSection from "@/components/About/About-Section-Mission";
import MissionCard from "@/components/About/About-Section-Mission-Card";
import BackToTop from "@/components/BackToTop";
import { LuSearch, LuStar, LuUser } from "react-icons/lu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Will You Be My Boba",
  description: "About Will You Be My Boba",
};

export const dynamic = "force-dynamic";

const About = () => {
  return (
    <main className="flex-1 container">
      <Hero />
      <Section id="mission" className="py-20 px-4 bg-white">
        <MissionSection />

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-10">
          <MissionCard
            title="Discover"
            icon={<LuSearch className="size-8 text-pink-500" />}
          >
            Find new boba shops and drinks in your area, with detailed
            information and community reviews.
          </MissionCard>
          <MissionCard
            title="Rate"
            icon={<LuStar className="size-8 text-pink-500" />}
          >
            Share your experiences by rating boba drinks, helping others find
            the best options.
          </MissionCard>
          <MissionCard
            title="Connect"
            icon={<LuUser className="size-8 text-pink-500" />}
          >
            Join a community of boba enthusiasts who share your passion for
            discovering new flavors and shops.
          </MissionCard>
        </div>
      </Section>
      <Section
        id="developer"
        className="py-20 px-4 bg-gradient-to-r from-pink-50 to-purple-50"
      >
        <DeveloperSection />
      </Section>
      <Section id="faq" className="py-20 px-4 bg-white">
        <FAQSection />
      </Section>
      <Section
        id="contact"
        className="py-20 px-4 bg-gradient-to-r from-pink-50 to-purple-50"
      >
        <ContactSection />
      </Section>
      <BackToTop />
    </main>
  );
};

export default About;
