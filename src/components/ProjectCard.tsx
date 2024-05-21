interface ProjectCardProps {
  imageSource?: string;
  title?: string;
  description?: string;
  projectPath?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = () => {
  return (
    <div className=" flex mx-3 my-5 hover:scale-105 cursor-pointer">
      <img className="rounded-xl w-40 h-48" src="bg.jpg" alt="" />
      <div className="w-72 px-4 py-3">
        <p className="font-semibold text-blue-900">Python Mail Sender</p>
        <p className="mt-2 text-sm text-gray-500">
          A simple mail sender, creating using python programming language for
          sending automated mail to multiple clients with custom attachments
        </p>
        <p className="text-red-500 pt-3 pl-1 text-sm ">View Project</p>
      </div>
    </div>
  );
};

export default ProjectCard;
