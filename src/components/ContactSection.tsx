import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          Get In Touch
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8 flex flex-col justify-center flex-wrap-reverse wra">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Let's Work Together
              </h3>
              <p className="text-gray-300 text-lg">
                I'm always open to discussing new opportunities and interesting
                projects. Let's create something amazing together!
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-300">
                <Mail className="text-white" size={20} />
                <span>tanmayvaij22@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <Phone className="text-white" size={20} />
                <span>+91 8408882079</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <MapPin className="text-white" size={20} />
                <span>Pune, Maharashtra</span>
              </div>
            </div>
            <div className="flex gap-4">
              <a
                href="https://github.com/tanmayvaij"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 border border-gray-600 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-950 transition-all"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/tanmayvaij/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 border border-gray-600 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-950 transition-all"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:tanmayvaij22@gmail.com"
                className="w-12 h-12 bg-gray-800 border border-gray-600 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-950 transition-all"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div className="overflow-hidden relative h-[500px] rounded-xl">
            <Image fill src="/handshake-man.png" alt="Handshaking person" />
          </div>
        </div>
      </div>
    </section>
  );
};
