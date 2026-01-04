import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center gap-1 p-1 rounded-xl bg-card/95 backdrop-blur-xl border border-border-soft shadow-lg">
        <Globe size={16} className="ml-2 text-muted-foreground" />
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            language === 'en'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('ml')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            language === 'ml'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          മല
        </button>
      </div>
    </motion.div>
  );
};
