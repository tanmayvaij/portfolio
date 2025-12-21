import {
  AboutSection,
  ContactSection,
  Footer,
  Header,
  HeroSection,
  ProjectSection,
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
        <ContactSection />
        <Footer />
      </AppContext>
    </div>
  );
};

export default Portfolio;
