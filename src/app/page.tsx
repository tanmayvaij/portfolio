import {
  AboutSection,
  ContactSection,
  Footer,
  Header,
  HeroSection,
  ProjectSection,
  SkillsSection,
} from "@/components";
import AppContext from "@/context";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <AppContext>
        <Header />
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </AppContext>
    </div>
  );
};

export default Portfolio;
