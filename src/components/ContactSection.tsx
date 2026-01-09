import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import contactImage from "@/assets/happy-coder.png";

export const ContactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-primary text-primary-foreground overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold">
              Let's Connect.
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/70 font-body leading-relaxed max-w-lg">
              Always interested in discussing new projects, opportunities, or
              just having a conversation about tech.
            </p>

            <div className="mt-10 space-y-6">
              {/* Email */}
              <motion.a
                href="mailto:tanmayvaij22@gmail.com"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/50 font-body">
                    Email
                  </p>
                  <p className="font-heading font-medium group-hover:text-accent transition-colors">
                    tanmayvaij22@gmail.com
                  </p>
                </div>
              </motion.a>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/50 font-body">
                    Location
                  </p>
                  <p className="font-heading font-medium">Moshi, Pune, India</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex gap-4"
            >
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-full border-primary-foreground/20 bg-transparent hover:bg-primary-foreground/10 hover:border-primary-foreground/40"
              >
                <a
                  href="https://github.com/tanmayvaij"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-primary-foreground" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-full border-primary-foreground/20 bg-transparent hover:bg-primary-foreground/10 hover:border-primary-foreground/40"
              >
                <a
                  href="https://linkedin.com/in/tanmayvaij"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-primary-foreground" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-80 h-80 mx-auto">
              <img
                src={contactImage}
                alt="Let's work together"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
