const ProjectCard = () => {
  return (
    <div className="bg-sky-500 lg:col-span-2 xl:row-span-1 xl:col-span-2 flex items-center flex-col rounded-xl px-5 py-10 ">
      <h2 className="text-2xl font-semibold mb-10 text-white">My Top Work</h2>

      <div className="flex flex-wrap justify-center gap-2">

        <a href="https://oiconomos.com/" className=" w-64 rounded-md overflow-hidden">
          <img className="w-full h-36" src="website.jpg" alt="project" />
          <div className="py-5 px-4 bg-white">
            <h2 className="text-brand-main text-lg font-medium">
              Oiconomos Website
            </h2>
            <p className="text-xs">
              OICONOMOS, an initiative aimed at helping everyone stay organized
              with their personal finances and ensuring that no family is
              deprived of their rightful funds.
            </p>
          </div>
        </a>

        <a href="https://play.google.com/store/apps/details?id=com.systemonsilicon.agrotick&hl=es" className=" w-64 rounded-md overflow-hidden">
          <img className="w-full h-36" src="agro.jpeg" alt="project" />
          <div className="py-5 px-4 bg-white">
            <h2 className="text-brand-main text-lg font-medium">AgroTick</h2>
            <p className="text-xs">
              AgroTick, a mobile based IoT solution for Smart
              Agriculture works at different levels including, adaptive water
              control through WSN, efficient communication through Cloud
              Computing etc.
            </p>
          </div>
        </a>

        <a href="https://buddy-social-media.netlify.app" className="w-64 rounded-md overflow-hidden">
          <img className="w-full h-36" src="blog.webp" alt="project" />
          <div className="py-5 px-4 bg-white">
            <h2 className="text-brand-main text-lg font-medium">
              Buddy - Social Media
            </h2>
            <p className="text-xs">
              Buddy, a social media web application, is a platform for blogging,
              photo posting and personal chatting. It's my personal project
              where I tried to include all basic features of a social media
              platform.
            </p>
          </div>
        </a>

      </div>
    </div>
  );
};

export default ProjectCard;
