import Header from "@/pages/Header.jsx";
import Main from "@/pages/Main.jsx";
import Skill from "@/pages/Skill.jsx";
import About from "@/pages/About.jsx";
import Experience  from "@/pages/Experience.jsx";
import Project from "@/pages/Project.jsx";
import Contact from "@/pages/Contact.jsx";

function App() {
  return (
    <div className="relative overflow-hidden bg-rich-black">
      <Header />
      <Main />
      <Skill />
      <About />
      <Experience />
      <Project />
      <Contact />
    </div>
  );
}

export default App;
