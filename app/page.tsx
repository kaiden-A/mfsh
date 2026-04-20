import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Ticker from "./components/sections/Ticker";
import StackSection from "./components/sections/StackSection";
import ManifestoSection from "./components/sections/Manifesto";
import CurriculumSection from "./components/sections/Curriculum";
import Footer from "./components/layout/Footer";
import ChatWidget from "./components/widgets/ChatWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Ticker />
      <StackSection />
      <ManifestoSection />
      <CurriculumSection />
      <Footer />
      <ChatWidget />
    </>
  );
}