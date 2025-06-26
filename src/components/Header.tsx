import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, Mail, FileText } from "lucide-react";

export const Header = () => {
  return (
    <header className="mb-12 text-center space-y-4">

      <div className="flex justify-center">
        <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-muted shadow-sm">
          <Image
            src="/profile-pic.png"
            alt="Tanmay Vaij"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <h1 className="text-4xl font-bold tracking-tight">Tanmay Vaij</h1>

      <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
        Cross-Platform App Developer | Backend Engineer | DevOps Enthusiast
      </p>

      <div className="flex justify-center gap-4 mt-4 flex-wrap">
        <a href="https://github.com/tanmayvaij" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="flex items-center gap-2">
            <Github size={16} />
            GitHub
          </Button>
        </a>

        <a href="mailto:youremail@example.com">
          <Button variant="outline" className="flex items-center gap-2">
            <Mail size={16} />
            Email
          </Button>
        </a>

        <a href="/TanmayVaij-Resume.pdf" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="flex items-center gap-2">
            <FileText size={16} />
            Resume
          </Button>
        </a>
      </div>
    </header>
  );
};
