import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Aurora from "./Aurora";
import Particles from "./Particles";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      ".hero-content",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
    );

    const counters = statsRef.current?.querySelectorAll('[data-counter]');
    counters?.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-counter') || '0');

      ScrollTrigger.create({
        trigger: counter,
        start: 'top bottom-=100',
        onEnter: () => {
          gsap.to(counter, {
            innerHTML: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            onUpdate: function () {
              counter.innerHTML = Math.floor(parseFloat(counter.innerHTML)).toString();
            }
          });
        }
      });
    });

    gsap.to('.floating-element', {
      y: -20,
      duration: 3,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
      stagger: 0.5
    });
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 parallax-section overflow-hidden"
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#3A29FF", "#70fff3", "#70fff3"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Particles Background */}
      <div className="absolute inset-0 z-[1]" style={{ width: '100%', height: '100vh' }}>
        <Particles
          particleColors={['#ffffff', '#000000ff', '#3B82F6']}
          particleCount={150}
          particleSpread={12}
          speed={0.1}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto text-center z-20 hero-content relative">
        <h1
          className="relative z-[2] font-black mb-6 leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent border-r-4 border-white"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 6rem)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            animation: 'typing 4s steps(20, end), blink 0.75s step-end infinite',
            fontFamily: 'monospace'
          }}
        >
          Start Your Career
        </h1>

        <h2 className="relative z-[2] text-3xl md:text-4xl font-bold mb-4 leading-tight bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
          Learn. Build. Get Hired.
        </h2>

        <h3 className="relative z-[2] text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
          Accelerate Your Tech Career
        </h3>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Join thousands of students who landed their dream internships through our guaranteed placement program
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 rounded-full text-white text-lg font-semibold hover:shadow-xl hover:shadow-purple-500/40 transition-all animate-pulse-glow"
            data-testid="hero-start-journey"
          >
            <i className="fas fa-play mr-2"></i>
            Start Your Journey
          </button>
          <button
            className="border-2 border-white/20 px-8 py-4 rounded-full text-white text-lg font-semibold hover:border-blue-400 hover:text-blue-400 transition-all"
            data-testid="hero-watch-demo"
          >
            <i className="fas fa-video mr-2"></i>
            Watch Demo
          </button>
        </div>

        {/* Hero Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent"
              data-counter="2500"
              data-testid="stat-students-placed"
            >
              0
            </div>
            <div className="text-gray-400 mt-2">Students Placed</div>
          </div>
          <div className="text-center">
            <div
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent"
              data-counter="98"
              data-testid="stat-success-rate"
            >
              0
            </div>
            <div className="text-gray-400 mt-2">Success Rate</div>
          </div>
          <div className="text-center">
            <div
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent"
              data-counter="500"
              data-testid="stat-partner-companies"
            >
              0
            </div>
            <div className="text-gray-400 mt-2">Partner Companies</div>
          </div>
          <div className="text-center">
            <div
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent"
              data-counter="24"
              data-testid="stat-course-tracks"
            >
              0
            </div>
            <div className="text-gray-400 mt-2">Course Tracks</div>
          </div>
        </div>
      </div>

      {/* Floating Circles */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-blue-500/20 rounded-full floating-element"></div>
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-pink-500/20 rounded-full floating-element"></div>
      <div className="absolute top-1/2 left-20 w-12 h-12 bg-red-500/20 rounded-full floating-element"></div>

      {/* Typing Keyframes */}
      <style>
        {`
          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }

          @keyframes blink {
            50% { border-color: transparent }
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
