import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import Trailer from "./components/Trailer";
import { useEffect } from "react";

function App() {
  const { isTrailerOpen } = useAppContext();
  useEffect(() => {
    console.log("Hello, welcome to the console!");
    console.log(isTrailerOpen);
  });
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
