import { useEffect, useRef, useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { gsap } from "gsap";
import { getCourseById } from "../data/courses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Aurora from "../components/Aurora";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import BlurText from "../components/BlurText";

const enrollmentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  experience: z.string().min(1, "Please select your experience level"),
  motivation: z.string().min(50, "Please tell us more about your motivation (minimum 50 characters)"),
  hasLaptop: z.boolean(),
  canCommitTime: z.boolean(),
  agreeTerms: z.boolean().refine(val => val === true, "You must agree to the terms and conditions"),
  hearAboutUs: z.string().optional(),
  linkedinProfile: z.string().optional(),
  githubProfile: z.string().optional()
});

type EnrollmentForm = z.infer<typeof enrollmentSchema>;

const CourseEnrollment = () => {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const course = getCourseById(id || "");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<EnrollmentForm>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      experience: "",
      motivation: "",
      hasLaptop: false,
      canCommitTime: false,
      agreeTerms: false,
      hearAboutUs: "",
      linkedinProfile: "",
      githubProfile: ""
    }
  });

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

    // Form animation
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.5,
          ease: "power3.out"
        }
      );
    }
  }, []);

  const handleSubmit = async (_data: EnrollmentForm) => {
    setIsSubmitting(true);
    
    try {
      // Simulate enrollment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Enrollment Successful!",
        description: "Welcome to CareerLaunch! You'll receive a confirmation email shortly with next steps.",
      });
      
      // Redirect to success page or course page
      setTimeout(() => {
        setLocation(`/course/${course?.id}?enrolled=true`);
      }, 2000);
      
    } catch (error) {
      toast({
        title: "Enrollment Failed",
        description: "There was an error processing your enrollment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

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
      <section ref={heroRef} className="relative pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30 mb-4">
            Enrollment
          </Badge>
          
          <BlurText
            text={`Enroll in ${course.title}`}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-6"
            delay={200}
          />
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Take the first step towards your guaranteed tech career. Complete the enrollment form below to secure your spot.
          </p>
        </div>
      </section>

      {/* Enrollment Form */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Course Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm sticky top-8">
              <CardHeader>
                <CardTitle className="text-white">Course Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-blue-400 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-300">{course.description}</p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Duration:</span>
                    <span className="text-white">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Level:</span>
                    <span className="text-white">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Students:</span>
                    <span className="text-white">{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Job Guarantee:</span>
                    <span className="text-green-400">✓ Yes</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-white">Total:</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-green-400">{course.price}</span>
                      <div className="text-sm text-gray-400 line-through">{course.originalPrice}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enrollment Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/30 border-gray-700/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Enrollment Application</CardTitle>
                <div className="flex items-center gap-2 mt-4">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        currentStep >= step ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'
                      }`}>
                        {step}
                      </div>
                      {step < 3 && <div className={`w-12 h-1 ${currentStep > step ? 'bg-blue-500' : 'bg-gray-600'}`} />}
                    </div>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent>
                <form ref={formRef} onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                          <Input
                            {...form.register("firstName")}
                            className="bg-gray-800/50 border-gray-600 text-white"
                            placeholder="John"
                            data-testid="input-first-name"
                          />
                          {form.formState.errors.firstName && (
                            <p className="text-red-400 text-sm mt-1">{form.formState.errors.firstName.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                          <Input
                            {...form.register("lastName")}
                            className="bg-gray-800/50 border-gray-600 text-white"
                            placeholder="Doe"
                            data-testid="input-last-name"
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
                          className="bg-gray-800/50 border-gray-600 text-white"
                          placeholder="john.doe@example.com"
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
                          className="bg-gray-800/50 border-gray-600 text-white"
                          placeholder="+1 (555) 123-4567"
                          data-testid="input-phone"
                        />
                        {form.formState.errors.phone && (
                          <p className="text-red-400 text-sm mt-1">{form.formState.errors.phone.message}</p>
                        )}
                      </div>
                      
                      <Button 
                        type="button" 
                        onClick={nextStep}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        data-testid="button-next-step1"
                      >
                        Next Step
                      </Button>
                    </div>
                  )}

                  {/* Step 2: Background & Experience */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white mb-4">Background & Experience</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Programming Experience Level</label>
                        <Select onValueChange={(value) => form.setValue("experience", value)}>
                          <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white" data-testid="select-experience">
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="complete-beginner">Complete Beginner</SelectItem>
                            <SelectItem value="some-basics">Know Some Basics</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                        {form.formState.errors.experience && (
                          <p className="text-red-400 text-sm mt-1">{form.formState.errors.experience.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Why do you want to join this course?</label>
                        <Textarea
                          {...form.register("motivation")}
                          className="bg-gray-800/50 border-gray-600 text-white min-h-[120px]"
                          placeholder="Tell us about your career goals and motivation for joining this program..."
                          data-testid="textarea-motivation"
                        />
                        {form.formState.errors.motivation && (
                          <p className="text-red-400 text-sm mt-1">{form.formState.errors.motivation.message}</p>
                        )}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn Profile (Optional)</label>
                          <Input
                            {...form.register("linkedinProfile")}
                            className="bg-gray-800/50 border-gray-600 text-white"
                            placeholder="https://linkedin.com/in/yourprofile"
                            data-testid="input-linkedin"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">GitHub Profile (Optional)</label>
                          <Input
                            {...form.register("githubProfile")}
                            className="bg-gray-800/50 border-gray-600 text-white"
                            placeholder="https://github.com/yourusername"
                            data-testid="input-github"
                          />
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <Button 
                          type="button" 
                          onClick={prevStep}
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-800"
                          data-testid="button-prev-step2"
                        >
                          Previous
                        </Button>
                        <Button 
                          type="button" 
                          onClick={nextStep}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          data-testid="button-next-step2"
                        >
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Commitment & Agreement */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white mb-4">Commitment & Agreement</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">How did you hear about us?</label>
                        <Select onValueChange={(value) => form.setValue("hearAboutUs", value)}>
                          <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white" data-testid="select-hear-about">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="google">Google Search</SelectItem>
                            <SelectItem value="social-media">Social Media</SelectItem>
                            <SelectItem value="friend">Friend/Referral</SelectItem>
                            <SelectItem value="advertisement">Advertisement</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="hasLaptop"
                            {...form.register("hasLaptop")}
                            data-testid="checkbox-laptop"
                          />
                          <label htmlFor="hasLaptop" className="text-gray-300">
                            I have access to a laptop/computer for the duration of the course
                          </label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="canCommitTime"
                            {...form.register("canCommitTime")}
                            data-testid="checkbox-time"
                          />
                          <label htmlFor="canCommitTime" className="text-gray-300">
                            I can commit to 20+ hours per week for the course duration
                          </label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="agreeTerms"
                            {...form.register("agreeTerms")}
                            data-testid="checkbox-terms"
                          />
                          <label htmlFor="agreeTerms" className="text-gray-300">
                            I agree to the terms and conditions and enrollment policies
                          </label>
                        </div>
                        {form.formState.errors.agreeTerms && (
                          <p className="text-red-400 text-sm">{form.formState.errors.agreeTerms.message}</p>
                        )}
                      </div>
                      
                      <div className="flex gap-4">
                        <Button 
                          type="button" 
                          onClick={prevStep}
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-800"
                          data-testid="button-prev-step3"
                        >
                          Previous
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                          data-testid="button-submit-enrollment"
                        >
                          {isSubmitting ? "Processing..." : `Complete Enrollment - ${course.price}`}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseEnrollment;