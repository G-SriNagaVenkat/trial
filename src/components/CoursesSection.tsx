import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpotlightCard from "./SpotlightCard";
import MagicBento from "./MagicBento";
import BlurText from "./BlurText";
import { courses } from "../data/courses";

// Ensure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

const getIconForCategory = (category: string): string => {
  switch (category) {
    case "Full Stack":
      return "fa-code";
    case "Data Science":
      return "fa-brain";
    case "Mobile Dev":
      return "fa-mobile-alt";
    case "Cloud Eng":
      return "fa-cloud";
    case "UX Design":
      return "fa-paint-brush";
    case "Security":
      return "fa-shield-alt";
    default:
      return "fa-code";
  }
};

interface CourseProps {
  id: string;
  category: string;
  rating: string;
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  color: string;
  spotlightColor: string;
  index: number;
}

const CourseCard = ({ id, category, rating, title, description, price, originalPrice, color, spotlightColor, index }: CourseProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Set initial state - card is hidden and positioned below
    gsap.set(card, { 
      opacity: 0, 
      y: 80,
      scale: 0.9,
      rotationX: 15
    });

    // Create timeline for better control
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top bottom-=100',
        end: 'bottom top+=50',
        toggleActions: 'play none none reverse',
        markers: false, // Set to true for debugging
        once: false,
        refreshPriority: -1
      }
    });

    // Card reveal animation with scroll trigger
    tl.to(card, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power3.out'
    });

    // Enhanced hover animations
    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -12,
        scale: 1.03,
        rotationX: -2,
        duration: 0.4,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      // Clean up ScrollTrigger instances for this card
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === card) {
          trigger.kill();
        }
      });
    };
  }, [index]);

  return (
    <SpotlightCard
      className="relative group cursor-pointer"
      spotlightColor={spotlightColor as `rgba(${number}, ${number}, ${number}, ${number})`}
    >
      <div 
        ref={cardRef}
        className="relative z-10"
        data-testid={`course-card-${index}`}
      >
        {/* Course Icon */}
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ backgroundColor: `${color}20` }}>
          <i className={`fas ${getIconForCategory(category)} text-2xl`} style={{ color }}></i>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span 
            className={`px-3 py-1 rounded-full text-sm font-semibold`}
            style={{ backgroundColor: `${color}20`, color }}
            data-testid={`course-category-${index}`}
          >
            {category}
          </span>
          <div className="flex text-yellow-400" data-testid={`course-rating-${index}`}>
            <i className="fas fa-star"></i>
            <span className="ml-1 text-white">{rating}</span>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-3" data-testid={`course-title-${index}`}>
          {title}
        </h3>
        <p className="text-gray-400 mb-6" data-testid={`course-description-${index}`}>
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="text-white">
            <span className="text-2xl font-bold" data-testid={`course-price-${index}`}>{price}</span>
            <span className="text-gray-500 line-through ml-2" data-testid={`course-original-price-${index}`}>{originalPrice}</span>
          </div>
          <Link href={`/course/${id}`}>
            <button 
              className="px-6 py-2 rounded-full text-white font-semibold hover:shadow-lg transition-all"
              style={{ background: `linear-gradient(135deg, ${color}, #8B5CF6)` }}
              data-testid={`course-enroll-${index}`}
            >
              Enroll Now
            </button>
          </Link>
        </div>
      </div>
    </SpotlightCard>
  );
};

const CoursesSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bentoSectionRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force ScrollTrigger refresh after component mounts
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Animate section title and subtitle
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
            once: false
          }
        }
      );
    }

    if (subtitleRef.current) {
      gsap.fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animate MagicBento section
    if (bentoSectionRef.current) {
      gsap.fromTo(bentoSectionRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bentoSectionRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
            once: false
          }
        }
      );
    }

    // Animate MagicBento container with scale effect
    if (bentoRef.current) {
      gsap.fromTo(bentoRef.current,
        { scale: 0.8, opacity: 0, rotationY: 15 },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 1.5,
          delay: 0.3,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: bentoRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
            once: false
          }
        }
      );
    }
  }, []);

  const coursesData = courses;

  return (
    <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <BlurText
            text="Guaranteed Internship Courses"
            delay={100}
            animateBy="words"
            direction="top"
            className="text-4xl md:text-5xl font-bold mb-6 text-blue-gradient"
          />
          <p ref={subtitleRef} className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose from our industry-leading programs designed by top tech companies
          </p>
        </div>
        
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {coursesData.map((course, index) => (
            <CourseCard
              key={course.id}
              {...course}
              index={index}
            />
          ))}
        </div>

        {/* MagicBento Interactive Cards Section */}
        <div ref={bentoSectionRef} className="text-center mb-12">
          <BlurText
            text="Interactive Learning Experience"
            delay={100}
            animateBy="words"
            direction="top"
            className="text-3xl md:text-4xl font-bold mb-4 text-blue-purple-gradient"
          />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore our innovative platform features with immersive interactive elements
          </p>
        </div>
        
        <div ref={bentoRef} className="flex justify-center">
          <MagicBento 
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
