import SingleProject from "./SingleProject";

const ProjectsCard: React.FC<ProjectsCardProps> = ({
  projects,
  sectionTitle,
}) => {
  return (
    <div className="bg-sky-500 lg:col-span-2 xl:row-span-1 xl:col-span-2 flex items-center flex-col rounded-xl px-5 py-10 ">
      <h2 className="text-2xl font-semibold mb-10 text-white">
        {sectionTitle}
      </h2>
      <div className="flex flex-wrap justify-center gap-2">
        {projects.map((props, id) => (
          <SingleProject key={id} {...props} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsCard;
