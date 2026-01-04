import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FloatingCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  delay?: number;
  className?: string;
}

export const FloatingCard = ({
  icon: Icon,
  value,
  label,
  delay = 0,
  className = "",
}: FloatingCardProps) => {
  return (
    <motion.div
      className={`glass-strong rounded-2xl p-4 shadow-lg ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Icon size={20} />
        </div>
        <div>
          <p className="text-lg font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </motion.div>
  );
};
