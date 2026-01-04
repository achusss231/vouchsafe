import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface VouchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => Promise<void>;
  employeeName: string;
}

export const VouchModal = ({ isOpen, onClose, onSubmit, employeeName }: VouchModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { tSync } = useLanguage();

  const trustPointsPreview = rating * 3;

  const handleSubmit = async () => {
    if (rating === 0) return;
    setIsSubmitting(true);
    try {
      await onSubmit(rating, comment);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setRating(0);
        setComment('');
      }, 2000);
    } catch (error) {
      console.error('Vouch failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          <motion.div
            className="relative bg-card rounded-3xl shadow-2xl p-8 max-w-md w-full border border-border-soft"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            {isSuccess ? (
              <motion.div
                className="text-center py-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  <CheckCircle size={40} className="text-success" />
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {tSync('Vouch Submitted!')}
                </h3>
                <p className="text-muted-foreground">
                  +{trustPointsPreview} Trust Points added
                </p>
              </motion.div>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
                >
                  <X size={20} className="text-muted-foreground" />
                </button>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Vouch for {employeeName}
                  </h3>
                  <p className="text-muted-foreground">
                    Share your experience working with them
                  </p>
                </div>

                {/* Star Rating */}
                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1"
                    >
                      <Star
                        size={36}
                        className={`transition-colors ${
                          star <= (hoveredRating || rating)
                            ? 'text-gold fill-gold'
                            : 'text-border'
                        }`}
                        style={{
                          filter: star <= (hoveredRating || rating)
                            ? 'drop-shadow(0 0 8px hsl(45 93% 47% / 0.5))'
                            : 'none',
                        }}
                      />
                    </motion.button>
                  ))}
                </div>

                {/* Trust Impact Preview */}
                {rating > 0 && (
                  <motion.div
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-success-soft mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <TrendingUp size={18} className="text-success" />
                    <span className="text-success font-semibold">
                      +{trustPointsPreview} Trust Points
                    </span>
                  </motion.div>
                )}

                {/* Comment */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Comment (optional)
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience..."
                    maxLength={500}
                    className="w-full h-24 px-4 py-3 rounded-xl bg-secondary border-0 resize-none focus:ring-2 focus:ring-primary/30 outline-none text-foreground placeholder:text-muted-foreground"
                  />
                  <p className="text-xs text-muted-foreground text-right mt-1">
                    {comment.length}/500
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  variant="glow"
                  size="xl"
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={rating === 0 || isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    'Submit Vouch'
                  )}
                </Button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
