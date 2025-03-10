import Welcome from "./components/Welcome";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Vault from "./components/Vault";
import About from "./components/About";
import Overview from "./components/Overview";
import Backers from "./components/Backers";
import Updates from "./components/Updates";
import MobileWarning from "./components/ui/MobileWarning";

const App = () => {
  return (
    <main className="relative min-h-screen w-screen">
      <MobileWarning />
      <Navbar />
      <Hero />
      <Welcome />
      <Features />
      <Story />
      <Vault />
      <About />
      <Overview />
      <Backers />
      <Updates />
      <Contact />
      <Footer />
    </main>
  );
};

export default App;
