import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { icon: 24, text: "text-lg" },
  md: { icon: 32, text: "text-xl" },
  lg: { icon: 40, text: "text-2xl" },
};

export const Logo = ({ size = "md", showText = true, className = "" }: LogoProps) => {
  const { icon, text } = sizeMap[size];

  return (
    <motion.div
      className={`flex items-center gap-2 ${className}`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="relative flex items-center justify-center rounded-xl bg-primary/10 p-2"
        style={{ width: icon + 16, height: icon + 16 }}
      >
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* V shape with trust shield concept */}
          <motion.path
            d="M20 4L6 12V20C6 28.837 12.163 36.412 20 38C27.837 36.412 34 28.837 34 20V12L20 4Z"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M14 20L18 24L26 16"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          />
        </svg>
      </div>
      {showText && (
        <span className={`font-bold ${text} text-foreground`}>
          Vouch<span className="text-primary">Safe</span>
        </span>
      )}
    </motion.div>
  );
};
