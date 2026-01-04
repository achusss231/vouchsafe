import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Briefcase,
  Star,
  CheckCircle,
  Award,
  TrendingUp,
  MessageSquare,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustScoreRing } from "@/components/TrustScoreRing";

// Mock profile data
const mockProfile = {
  id: "1",
  name: "Arjun Kumar",
  designation: "Master Electrician",
  location: "Mumbai, Maharashtra",
  memberSince: "January 2023",
  trustScore: 92,
  jobsCompleted: 156,
  avgRating: 4.9,
  totalVouches: 48,
  bio: "Experienced electrician with over 10 years in residential and commercial electrical work. Specialized in smart home installations, solar panel setups, and energy-efficient solutions.",
  skills: [
    "Residential Wiring",
    "Commercial Electrical",
    "Solar Panel Installation",
    "Smart Home Setup",
    "Maintenance & Repairs",
    "Energy Audits",
  ],
  badges: [
    { name: "Top Trusted", icon: Award, color: "gold" },
    { name: "Fast Responder", icon: TrendingUp, color: "success" },
    { name: "Community Favorite", icon: Star, color: "primary" },
  ],
  vouches: [
    {
      id: "v1",
      employerName: "Horizon Builders",
      rating: 5,
      comment:
        "Arjun did an excellent job with our office electrical renovation. Professional, punctual, and incredibly skilled.",
      date: "2 weeks ago",
      verified: true,
    },
    {
      id: "v2",
      employerName: "TechSpace Co.",
      rating: 5,
      comment: "Installed our entire smart home system flawlessly. Highly recommended!",
      date: "1 month ago",
      verified: true,
    },
    {
      id: "v3",
      employerName: "Green Living Projects",
      rating: 4,
      comment: "Great work on the solar panel installation. Very knowledgeable about energy efficiency.",
      date: "2 months ago",
      verified: true,
    },
  ],
  trustHistory: [65, 70, 75, 78, 82, 85, 88, 90, 91, 92],
};

const EmployeeProfile = () => {
  const { id } = useParams();
  const [expandedVouch, setExpandedVouch] = useState<string | null>(null);

  const profile = mockProfile; // In real app, fetch based on id

  return (
    <div className="min-h-screen bg-background-soft">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/search">
              <Button variant="ghost" size="icon">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold text-foreground">Employee Profile</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Hero Section */}
        <motion.div
          className="card-elevated p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Avatar & Trust Ring */}
            <div className="relative">
              <motion.div
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-5xl font-bold text-primary">
                  {profile.name.charAt(0)}
                </div>
                {/* Trust ring around avatar */}
                <div className="absolute -inset-2">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
                    <circle
                      cx="70"
                      cy="70"
                      r="66"
                      fill="none"
                      stroke="hsl(var(--border))"
                      strokeWidth="4"
                    />
                    <motion.circle
                      cx="70"
                      cy="70"
                      r="66"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 66}
                      initial={{ strokeDashoffset: 2 * Math.PI * 66 }}
                      animate={{
                        strokeDashoffset:
                          2 * Math.PI * 66 * (1 - profile.trustScore / 100),
                      }}
                      transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                      style={{
                        filter: "drop-shadow(0 0 8px hsl(var(--primary-glow) / 0.4))",
                      }}
                    />
                  </svg>
                </div>
                {/* Verified badge */}
                <div className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-success flex items-center justify-center border-4 border-card">
                  <CheckCircle size={16} className="text-success-foreground" />
                </div>
              </motion.div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-1">
                    {profile.name}
                  </h1>
                  <p className="text-lg text-primary font-medium mb-3">
                    {profile.designation}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {profile.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      Member since {profile.memberSince}
                    </span>
                  </div>
                </div>

                <div className="trust-glow rounded-full hidden md:block">
                  <TrustScoreRing score={profile.trustScore} size="lg" />
                </div>
              </div>

              {/* Bio */}
              <p className="mt-6 text-muted-foreground leading-relaxed">
                {profile.bio}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-secondary text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {profile.jobsCompleted}
                  </p>
                  <p className="text-xs text-muted-foreground">Jobs Done</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary text-center">
                  <p className="text-2xl font-bold text-foreground flex items-center justify-center gap-1">
                    {profile.avgRating}
                    <Star size={16} className="text-gold fill-gold" />
                  </p>
                  <p className="text-xs text-muted-foreground">Avg Rating</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {profile.totalVouches}
                  </p>
                  <p className="text-xs text-muted-foreground">Vouches</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <Button variant="glow" size="lg" className="flex-1">
                  <Briefcase size={18} />
                  Send Job Request
                </Button>
                <Button variant="outline" size="lg">
                  <MessageSquare size={18} />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Skills */}
            <motion.div
              className="card-elevated p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-4 py-2 rounded-full bg-primary-soft text-primary text-sm font-medium cursor-default hover:bg-primary hover:text-primary-foreground transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Badges */}
            <motion.div
              className="card-elevated p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">Badges</h2>
              <div className="space-y-3">
                {profile.badges.map((badge, index) => (
                  <motion.div
                    key={badge.name}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      badge.color === "gold"
                        ? "bg-gold-soft"
                        : badge.color === "success"
                        ? "bg-success-soft"
                        : "bg-primary-soft"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                  >
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        badge.color === "gold"
                          ? "bg-gold text-gold-soft"
                          : badge.color === "success"
                          ? "bg-success text-success-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <badge.icon size={18} />
                    </div>
                    <span className="font-medium text-foreground">{badge.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Vouches */}
          <motion.div
            className="lg:col-span-2 card-elevated p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Vouches & Reviews
            </h2>
            <div className="space-y-4">
              {profile.vouches.map((vouch, index) => (
                <motion.div
                  key={vouch.id}
                  className="p-5 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  onClick={() =>
                    setExpandedVouch(expandedVouch === vouch.id ? null : vouch.id)
                  }
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {vouch.employerName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground">
                            {vouch.employerName}
                          </p>
                          {vouch.verified && (
                            <CheckCircle
                              size={14}
                              className="text-primary fill-primary-soft"
                            />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{vouch.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 + i * 0.05 }}
                        >
                          <Star
                            size={16}
                            className={`${
                              i < vouch.rating
                                ? "text-gold fill-gold"
                                : "text-border"
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    <motion.p
                      className="text-muted-foreground leading-relaxed"
                      initial={{ height: "auto" }}
                      animate={{
                        height: expandedVouch === vouch.id ? "auto" : "3rem",
                      }}
                      style={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: expandedVouch === vouch.id ? "unset" : 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      "{vouch.comment}"
                    </motion.p>
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeProfile;
