import { motion } from "framer-motion";
import { CheckCircle, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustScoreRing } from "./TrustScoreRing";

interface EmployeeCardProps {
  id: string;
  name: string;
  designation: string;
  location: string;
  trustScore: number;
  skills: string[];
  isVerified?: boolean;
  avatarUrl?: string;
  delay?: number;
  onSendRequest?: (id: string) => void;
}

export const EmployeeCard = ({
  id,
  name,
  designation,
  location,
  trustScore,
  skills,
  isVerified = true,
  avatarUrl,
  delay = 0,
  onSendRequest,
}: EmployeeCardProps) => {
  return (
    <motion.div
      className="card-interactive p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-xl font-bold text-primary">
              {avatarUrl ? (
                <img src={avatarUrl} alt={name} className="h-full w-full rounded-full object-cover" />
              ) : (
                name.charAt(0).toUpperCase()
              )}
            </div>
            {isVerified && (
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-success flex items-center justify-center">
                <CheckCircle size={12} className="text-success-foreground" />
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{name}</h3>
              {isVerified && (
                <span className="text-xs text-primary font-medium">Verified</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{designation}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <MapPin size={12} />
              {location}
            </div>
          </div>
        </div>

        {/* Trust Score */}
        <div className="trust-glow rounded-full">
          <TrustScoreRing score={trustScore} size="sm" />
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.slice(0, 4).map((skill, index) => (
          <motion.span
            key={skill}
            className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground hover:bg-primary-soft hover:text-primary transition-colors cursor-default"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.1 * index }}
          >
            {skill}
          </motion.span>
        ))}
        {skills.length > 4 && (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
            +{skills.length - 4} more
          </span>
        )}
      </div>

      {/* Action */}
      <Button
        variant="soft"
        className="w-full"
        onClick={() => onSendRequest?.(id)}
      >
        <Star size={16} />
        Send Request
      </Button>
    </motion.div>
  );
};
