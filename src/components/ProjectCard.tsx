const ProjectCard = () => {
  return (
    <div className="bg-sky-500 row-span-1 col-span-2 flex items-center flex-col rounded-xl px-5 py-10 ">
      <h2 className="text-2xl font-semibold mb-10 text-white">My Top Work</h2>

      <div className="flex space-x-6">

        <div className=" w-64 rounded-md overflow-hidden">
          <img className="w-full h-36" src="https://www.projectmanager.com/wp-content/uploads/2022/09/Project-Management.png" alt="project" />
          <div className="py-5 px-4 bg-white">
            <h2 className="text-brand-main text-lg font-medium">
              Oiconomos Website
            </h2>
            <p className="text-xs">Lorem ipsum dolor sit amet, Fuga earum atque et? Explicabo consequuntur</p>
          </div>
        </div>

        <div className=" w-64 rounded-md overflow-hidden">
          <img className="w-full h-36" src="https://www.projectmanager.com/wp-content/uploads/2022/09/Project-Management.png" alt="project" />
          <div className="py-5 px-4 bg-white">
            <h2 className="text-brand-main text-lg font-medium">
              Oiconomos Website
            </h2>
            <p className="text-xs">Lorem ipsum dolor sit amet, Fuga earum atque et? Explicabo consequuntur</p>
          </div>
        </div>

        <div className=" w-64 rounded-md overflow-hidden">
          <img className="w-full h-36" src="https://www.projectmanager.com/wp-content/uploads/2022/09/Project-Management.png" alt="project" />
          <div className="py-5 px-4 bg-white">
            <h2 className="text-brand-main text-lg font-medium">
              Oiconomos Website
            </h2>
            <p className="text-xs">Lorem ipsum dolor sit amet, Fuga earum atque et? Explicabo consequuntur</p>
          </div>
        </div>

        

      </div>
    </div>
  );
};

export default ProjectCard;
