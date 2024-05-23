import AboutMeCard from "./components/AboutMeCard";
import ExpCard from "./components/ExpCard";
import IdCard from "./components/IdCard";
import ProjectCard from "./components/ProjectCard";
import SkillCard from "./components/SkillCard";

const App = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-3 p-5 bg-gray-950">
      <IdCard />

      
      <AboutMeCard />

      <SkillCard />

      <ExpCard />

      <ProjectCard />

      
    </div>
  );
};

export default App;
