import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search as SearchIcon,
  SlidersHorizontal,
  MapPin,
  ChevronDown,
  Home,
  Briefcase,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { EmployeeCard } from "@/components/EmployeeCard";
import { useToast } from "@/hooks/use-toast";

// Mock employee data
const mockEmployees = [
  {
    id: "1",
    name: "Arjun Kumar",
    designation: "Electrician",
    location: "Mumbai, India",
    trustScore: 92,
    skills: ["Wiring", "Maintenance", "Installation", "Solar Panels"],
    isVerified: true,
  },
  {
    id: "2",
    name: "Priya Sharma",
    designation: "Plumber",
    location: "Delhi, India",
    trustScore: 88,
    skills: ["Pipe Fitting", "Repairs", "Water Heaters", "Drainage"],
    isVerified: true,
  },
  {
    id: "3",
    name: "Rahul Patel",
    designation: "Carpenter",
    location: "Bangalore, India",
    trustScore: 76,
    skills: ["Furniture", "Woodwork", "Cabinet Making", "Repairs"],
    isVerified: true,
  },
  {
    id: "4",
    name: "Sneha Reddy",
    designation: "Painter",
    location: "Hyderabad, India",
    trustScore: 84,
    skills: ["Interior", "Exterior", "Texture", "Wallpaper"],
    isVerified: false,
  },
  {
    id: "5",
    name: "Vikram Singh",
    designation: "Driver",
    location: "Chennai, India",
    trustScore: 95,
    skills: ["Personal", "Commercial", "Long Distance", "Delivery"],
    isVerified: true,
  },
  {
    id: "6",
    name: "Anita Nair",
    designation: "Cook",
    location: "Pune, India",
    trustScore: 89,
    skills: ["Indian Cuisine", "Continental", "Catering", "Baking"],
    isVerified: true,
  },
];

const SearchEmployees = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [trustFilter, setTrustFilter] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"trust" | "experience">("trust");
  const { toast } = useToast();

  const filteredEmployees = mockEmployees
    .filter(
      (emp) =>
        (emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))) &&
        emp.trustScore >= trustFilter
    )
    .sort((a, b) =>
      sortBy === "trust" ? b.trustScore - a.trustScore : a.name.localeCompare(b.name)
    );

  const handleSendRequest = (id: string) => {
    const employee = mockEmployees.find((e) => e.id === id);
    toast({
      title: "Request Sent!",
      description: `Your job request has been sent to ${employee?.name}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background-soft">
      {/* Simple Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/dashboard"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Home size={18} />
                Dashboard
              </Link>
              <Link
                to="/search"
                className="text-primary font-medium flex items-center gap-2"
              >
                <SearchIcon size={18} />
                Search
              </Link>
              <Link
                to="/jobs"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Briefcase size={18} />
                Jobs
              </Link>
              <Link
                to="/profile"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <User size={18} />
                Profile
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Search Section */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Find Trusted <span className="text-primary">Workers</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Search from thousands of verified professionals with proven trust scores
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, skill, or designation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-14 pr-32 text-lg rounded-2xl shadow-lg border-0 focus-visible:ring-primary/30"
            />
            <Button
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={20} />
              Filters
            </Button>
          </div>

          {/* Filters Panel */}
          <motion.div
            initial={false}
            animate={{ height: showFilters ? "auto" : 0, opacity: showFilters ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-6 rounded-2xl bg-card border border-border-soft">
              <div className="flex flex-wrap items-center gap-6">
                {/* Trust Score Filter */}
                <div className="flex-1 min-w-[200px]">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Minimum Trust Score: {trustFilter}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={trustFilter}
                    onChange={(e) => setTrustFilter(Number(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Sort Toggle */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Sort By
                  </label>
                  <div className="flex rounded-xl bg-secondary p-1">
                    <button
                      onClick={() => setSortBy("trust")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        sortBy === "trust"
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground"
                      }`}
                    >
                      Trust Score
                    </button>
                    <button
                      onClick={() => setSortBy("experience")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        sortBy === "experience"
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground"
                      }`}
                    >
                      Name
                    </button>
                  </div>
                </div>

                {/* Clear Filters */}
                {(trustFilter > 0 || searchQuery) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setTrustFilter(0);
                      setSearchQuery("");
                    }}
                    className="text-destructive"
                  >
                    <X size={16} />
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-muted-foreground">
            Showing{" "}
            <motion.span
              key={filteredEmployees.length}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-semibold text-foreground"
            >
              {filteredEmployees.length}
            </motion.span>{" "}
            verified workers
          </p>
        </motion.div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee, index) => (
            <EmployeeCard
              key={employee.id}
              {...employee}
              delay={0.1 * index}
              onSendRequest={handleSendRequest}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredEmployees.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-6">
              <SearchIcon className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No workers found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Try adjusting your search or filter criteria to find the right worker for your needs.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default SearchEmployees;
