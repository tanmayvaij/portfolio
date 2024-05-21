import { Link } from "react-router-dom";
import { ProjectCard } from "../../components";

const ProjectSection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="sm:px-20">
        <div className="flex items-center justify-center">
          <img className="w-24 h-24" src="dev.jpg" />
          <p className="ml-3 text-4xl font-semibold">Projects</p>
        </div>

        <div className="text-center px-10 sm:px-28 pt-4 sm:py-5">
          <p>
            Explore the intersection of technology
            and design in these showcases, illustrating the versatility and
            adaptability embedded in every line of code. You can also have a
            visit to my{" "}
            <Link to="/projects" className="text-blue-600 font-semibold">
              Projects
            </Link>{" "}
            page to view all my creations.
          </p>
        </div>

        <div className="flex items-center justify-center flex-wrap py-10">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
