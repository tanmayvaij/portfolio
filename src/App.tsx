import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Blogs, Home, Projects, SingleBlog } from "./screens";
import { Navbar, Footer } from "./components";
import { navbarData } from "./data";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar
        data={navbarData}
        imageSource="project.png"
        contactLink="https://www.instagram.com/tech_monster_tony"
        isFloating={true}
      />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/blogs" Component={Blogs} />
        <Route path="/blogs/:blogId" Component={SingleBlog} />
        <Route path="/projects" Component={Projects} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
