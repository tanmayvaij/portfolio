import Resume from "./components/Resume";
import { resumeData } from "./data/resumeData";

const App = () => {
  return (
    <div className="flex items-center justify-center py-12 px-10 md:px-0">
      <Resume {...resumeData} />
    </div>
  );
};

export default App;
