const SingleProject: React.FC<SingleProjectProps> = ({
  projectDescription,
  projectLink,
  projectTitle,
  projectImage
}) => {
  return (
    <a
      target="_blank"
      href={projectLink}
      className=" w-64 rounded-md overflow-hidden"
    >
      <img className="w-full h-36" src={projectImage} />
      <div className="py-5 px-4 bg-white">
        <h2 className="text-brand-main text-lg font-medium">{projectTitle}</h2>
        <p className="text-xs">{projectDescription}</p>
      </div>
    </a>
  );
};

export default SingleProject;
