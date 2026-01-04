import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "teal" | "green" | "amber" | "purple";
  delay?: number;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  variant = "teal",
  delay = 0,
}: StatCardProps) => {
  const variantClasses = {
    teal: "stat-card-teal",
    green: "stat-card-green",
    amber: "stat-card-amber",
    purple: "stat-card-purple",
  };

  const iconBgClasses = {
    teal: "bg-primary-soft text-primary",
    green: "bg-success-soft text-success",
    amber: "bg-warning-soft text-warning",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <motion.div
      className={`stat-card ${variantClasses[variant]}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Background icon watermark */}
      <div className="absolute right-4 bottom-4 opacity-5">
        <Icon size={64} />
      </div>

      <div className="relative z-10">
        <div className={`inline-flex p-3 rounded-xl ${iconBgClasses[variant]} mb-4`}>
          <Icon size={20} />
        </div>
        <p className="text-sm text-muted-foreground font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </div>
    </motion.div>
  );
};
