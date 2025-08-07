import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import logo from "./SwizoSoft.png";

gsap.registerPlugin(ScrollToPlugin);

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: element,
        ease: "power2.out",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-purple-500/20 backdrop-blur-md shadow-md shadow-purple-500/10 ${
          isScrolled ? "bg-black/30" : "bg-black/10"
        }`}
        data-testid="main-navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <img src={logo} alt="Logo" />
              </div>
              <span className="text-xl font-bold text-gradient">Swizosoft</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {["hero", "courses", "internships", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-white hover:text-blue-400 transition-colors capitalize"
                >
                  {section}
                </button>
              ))}
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-white">
                    Welcome, {user.firstName || user.email}
                  </span>
                  <button
                    onClick={logout}
                    className="border-2 border-purple-500 px-4 py-2 rounded-full text-white font-semibold hover:bg-purple-500 transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/login">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-full text-white font-semibold hover:shadow-lg transition-all animate-pulse-glow">
                    Get Started
                  </button>
                </Link>
              )}
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Slide-in Menu */}
          <div className="fixed top-0 right-0 w-4/5 max-w-xs h-full z-50 bg-black/60 backdrop-blur-lg shadow-lg rounded-l-xl p-6 flex flex-col space-y-6 animate-slide-in">
            <div className="flex justify-between items-center">
              <span className="text-white text-2xl font-semibold">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <nav className="flex flex-col space-y-5 mt-4">
              {["hero", "courses", "internships", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-lg text-white hover:text-blue-400 transition-colors capitalize"
                >
                  {section}
                </button>
              ))}

              {user ? (
                <div className="text-white mt-6 space-y-3">
                  <div className="text-lg">
                    Welcome, {user.firstName || user.email}
                  </div>
                  <button
                    onClick={logout}
                    className="w-full border-2 border-purple-500 px-4 py-2 rounded-full text-white font-semibold hover:bg-purple-500 transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/login">
                  <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-full text-white text-lg font-semibold">
                    Get Started
                  </button>
                </Link>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;
