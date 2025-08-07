import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { initializeGoogleSignIn, signInWithGoogle, isGoogleSignInAvailable } from "@/lib/googleAuth";
import Aurora from "@/components/Aurora";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [googleAvailable, setGoogleAvailable] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    // Initialize Google Sign-In when component mounts
    const timer = setTimeout(() => {
      initializeGoogleSignIn();
      setGoogleAvailable(isGoogleSignInAvailable());
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create user session
    const user = {
      id: Date.now().toString(),
      email: data.email,
      loginMethod: 'email' as const
    };
    
    login(user);
    
    toast({
      title: "Login Successful!",
      description: `Welcome back, ${data.email}!`,
    });
    
    setIsLoading(false);
    
    // Redirect to home
    setLocation("/");
  };

  const handleGoogleLogin = async () => {
    if (!googleAvailable) {
      toast({
        title: "Google Sign-In Not Available",
        description: "Please configure VITE_GOOGLE_CLIENT_ID in your .env file",
        variant: "destructive",
      });
      return;
    }

    setIsGoogleLoading(true);
    
    try {
      const user = await signInWithGoogle();
      login(user);
      
      toast({
        title: "Google Login Successful!",
        description: `Welcome ${user.firstName || user.email}!`,
      });
      
      setLocation("/");
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast({
        title: "Google Sign-In Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Aurora />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <Card className="w-full max-w-md mx-auto bg-black/40 backdrop-blur-xl border-purple-500/30">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <i className="fas fa-rocket text-white"></i>
              </div>
              <span className="text-2xl font-bold text-gradient">CareerLaunch</span>
            </div>
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-gray-300">
              Sign in to your account to continue your learning journey
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Google Login Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full mb-6 bg-white hover:bg-gray-50 text-gray-900 border-gray-300 font-medium py-3"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading || !googleAvailable}
              data-testid="google-login"
            >
              {isGoogleLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-3"></div>
              ) : (
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              {isGoogleLoading ? 'Signing in...' : googleAvailable ? 'Continue with Google' : 'Configure Google OAuth'}
            </Button>
            
            <div className="relative mb-6">
              <Separator className="bg-gray-600" />
              <div className="absolute inset-0 flex justify-center items-center">
                <span className="bg-black/40 px-3 text-gray-400 text-sm">or</span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          className="bg-black/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                          data-testid="login-email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          className="bg-black/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                          data-testid="login-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                  disabled={isLoading}
                  data-testid="login-submit"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Don't have an account?{" "}
                <Link href="/signup">
                  <span className="text-blue-400 hover:text-blue-300 cursor-pointer underline" data-testid="signup-link">
                    Sign up here
                  </span>
                </Link>
              </p>
            </div>
            
            <div className="mt-4 text-center">
              <Link href="/">
                <span className="text-gray-400 hover:text-gray-300 cursor-pointer underline text-sm" data-testid="back-home">
                  ← Back to Home
                </span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;