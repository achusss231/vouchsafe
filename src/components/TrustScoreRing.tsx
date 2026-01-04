import { motion } from "framer-motion";

interface TrustScoreRingProps {
  score: number;
  maxScore?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { container: 60, stroke: 4, text: "text-sm" },
  md: { container: 80, stroke: 6, text: "text-lg" },
  lg: { container: 120, stroke: 8, text: "text-2xl" },
};

export const TrustScoreRing = ({
  score,
  maxScore = 100,
  size = "md",
  showLabel = true,
  className = "",
}: TrustScoreRingProps) => {
  const { container, stroke, text } = sizeMap[size];
  const radius = (container - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min((score / maxScore) * 100, 100);
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={container}
        height={container}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={container / 2}
          cy={container / 2}
          r={radius}
          stroke="hsl(var(--border))"
          strokeWidth={stroke}
          fill="none"
        />
        {/* Animated progress circle */}
        <motion.circle
          cx={container / 2}
          cy={container / 2}
          r={radius}
          stroke="hsl(var(--primary))"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          className="drop-shadow-sm"
          style={{
            filter: "drop-shadow(0 0 8px hsl(var(--primary-glow) / 0.4))",
          }}
        />
      </svg>
      {showLabel && (
        <motion.div
          className={`absolute inset-0 flex flex-col items-center justify-center ${text} font-bold text-foreground`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <span>{score}</span>
          {size !== "sm" && (
            <span className="text-[10px] text-muted-foreground font-medium">
              TRUST
            </span>
          )}
        </motion.div>
      )}
    </div>
  );
};
