import AboutMeCard from "./components/AboutMeCard";
import ExpEduCard from "./components/ExpEduCard";
import IdCard from "./components/IdCard";
import ProjectsCard from "./components/ProjectsCard";
import SkillCard from "./components/SkillCard";

const App = () => {
  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 xl:grid-rows-3 gap-4 p-5 bg-gray-950">
      <IdCard />
      <AboutMeCard />
      <SkillCard />
      <ExpEduCard />
      <ProjectsCard />
    </div>
  );
};

export default App;
