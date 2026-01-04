import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Users, Briefcase, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { FloatingCard } from "@/components/FloatingCard";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const testimonials = [
  {
    quote: "VouchSafe transformed how we hire. Trust scores make all the difference.",
    author: "Sarah Chen",
    role: "HR Director, TechCorp",
  },
  {
    quote: "Finally, a platform that values verified trust over anonymous ratings.",
    author: "Michael Brown",
    role: "Small Business Owner",
  },
  {
    quote: "My trust score opened doors I never knew existed. Highly recommend!",
    author: "Priya Sharma",
    role: "Verified Employee",
  },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { tSync } = useLanguage();
  const { login, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: tSync('Welcome back!'),
        description: tSync('You have successfully logged in.'),
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: tSync('Login failed'),
        description: error.response?.data?.message || 'Invalid credentials',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <LanguageToggle />
      
      {/* Left Side - Form */}
      <motion.div
        className="w-full lg:w-[55%] flex flex-col justify-center px-8 lg:px-16 xl:px-24 bg-background"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-md mx-auto w-full">
          <Logo size="lg" className="mb-12" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {tSync('Welcome Back to Trusted Work').split(' ').slice(0, 3).join(' ')}
              <span className="block text-primary">{tSync('Welcome Back to Trusted Work').split(' ').slice(3).join(' ') || 'Trusted Work'}</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              {tSync('Verified people. Verified opportunities.')}
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{tSync('Email')}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{tSync('Password')}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">{tSync('Remember me')}</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline font-medium"
              >
                {tSync('Forgot password?')}
              </Link>
            </div>

            <Button
              type="submit"
              variant="glow"
              size="xl"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                tSync('Sign In')
              )}
            </Button>
          </motion.form>

          <motion.p
            className="text-center mt-8 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {tSync("Don't have an account?")}{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              {tSync('Create one')}
            </Link>
          </motion.p>
        </div>
      </motion.div>

      {/* Right Side - Visual */}
      <motion.div
        className="hidden lg:flex w-[45%] bg-gradient-to-br from-background-soft via-background to-primary/5 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-40 left-10 w-96 h-96 rounded-full bg-primary/3 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center px-12 w-full">
          {/* Floating stat cards */}
          <div className="space-y-4 mb-12">
            <FloatingCard
              icon={Users}
              value="5,000+"
              label={tSync('Verified Workers')}
              delay={0.4}
              className="ml-0"
            />
            <FloatingCard
              icon={Briefcase}
              value="10,000+"
              label={tSync('Jobs Completed Stats')}
              delay={0.6}
              className="ml-12"
            />
            <FloatingCard
              icon={CheckCircle}
              value="98%"
              label={tSync('Satisfaction Rate')}
              delay={0.8}
              className="ml-4"
            />
          </div>

          {/* Testimonial slider */}
          <div className="glass-strong rounded-2xl p-6 max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-foreground italic mb-4">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {testimonials[currentTestimonial].author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {testimonials[currentTestimonial].author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial dots */}
            <div className="flex gap-2 mt-4">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentTestimonial
                      ? "w-6 bg-primary"
                      : "w-2 bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
