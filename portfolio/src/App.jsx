import Header from "@/pages/Header.jsx";
import Main from "@/pages/Main.jsx";
import About from "@/pages/About.jsx";
import Experience  from "@/pages/Experience.jsx";
import Project from "@/pages/Project.jsx";

function App() {
  return (
    <div className="relative overflow-hidden bg-rich-black">
      <Header />
      <Main />
      <About />
      <Experience />
      <Project />
    </div>
  );
}

export default App;
