import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface DeactivateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeactivated: boolean;
}

export const DeactivateModal = ({ isOpen, onClose, onConfirm, isDeactivated }: DeactivateModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { tSync } = useLanguage();

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setIsLoading(false);
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
          />
          
          <motion.div
            className="relative bg-card rounded-3xl shadow-2xl p-8 max-w-md w-full border border-border-soft"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <X size={20} className="text-muted-foreground" />
            </button>

            <div className="text-center mb-6">
              <motion.div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  isDeactivated ? 'bg-success/10' : 'bg-destructive/10'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
              >
                {isDeactivated ? (
                  <Shield size={32} className="text-success" />
                ) : (
                  <AlertTriangle size={32} className="text-destructive" />
                )}
              </motion.div>

              <h3 className="text-2xl font-bold text-foreground mb-2">
                {isDeactivated ? tSync('Reactivate Account') : tSync('Deactivate Account')}
              </h3>
              <p className="text-muted-foreground">
                {isDeactivated 
                  ? 'Welcome back! Ready to resume your journey?'
                  : tSync('Are you sure you want to deactivate?')
                }
              </p>
            </div>

            {!isDeactivated && (
              <motion.div
                className="flex items-center gap-3 p-4 rounded-xl bg-warning-soft mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Shield size={20} className="text-warning flex-shrink-0" />
                <p className="text-sm text-warning-foreground">
                  {tSync('Your trust score will be preserved')}. You can reactivate anytime.
                </p>
              </motion.div>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="xl"
                className="flex-1"
                onClick={onClose}
              >
                {tSync('Cancel')}
              </Button>
              <Button
                variant={isDeactivated ? 'success' : 'destructive'}
                size="xl"
                className="flex-1"
                onClick={handleConfirm}
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    className="h-5 w-5 border-2 border-current/30 border-t-current rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : (
                  tSync('Confirm')
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
