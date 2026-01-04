import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = '' }: SkeletonProps) => (
  <div className={`skeleton ${className}`} />
);

export const SkeletonCard = () => (
  <motion.div
    className="card-elevated p-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="flex items-center gap-4 mb-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
    <Skeleton className="h-3 w-full mb-2" />
    <Skeleton className="h-3 w-3/4 mb-4" />
    <div className="flex gap-2">
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  </motion.div>
);

export const SkeletonStat = () => (
  <motion.div
    className="stat-card"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <Skeleton className="h-4 w-24 mb-3" />
    <Skeleton className="h-8 w-16" />
  </motion.div>
);

export const SkeletonProfile = () => (
  <motion.div
    className="card-elevated p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="flex flex-col md:flex-row items-start gap-8">
      <Skeleton className="h-32 w-32 rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-5 w-32 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-6" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-20 rounded-xl" />
        </div>
      </div>
    </div>
  </motion.div>
);
