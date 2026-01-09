import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import heroAvatar from "@/assets/hero-avatar.png";

export const HeroSection = () => {
  return (
    <section
      id="overview"
      className="min-h-screen flex items-center pt-20 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tight text-foreground"
            >
              AI FULL
              <br />
              STACK
              <br />
              <span className="text-gradient">ENGINEER.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-lg font-body leading-relaxed"
            >
              Passionate Full Stack Developer skilled in building scalable web
              and mobile applications. Strong foundation in frontend, backend,
              cloud deployment, and DevOps automation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button variant="hero" size="xl" asChild>
                <a href="/Tanmay_Vaij_Resume.pdf" download>
                  <Download size={18} />
                  Download Resume
                </a>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a href="#experience">
                  See Experience
                  <ArrowRight size={18} />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Avatar Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] mx-auto">
              {/* Background accent blob */}
              <div className="absolute -top-4 -right-4 w-28 h-28 sm:w-36 sm:h-36 bg-accent rounded-full" />
              <div className="absolute -bottom-2 -left-2 w-20 h-20 sm:w-24 sm:h-24 bg-accent/30 rounded-full" />

              {/* Avatar image with clean presentation */}
              <motion.div
                className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5 shadow-elevated"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={heroAvatar}
                  alt="Tanmay Vaij - Full Stack Engineer"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
