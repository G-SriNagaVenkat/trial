import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "./BlurText";

gsap.registerPlugin(ScrollTrigger);

const InternshipSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('.glass-card');
    
    elements?.forEach((element, index) => {
      gsap.fromTo(element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, []);

  return (
    <section 
      id="internships" 
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <BlurText
            text="100% Guaranteed Internship Placement"
            delay={120}
            animateBy="words"
            direction="top"
            className="text-4xl md:text-5xl font-bold mb-6 text-blue-gradient"
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We don't just teach—we guarantee your success with our exclusive partner network
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Stats & Features */}
          <div className="space-y-8">
            
            {/* Placement Stats */}
            <div className="glass-card rounded-2xl p-8" data-testid="placement-stats">
              <h3 className="text-2xl font-bold mb-6 text-gradient">Placement Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Average Salary Increase</span>
                  <span className="text-2xl font-bold text-green-400" data-testid="stat-salary-increase">+156%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Time to First Interview</span>
                  <span className="text-2xl font-bold text-blue-400" data-testid="stat-interview-time">7 Days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Placement Success Rate</span>
                  <span className="text-2xl font-bold text-pink-400" data-testid="stat-success-rate">98.3%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Average Starting Salary</span>
                  <span className="text-2xl font-bold text-red-400" data-testid="stat-starting-salary">$95k</span>
                </div>
              </div>
            </div>
            
            {/* Partner Companies */}
            {/* <div className="glass-card rounded-2xl p-8" data-testid="partner-companies">
              <h3 className="text-2xl font-bold mb-6 text-gradient">Partner Companies</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">Google</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">Meta</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">Amazon</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">Netflix</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-400">Tesla</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-400">+500</div>
                </div>
              </div>
            </div> */}
            
          </div>
          
          {/* Right Column - Visual Elements & Testimonial */}
          <div className="space-y-8">
            {/* Animated Success Graphic */}
            <div className="glass-card rounded-2xl p-12 text-center" data-testid="success-graphic">
              <div className="relative">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-6 animate-pulse-glow">
                  <i className="fas fa-graduation-cap text-5xl text-white"></i>
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <i className="fas fa-star text-white text-sm"></i>
                </div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center animate-float">
                  <i className="fas fa-heart text-white text-xs"></i>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gradient mb-2">Success Guaranteed</h4>
              <p className="text-gray-300">Join thousands of successful graduates</p>
            </div>
            
            {/* Success Story */}
            <div className="glass-card rounded-2xl p-8" data-testid="success-story">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4" data-testid="testimonial-avatar">
                  <i className="fas fa-user text-white"></i>
                </div>
                <div>
                  <div className="font-semibold text-white" data-testid="testimonial-name">Alex Chen</div>
                  <div className="text-gray-400 text-sm" data-testid="testimonial-role">Software Engineer at Google</div>
                </div>
              </div>
              <p className="text-gray-300 italic" data-testid="testimonial-text">
                "CareerLaunch didn't just teach me to code—they transformed my entire career trajectory. From zero experience to landing my dream job at Google in just 6 months!"
              </p>
              <div className="flex text-yellow-400 mt-4" data-testid="testimonial-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default InternshipSection;
