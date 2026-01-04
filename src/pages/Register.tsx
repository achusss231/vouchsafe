import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Briefcase, Info, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";

type Role = "EMPLOYEE" | "EMPLOYER";

const Register = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role | null>(null);
  const [designation, setDesignation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created!",
        description: "Welcome to VouchSafe. Start building your trust score.",
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <motion.div
        className="w-full lg:w-[55%] flex flex-col justify-center px-8 lg:px-16 xl:px-24 bg-background"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-md mx-auto w-full">
          <Logo size="lg" className="mb-8" />

          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-border"}`} />
            <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-border"}`} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {step === 1 ? "Create Your Account" : "Complete Your Profile"}
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              {step === 1
                ? "Join the trusted employment network."
                : "Tell us a bit more about yourself."}
            </p>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  className="space-y-5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
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
                    <label className="text-sm font-medium text-foreground">Password</label>
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

                  <Button
                    type="button"
                    variant="glow"
                    size="xl"
                    className="w-full"
                    onClick={() => setStep(2)}
                    disabled={!name || !email || !password}
                  >
                    Continue
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  className="space-y-5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">I am a...</label>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        type="button"
                        onClick={() => setRole("EMPLOYEE")}
                        className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                          role === "EMPLOYEE"
                            ? "border-primary bg-primary-soft"
                            : "border-border hover:border-primary/30 bg-card"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {role === "EMPLOYEE" && (
                          <motion.div
                            className="absolute top-3 right-3"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <CheckCircle size={20} className="text-primary" />
                          </motion.div>
                        )}
                        <User className="h-8 w-8 mb-3 text-primary" />
                        <p className="font-semibold text-foreground">Employee</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Looking for work
                        </p>
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={() => setRole("EMPLOYER")}
                        className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                          role === "EMPLOYER"
                            ? "border-primary bg-primary-soft"
                            : "border-border hover:border-primary/30 bg-card"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {role === "EMPLOYER" && (
                          <motion.div
                            className="absolute top-3 right-3"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <CheckCircle size={20} className="text-primary" />
                          </motion.div>
                        )}
                        <Briefcase className="h-8 w-8 mb-3 text-primary" />
                        <p className="font-semibold text-foreground">Employer</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Hiring trusted workers
                        </p>
                      </motion.button>
                    </div>
                  </div>

                  {/* Designation field for employees */}
                  <AnimatePresence>
                    {role === "EMPLOYEE" && (
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="text-sm font-medium text-foreground">
                          Designation
                        </label>
                        <div className="relative">
                          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="e.g. Electrician, Plumber, Driver"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            className="pl-12"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Trust explanation */}
                  <motion.div
                    className="flex items-start gap-3 p-4 rounded-xl bg-primary-soft"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-primary">
                      Your Trust Score grows through verified work and vouches from employers. Start building trust today!
                    </p>
                  </motion.div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="xl"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="glow"
                      size="xl"
                      className="flex-1"
                      disabled={isLoading || !role}
                    >
                      {isLoading ? (
                        <motion.div
                          className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <motion.p
            className="text-center mt-8 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </motion.p>
        </div>
      </motion.div>

      {/* Right Side - Visual */}
      <motion.div
        className="hidden lg:flex w-[45%] bg-gradient-to-br from-primary/5 via-background to-background-soft relative overflow-hidden items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-success/5 blur-3xl" />

        <div className="relative z-10 text-center px-12">
          <motion.div
            className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 mb-8"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 40 40"
              fill="none"
              className="text-primary"
            >
              <path
                d="M20 4L6 12V20C6 28.837 12.163 36.412 20 38C27.837 36.412 34 28.837 34 20V12L20 4Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 20L18 24L26 16"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          <h2 className="text-3xl font-bold text-foreground mb-4">
            Build Trust,
            <span className="block text-primary">Get Hired</span>
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Join thousands of verified workers and employers in the most trusted employment network.
          </p>

          {/* Feature highlights */}
          <div className="mt-8 space-y-3 text-left max-w-xs mx-auto">
            {[
              "Verified trust scores",
              "Direct employer connections",
              "Transparent vouch system",
            ].map((feature, idx) => (
              <motion.div
                key={feature}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
              >
                <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle size={14} className="text-success" />
                </div>
                <span className="text-sm text-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
