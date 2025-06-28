interface ProjectCard {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  category: "frontend" | "backend" | "fullstack" | "mobile";
  image: string;
}

interface AppContext {
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  scrollToSection: (sectionId: string) => void;
}
