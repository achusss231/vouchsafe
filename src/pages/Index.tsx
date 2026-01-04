import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield,
  Users,
  Star,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Briefcase,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { TrustScoreRing } from "@/components/TrustScoreRing";
import { FloatingCard } from "@/components/FloatingCard";

const features = [
  {
    icon: Shield,
    title: "Verified Trust Scores",
    description: "Every worker's trust score is built through real, verified work history and employer vouches.",
  },
  {
    icon: Users,
    title: "Direct Connections",
    description: "Connect directly with trusted workers in your area. No intermediaries, no hidden fees.",
  },
  {
    icon: Star,
    title: "Transparent Vouching",
    description: "Employers vouch for workers they've hired, creating a transparent web of trust.",
  },
  {
    icon: TrendingUp,
    title: "Growing Reputation",
    description: "Workers build their reputation over time, creating long-term career opportunities.",
  },
];

const stats = [
  { value: "5,000+", label: "Verified Workers" },
  { value: "10,000+", label: "Jobs Completed" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "50+", label: "Cities Covered" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="default">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-success/5 blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-soft text-primary text-sm font-medium mb-6">
                <Shield size={16} />
                Trust-Driven Employment
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Hire with
                <span className="text-primary"> Confidence</span>,
                <br />
                Work with <span className="text-primary">Trust</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                The hyper-local employment platform where verified trust scores replace anonymous ratings. Find reliable workers or build your trusted reputation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button variant="glow" size="xl" className="w-full sm:w-auto">
                    Start Building Trust
                    <ArrowRight size={20} />
                  </Button>
                </Link>
                <Link to="/search">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    Find Workers
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Visual */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Main card */}
              <div className="relative">
                <div className="card-elevated p-8 max-w-md mx-auto">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl font-bold text-primary">
                      A
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Arjun Kumar</h3>
                      <p className="text-primary">Master Electrician</p>
                    </div>
                  </div>

                  <div className="flex justify-center mb-6">
                    <div className="trust-glow rounded-full">
                      <TrustScoreRing score={92} size="lg" />
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap mb-4">
                    {["Verified", "Top Rated", "Fast Responder"].map((badge) => (
                      <span
                        key={badge}
                        className="px-3 py-1 rounded-full bg-success-soft text-success text-xs font-medium flex items-center gap-1"
                      >
                        <CheckCircle size={12} />
                        {badge}
                      </span>
                    ))}
                  </div>

                  <Button variant="default" className="w-full">
                    <Briefcase size={16} />
                    Send Job Request
                  </Button>
                </div>

                {/* Floating cards */}
                <FloatingCard
                  icon={Users}
                  value="48"
                  label="Vouches Received"
                  delay={0.5}
                  className="absolute -left-8 top-8"
                />
                <FloatingCard
                  icon={Award}
                  value="156"
                  label="Jobs Completed"
                  delay={0.7}
                  className="absolute -right-8 bottom-8"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background-soft">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose <span className="text-primary">VouchSafe</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're building the most trusted employment network where reputation matters.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card-interactive p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary-soft text-primary mb-4">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple steps to start hiring trusted workers or building your reputation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Create Account",
                description: "Sign up as an employer or employee. Verify your identity to start building trust.",
              },
              {
                step: "02",
                title: "Connect & Work",
                description: "Find trusted workers or accept job requests. Complete work professionally.",
              },
              {
                step: "03",
                title: "Vouch & Grow",
                description: "Employers vouch for great workers. Build your trust score with every successful job.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4">
                  {item.step}
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-6">
          <motion.div
            className="card-elevated p-12 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Ready to Build <span className="text-primary">Trust</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              Join thousands of verified workers and employers in the most trusted employment network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="glow" size="xl">
                  Get Started Free
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/search">
                <Button variant="outline" size="xl">
                  Browse Workers
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border-soft">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo size="md" />
            <p className="text-muted-foreground text-sm">
              © 2024 VouchSafe. All rights reserved. Built with trust.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
