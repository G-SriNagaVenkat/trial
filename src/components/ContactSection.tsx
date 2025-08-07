import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Particles from "./Particles";
import BlurText from "./BlurText";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  course: z.string().min(1, "Please select a course"),
  message: z.string().min(1, "Message is required"),
  newsletter: z.boolean().optional()
});

type ContactForm = z.infer<typeof contactSchema>;

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      course: "",
      message: "",
      newsletter: false
    }
  });

  useEffect(() => {
    // Animate section title
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
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animate form
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const handleSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    
    // Simulate API call for demo purposes
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (data: ContactForm) => {
    handleSubmit(data);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0" style={{ width: '100%', height: '100%' }}>
        <Particles
          particleColors={['#ffffff', '#EC4899', '#3B82F6']}
          particleCount={100}
          particleSpread={8}
          speed={0.05}
          particleBaseSize={60}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={true}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <BlurText
            text="Ready to Launch Your Career?"
            delay={130}
            animateBy="words"
            direction="top"
            className="text-4xl md:text-5xl font-bold mb-6 text-blue-gradient"
          />
          <p className="text-xl text-gray-300">
            Join thousands of successful graduates and start your transformation today
          </p>
        </div>
        
        <div className="glass-card rounded-2xl p-8 md:p-12" data-testid="contact-form-container">
          <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                <Input
                  {...form.register("firstName")}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  placeholder="Enter your first name"
                  data-testid="input-firstname"
                />
                {form.formState.errors.firstName && (
                  <p className="text-red-400 text-sm mt-1">{form.formState.errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                <Input
                  {...form.register("lastName")}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  placeholder="Enter your last name"
                  data-testid="input-lastname"
                />
                {form.formState.errors.lastName && (
                  <p className="text-red-400 text-sm mt-1">{form.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <Input
                {...form.register("email")}
                type="email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                placeholder="Enter your email"
                data-testid="input-email"
              />
              {form.formState.errors.email && (
                <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
              <Input
                {...form.register("phone")}
                type="tel"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                placeholder="Enter your phone number"
                data-testid="input-phone"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Interested Course</label>
              <Select onValueChange={(value) => form.setValue("course", value)}>
                <SelectTrigger 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  data-testid="select-course"
                >
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fullstack">Full Stack Development</SelectItem>
                  <SelectItem value="datascience">AI & Data Science</SelectItem>
                  <SelectItem value="mobile">Mobile Development</SelectItem>
                  <SelectItem value="cloud">Cloud Engineering</SelectItem>
                  <SelectItem value="ux">UX/UI Design</SelectItem>
                  <SelectItem value="security">Cybersecurity</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.course && (
                <p className="text-red-400 text-sm mt-1">{form.formState.errors.course.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <Textarea
                {...form.register("message")}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                placeholder="Tell us about your goals and background..."
                data-testid="textarea-message"
              />
              {form.formState.errors.message && (
                <p className="text-red-400 text-sm mt-1">{form.formState.errors.message.message}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                {...form.register("newsletter")}
                id="newsletter"
                className="border-white/20"
                data-testid="checkbox-newsletter"
              />
              <label htmlFor="newsletter" className="text-sm text-gray-300">
                I want to receive updates about new courses and career opportunities
              </label>
            </div>
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 rounded-full text-white text-lg font-semibold hover:shadow-xl hover:shadow-purple-500/40 transition-all animate-pulse-glow"
              data-testid="button-submit"
            >
              <i className="fas fa-rocket mr-2"></i>
              {isSubmitting ? "Sending..." : "Start My Career Journey"}
            </Button>
          </form>
        </div>
        
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center" data-testid="contact-email">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-envelope text-white text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-400">hello@careerlaunch.com</p>
          </div>
          <div className="text-center" data-testid="contact-phone">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-phone text-white text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-400">+1 (555) 123-4567</p>
          </div>
          <div className="text-center" data-testid="contact-location">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-map-marker-alt text-white text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-400">San Francisco, CA</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
