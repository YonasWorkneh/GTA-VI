import { useAppContext } from "./context/AppContext";

import NavBar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Story from "./components/Story";
import Features from "./components/Features";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Trailer from "./components/Trailer";


function App() {
  const { isTrailerOpen } = useAppContext();
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
      {isTrailerOpen && <Trailer />}
    </main>
  );
}

export default App;
