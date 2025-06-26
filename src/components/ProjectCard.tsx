import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

type ProjectCardProps = {
  title: string;
  description: string;
  techStack: string[];
  link: string;
  image?: string;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  techStack,
  link,
  image = "/projects/home-page.png",
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
    >
      <Card className="flex flex-col h-full hover:shadow-md transition border border-muted">
        {image && (
          <div className="relative w-full h-40">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded-t-md"
            />
          </div>
        )}
        <CardContent className="flex flex-col flex-1 justify-between p-4">
          <div>
            <h3 className="text-base font-semibold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {description}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="bg-muted px-2 py-0.5 rounded whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </a>
  );
};
