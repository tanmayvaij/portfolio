import { FaGithub } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";

const SkillTag = ({ skill }: { skill: string }) => {
  return (
    <span className="rounded-md font-semibold text-[10px] px-1.5 py-0.5 bg-gray-100">
      {skill}
    </span>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  img,
  projectName,
  developmentPeriod,
  description,
  skills,
  deploymentLink,
  sourceCodeLink,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 hover:shadow-lg overflow-hidden flex flex-col">
      <img className="h-40 w-full" src={img} alt="" />
      <div className="px-2 flex flex-col flex-1">
        <h3 className="font-semibold mt-1 text-base">{projectName}</h3>
        <span className="text-xs">{developmentPeriod}</span>
        <p className="text-xs mt-2 text-gray-600 flex-1">{description}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {skills.map((skill, id) => (
            <SkillTag key={id} skill={skill} />
          ))}
        </div>
        <div className="py-2 flex gap-1">
          {deploymentLink && (
            <a
              href={deploymentLink}
              className="rounded-md flex space-x-1 items-center font-semibold text-[10px] px-2 py-1 bg-gray-950 text-white"
            >
              <CiGlobe className="text-sm" />
              <span>Website</span>
            </a>
          )}
          {sourceCodeLink && (
            <a
              href={sourceCodeLink}
              className="rounded-md flex space-x-1 items-center font-semibold text-[10px] px-2 py-1 bg-gray-950 text-white"
            >
              <FaGithub className="text-sm" />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
