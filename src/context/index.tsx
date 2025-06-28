"use client"

import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext<AppContext | null>(null);

const AppContext = ({ children }: { children: React.ReactNode }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <Context.Provider
      value={{
        activeSection,
        setActiveSection,
        isMenuOpen,
        setIsMenuOpen,
        isVisible,
        setIsVisible,
        scrollToSection,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;

export const useAppValues = () => {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useAppValues must be used inside AppContext");
  return ctx;
};
