import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  Briefcase,
  User,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Star,
  Award,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { TrustScoreRing } from "@/components/TrustScoreRing";
import { StatCard } from "@/components/StatCard";
import { LanguageToggle } from "@/components/LanguageToggle";
import { DeactivateModal } from "@/components/DeactivateModal";
import { SkeletonStat } from "@/components/SkeletonLoader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { employeeAPI, employerAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const getGreeting = (tSync: (key: string) => string) => {
  const hour = new Date().getHours();
  if (hour < 12) return tSync('Good Morning');
  if (hour < 18) return tSync('Good Afternoon');
  return tSync('Good Evening');
};

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { tSync } = useLanguage();
  const { user, logout, updateUser } = useAuth();
  const { toast } = useToast();

  const isEmployee = user?.role === "EMPLOYEE";

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = isEmployee 
        ? await employeeAPI.getDashboard()
        : await employerAPI.getDashboard();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
      // Use fallback data for demo
      setDashboardData(isEmployee ? {
        designation: user?.designation || 'Worker',
        jobsDone: 24,
        activeJobs: 3,
        trustScore: user?.trustScore || 78,
        vouches: 12,
        avgRating: 4.8,
      } : {
        totalJobs: 45,
        pendingRequests: 8,
        activeJobs: 5,
        completedJobs: 32,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeactivate = async () => {
    try {
      if (user?.isActive === false) {
        await employeeAPI.reactivate();
        updateUser({ ...user, isActive: true });
        toast({ title: 'Account reactivated!', description: 'Welcome back!' });
      } else {
        await employeeAPI.deactivate();
        updateUser({ ...user!, isActive: false });
        toast({ title: 'Account deactivated', description: 'Your trust score is preserved.' });
      }
    } catch (error) {
      console.error('Failed to update account status:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: Home, label: tSync('Dashboard'), path: "/dashboard" },
    { icon: Search, label: tSync('Search'), path: "/search" },
    { icon: Briefcase, label: tSync('Jobs'), path: "/jobs" },
    { icon: User, label: tSync('Profile'), path: "/profile" },
    { icon: Settings, label: tSync('Account Settings'), path: "/settings" },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "job_completed",
      title: "Electrical Wiring",
      employer: "Horizon Builders",
      time: "2 hours ago",
      points: 15,
    },
    {
      id: 2,
      type: "vouch_received",
      title: "New Vouch",
      employer: "TechSpace Co.",
      time: "1 day ago",
      points: 10,
    },
    {
      id: 3,
      type: "job_accepted",
      title: "Home Renovation",
      employer: "Green Living",
      time: "3 days ago",
      points: 0,
    },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-background-soft">
      <LanguageToggle />
      
      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen bg-card border-r border-border-soft flex flex-col transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border-soft">
          <Logo size={sidebarOpen ? "md" : "sm"} showText={sidebarOpen} />
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <item.icon size={20} />
                    {sidebarOpen && <span className="font-medium">{item.label}</span>}
                    {isActive && sidebarOpen && (
                      <motion.div
                        className="ml-auto h-2 w-2 rounded-full bg-primary-foreground"
                        layoutId="activeNav"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile Card */}
        <div className="p-4 border-t border-border-soft">
          <div
            className={`flex items-center gap-3 p-3 rounded-xl bg-secondary ${
              sidebarOpen ? "" : "justify-center"
            }`}
          >
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {user.name.charAt(0)}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user.role.toLowerCase()}
                </p>
              </div>
            )}
          </div>
          
          {sidebarOpen && isEmployee && (
            <Button
              variant="ghost"
              size="sm"
              className={`w-full mt-2 text-xs ${user.isActive === false ? 'text-success' : 'text-warning'}`}
              onClick={() => setShowDeactivateModal(true)}
            >
              {user.isActive === false ? tSync('Reactivate Account') : tSync('Deactivate Account')}
            </Button>
          )}
          
          <Button
            variant="ghost"
            className={`w-full mt-2 text-muted-foreground hover:text-destructive ${
              sidebarOpen ? "" : "px-0"
            }`}
            onClick={handleLogout}
          >
            <LogOut size={18} />
            {sidebarOpen && <span className="ml-2">{tSync('Logout')}</span>}
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border-soft px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:flex hidden"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
              <div>
                <p className="text-sm text-muted-foreground">
                  {getGreeting(tSync)}, {user.name} 👋
                </p>
                <h1 className="text-xl font-bold text-foreground">{tSync('Dashboard')}</h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search shortcut */}
              <Button variant="outline" className="hidden md:flex gap-2" onClick={() => navigate('/search')}>
                <Search size={16} />
                <span>{tSync('Search')}...</span>
                <kbd className="ml-2 px-2 py-0.5 text-xs bg-muted rounded">⌘K</kbd>
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
              </Button>

              {/* Trust Score Badge */}
              {isEmployee && dashboardData && (
                <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-primary-soft">
                  <TrustScoreRing score={dashboardData.trustScore || 0} size="sm" showLabel={false} />
                  <div>
                    <p className="text-xs text-muted-foreground">{tSync('Trust Score')}</p>
                    <p className="font-bold text-primary">{dashboardData.trustScore || 0}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {isLoading ? (
              <>
                <SkeletonStat />
                <SkeletonStat />
                <SkeletonStat />
                <SkeletonStat />
              </>
            ) : isEmployee ? (
              <>
                <StatCard
                  title={tSync('Designation')}
                  value={dashboardData?.designation || user.designation || '-'}
                  icon={Award}
                  variant="amber"
                  delay={0}
                />
                <StatCard
                  title={tSync('Jobs Completed')}
                  value={dashboardData?.jobsDone || 0}
                  icon={CheckCircle2}
                  variant="green"
                  delay={0.1}
                />
                <StatCard
                  title={tSync('Active Jobs')}
                  value={dashboardData?.activeJobs || 0}
                  icon={Clock}
                  variant="purple"
                  delay={0.2}
                />
                <StatCard
                  title={tSync('Trust Score')}
                  value={dashboardData?.trustScore || 0}
                  icon={TrendingUp}
                  variant="teal"
                  delay={0.3}
                />
              </>
            ) : (
              <>
                <StatCard
                  title={tSync('Total Jobs')}
                  value={dashboardData?.totalJobs || 0}
                  icon={Briefcase}
                  variant="teal"
                  delay={0}
                />
                <StatCard
                  title={tSync('Pending Requests')}
                  value={dashboardData?.pendingRequests || 0}
                  icon={Clock}
                  variant="amber"
                  delay={0.1}
                />
                <StatCard
                  title={tSync('Active Jobs')}
                  value={dashboardData?.activeJobs || 0}
                  icon={TrendingUp}
                  variant="purple"
                  delay={0.2}
                />
                <StatCard
                  title={tSync('Completed')}
                  value={dashboardData?.completedJobs || 0}
                  icon={CheckCircle2}
                  variant="green"
                  delay={0.3}
                />
              </>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trust Score Overview (Employee) */}
            {isEmployee && dashboardData && (
              <motion.div
                className="lg:col-span-1 card-elevated p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-lg font-semibold text-foreground mb-6">{tSync('Trust Overview')}</h2>
                <div className="flex flex-col items-center">
                  <div className="trust-glow rounded-full p-2">
                    <TrustScoreRing score={dashboardData.trustScore || 0} size="lg" />
                  </div>
                  <p className="mt-4 text-muted-foreground text-sm text-center">
                    Your trust score is{" "}
                    <span className="text-primary font-semibold">{tSync('above average')}</span>. Keep up the
                    great work!
                  </p>

                  {/* Quick stats */}
                  <div className="grid grid-cols-2 gap-4 w-full mt-6">
                    <div className="p-4 rounded-xl bg-secondary text-center">
                      <p className="text-2xl font-bold text-foreground">{dashboardData.vouches || 0}</p>
                      <p className="text-xs text-muted-foreground">{tSync('Vouches')}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary text-center">
                      <p className="text-2xl font-bold text-foreground">{dashboardData.avgRating || 0}</p>
                      <p className="text-xs text-muted-foreground">{tSync('Avg Rating')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Recent Activity */}
            <motion.div
              className={`${isEmployee ? "lg:col-span-2" : "lg:col-span-3"} card-elevated p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">{tSync('Recent Activity')}</h2>
                <Button variant="ghost" size="sm" className="text-primary">
                  {tSync('View All')}
                  <ChevronRight size={16} />
                </Button>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                        activity.type === "job_completed"
                          ? "bg-success-soft text-success"
                          : activity.type === "vouch_received"
                          ? "bg-gold-soft text-gold"
                          : "bg-primary-soft text-primary"
                      }`}
                    >
                      {activity.type === "job_completed" ? (
                        <CheckCircle2 size={20} />
                      ) : activity.type === "vouch_received" ? (
                        <Star size={20} />
                      ) : (
                        <Briefcase size={20} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.employer}</p>
                    </div>
                    <div className="text-right">
                      {activity.points > 0 && (
                        <p className="text-sm font-semibold text-success">+{activity.points} pts</p>
                      )}
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      <DeactivateModal
        isOpen={showDeactivateModal}
        onClose={() => setShowDeactivateModal(false)}
        onConfirm={handleDeactivate}
        isDeactivated={user.isActive === false}
      />
    </div>
  );
};

export default Dashboard;
