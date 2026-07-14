import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Rejections from "@/components/sections/Rejections";
import Stats from "@/components/sections/Stats";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import About from "@/components/sections/About";
import CallToAction from "@/components/sections/CallToAction";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Rejections />
        <Stats />
        <Features />
        <HowItWorks />
        <About />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
