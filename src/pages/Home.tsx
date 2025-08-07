import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CoursesSection from "@/components/CoursesSection";
import InternshipSection from "@/components/InternshipSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollToPlugin);

const Home = () => {
  useEffect(() => {
    // Handle hash navigation on page load
    const handleHashNavigation = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            gsap.to(window, {
              duration: 1.5,
              scrollTo: element,
              ease: "power2.out",
            });
          }, 500); // Delay to ensure page is loaded
        }
      }
    };

    // Check for hash on initial load
    handleHashNavigation();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black-900 text-white">
      <Navigation />
      <HeroSection />
      <CoursesSection />
      <InternshipSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
