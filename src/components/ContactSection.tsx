import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-foreground text-background">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 order-2 md:order-1">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Let's Connect.
          </h2>
          <p className="text-background/60 max-w-md text-lg leading-relaxed">
            Always interested in discussing new projects, opportunities, or just
            carrying on a conversation about tech.
          </p>

          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-background/40 mb-1">
                Email
              </p>
              <a
                href="mailto:tanmayvaij22@gmail.com"
                className="text-xl md:text-2xl font-mono hover:text-background/80 transition-colors border-b border-background/20 pb-1"
              >
                tanmayvaij22@gmail.com
              </a>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <a
              href="https://github.com/tanmayvaij"
              target="_blank"
              className="p-4 rounded-full border border-background/20 hover:bg-background hover:text-foreground transition-all"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/tanmayvaij/"
              target="_blank"
              className="p-4 rounded-full border border-background/20 hover:bg-background hover:text-foreground transition-all"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:tanmayvaij22@gmail.com"
              className="p-4 rounded-full border border-background/20 hover:bg-background hover:text-foreground transition-all"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2 relative aspect-square md:aspect-[4/3] w-full overflow-hidden rounded-2xl bg-background/5">
          <Image
            src="/handshake-man.png"
            fill
            alt="Lets Work Together"
            className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-700"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-24 mt-12 border-t border-background/10 flex justify-between text-xs text-background/40 uppercase tracking-widest">
        <span>© 2025 Tanmay Vaij</span>
        <span>Based in Pune, India</span>
      </div>
    </section>
  );
};
