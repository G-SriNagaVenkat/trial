import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "wouter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCourseById } from "../data/courses";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Aurora from "../components/Aurora";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import BlurText from "../components/BlurText";

gsap.registerPlugin(ScrollTrigger);

const CourseDetail = () => {
  const { id } = useParams();
  const course = getCourseById(id || "");
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeModule, setActiveModule] = useState(0);

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out"
        }
      );
    }

    // Content animations
    if (contentRef.current) {
      const sections = contentRef.current.querySelectorAll('.animate-section');
      sections.forEach((section, index) => {
        gsap.fromTo(section,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top bottom-=100",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Course Not Found</h1>
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Aurora />
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {course.category}
                </Badge>
                <div className="flex items-center gap-2">
                  <i className="fas fa-star text-yellow-400"></i>
                  <span className="font-semibold">{course.rating}</span>
                </div>
              </div>
              
              <BlurText
                text={course.title}
                className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
                delay={200}
              />
              
              <p className="text-xl text-gray-300 leading-relaxed">
                {course.description}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <i className="fas fa-clock text-blue-400"></i>
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-signal text-green-400"></i>
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-users text-purple-400"></i>
                  <span>{course.students.toLocaleString()} students</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-3xl font-bold text-green-400">{course.price}</span>
                  <span className="text-lg text-gray-400 line-through ml-2">{course.originalPrice}</span>
                </div>
                <Link href={`/course/${course.id}/enroll`}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full"
                    data-testid="button-enroll-course"
                  >
                    Enroll Now
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Course Highlights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Job Guarantee</span>
                    <Badge variant={course.jobGuarantee ? "default" : "secondary"} className="bg-green-500/20 text-green-400">
                      {course.jobGuarantee ? "✓ Guaranteed" : "Not Included"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Placement Rate</span>
                    <span className="font-semibold text-green-400">{course.placementRate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Average Salary</span>
                    <span className="font-semibold text-blue-400">{course.averageSalary}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Certification</span>
                    <i className="fas fa-certificate text-yellow-400"></i>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div ref={contentRef} className="max-w-6xl mx-auto px-6 pb-20 space-y-20">
        
        {/* Instructor Section */}
        <section className="animate-section">
          <Card className="bg-gray-900/30 border-gray-700/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Meet Your Instructor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  {course.instructor.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{course.instructor}</h3>
                  <p className="text-gray-300 leading-relaxed">{course.instructorBio}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Skills Section */}
        <section className="animate-section">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-8">
            Skills You'll Master
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {course.skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-blue-500/10 text-blue-400 border-blue-500/30 py-2 px-4 text-center justify-center"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        {/* Curriculum Section */}
        <section className="animate-section">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-8">
            Course Curriculum
          </h2>
          <div className="space-y-4">
            {course.curriculum.map((module, index) => (
              <Card 
                key={index} 
                className={`bg-gray-900/30 border-gray-700/30 backdrop-blur-sm cursor-pointer transition-all duration-300 ${
                  activeModule === index ? 'border-blue-500/50' : ''
                }`}
                onClick={() => setActiveModule(activeModule === index ? -1 : index)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">
                      Module {index + 1}: {module.module}
                    </CardTitle>
                    <i className={`fas fa-chevron-${activeModule === index ? 'up' : 'down'} text-gray-400`}></i>
                  </div>
                </CardHeader>
                {activeModule === index && (
                  <CardContent className="pt-0">
                    <div className="grid md:grid-cols-2 gap-3">
                      {module.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center gap-2 text-gray-300">
                          <i className="fas fa-check text-green-400 text-sm"></i>
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Prerequisites Section */}
        <section className="animate-section">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-8">
            Prerequisites
          </h2>
          <Card className="bg-gray-900/30 border-gray-700/30 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="space-y-3">
                {course.prerequisites.map((prerequisite, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300">
                    <i className="fas fa-arrow-right text-blue-400"></i>
                    <span>{prerequisite}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="animate-section">
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                Ready to Launch Your Career?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of successful graduates and start your journey to a guaranteed tech career today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/course/${course.id}/enroll`}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-12 py-4 rounded-full"
                    data-testid="button-enroll-cta"
                  >
                    Enroll Now - {course.price}
                  </Button>
                </Link>
                <Link href="/#contact">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 px-12 py-4 rounded-full"
                    data-testid="button-contact-advisor"
                  >
                    Talk to an Advisor
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetail;