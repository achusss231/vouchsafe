import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  tSync: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Auth
  'Login': { en: 'Login', ml: 'പ്രവേശിക്കുക' },
  'Register': { en: 'Register', ml: 'രജിസ്റ്റർ ചെയ്യുക' },
  'Sign In': { en: 'Sign In', ml: 'സൈൻ ഇൻ' },
  'Sign Out': { en: 'Sign Out', ml: 'സൈൻ ഔട്ട്' },
  'Email': { en: 'Email', ml: 'ഇമെയിൽ' },
  'Password': { en: 'Password', ml: 'പാസ്‌വേഡ്' },
  'Full Name': { en: 'Full Name', ml: 'മുഴുവൻ പേര്' },
  'Remember me': { en: 'Remember me', ml: 'എന്നെ ഓർക്കുക' },
  'Forgot password?': { en: 'Forgot password?', ml: 'പാസ്‌വേഡ് മറന്നോ?' },
  'Create Account': { en: 'Create Account', ml: 'അക്കൗണ്ട് സൃഷ്ടിക്കുക' },
  'Continue': { en: 'Continue', ml: 'തുടരുക' },
  'Back': { en: 'Back', ml: 'പിന്നിലേക്ക്' },
  
  // Welcome messages
  'Welcome Back to Trusted Work': { en: 'Welcome Back to Trusted Work', ml: 'വിശ്വസനീയ ജോലിയിലേക്ക് സ്വാഗതം' },
  'Verified people. Verified opportunities.': { en: 'Verified people. Verified opportunities.', ml: 'സ്ഥിരീകരിച്ച ആളുകൾ. സ്ഥിരീകരിച്ച അവസരങ്ങൾ.' },
  'Create Your Account': { en: 'Create Your Account', ml: 'നിങ്ങളുടെ അക്കൗണ്ട് സൃഷ്ടിക്കുക' },
  'Complete Your Profile': { en: 'Complete Your Profile', ml: 'നിങ്ങളുടെ പ്രൊഫൈൽ പൂർത്തിയാക്കുക' },
  'Join the trusted employment network.': { en: 'Join the trusted employment network.', ml: 'വിശ്വസനീയ തൊഴിൽ ശൃംഖലയിൽ ചേരുക.' },
  'Tell us a bit more about yourself.': { en: 'Tell us a bit more about yourself.', ml: 'നിങ്ങളെക്കുറിച്ച് കുറച്ചുകൂടി പറയൂ.' },
  
  // Roles
  'I am a...': { en: 'I am a...', ml: 'ഞാൻ ഒരു...' },
  'Employee': { en: 'Employee', ml: 'ജീവനക്കാരൻ' },
  'Employer': { en: 'Employer', ml: 'തൊഴിലുടമ' },
  'Looking for work': { en: 'Looking for work', ml: 'ജോലി തേടുന്നു' },
  'Hiring trusted workers': { en: 'Hiring trusted workers', ml: 'വിശ്വസ്ത തൊഴിലാളികളെ നിയമിക്കുന്നു' },
  'Designation': { en: 'Designation', ml: 'പദവി' },
  
  // Dashboard
  'Dashboard': { en: 'Dashboard', ml: 'ഡാഷ്ബോർഡ്' },
  'Good Morning': { en: 'Good Morning', ml: 'സുപ്രഭാതം' },
  'Good Afternoon': { en: 'Good Afternoon', ml: 'ശുഭ ഉച്ചതിരിഞ്ഞ്' },
  'Good Evening': { en: 'Good Evening', ml: 'ശുഭ സന്ധ്യ' },
  'Trust Score': { en: 'Trust Score', ml: 'വിശ്വാസ സ്കോർ' },
  'Jobs Completed': { en: 'Jobs Completed', ml: 'പൂർത്തിയാക്കിയ ജോലികൾ' },
  'Active Jobs': { en: 'Active Jobs', ml: 'സജീവ ജോലികൾ' },
  'Total Jobs': { en: 'Total Jobs', ml: 'മൊത്തം ജോലികൾ' },
  'Pending Requests': { en: 'Pending Requests', ml: 'തീർപ്പാക്കാത്ത അഭ്യർത്ഥനകൾ' },
  'Completed': { en: 'Completed', ml: 'പൂർത്തിയായി' },
  'Recent Activity': { en: 'Recent Activity', ml: 'സമീപകാല പ്രവർത്തനം' },
  'View All': { en: 'View All', ml: 'എല്ലാം കാണുക' },
  'Trust Overview': { en: 'Trust Overview', ml: 'വിശ്വാസ അവലോകനം' },
  'Vouches': { en: 'Vouches', ml: 'വൗച്ചുകൾ' },
  'Avg Rating': { en: 'Avg Rating', ml: 'ശരാശരി റേറ്റിംഗ്' },
  'above average': { en: 'above average', ml: 'ശരാശരിയിൽ കൂടുതൽ' },
  
  // Search
  'Search': { en: 'Search', ml: 'തിരയുക' },
  'Search Employees': { en: 'Search Employees', ml: 'ജീവനക്കാരെ തിരയുക' },
  'Find Trusted Workers': { en: 'Find Trusted Workers', ml: 'വിശ്വസ്ത തൊഴിലാളികളെ കണ്ടെത്തുക' },
  'Search by name, skill, or designation...': { en: 'Search by name, skill, or designation...', ml: 'പേര്, നൈപുണ്യം, അല്ലെങ്കിൽ പദവി പ്രകാരം തിരയുക...' },
  'Filters': { en: 'Filters', ml: 'ഫിൽട്ടറുകൾ' },
  'Minimum Trust Score': { en: 'Minimum Trust Score', ml: 'കുറഞ്ഞ വിശ്വാസ സ്കോർ' },
  'Sort By': { en: 'Sort By', ml: 'ക്രമീകരിക്കുക' },
  'Name': { en: 'Name', ml: 'പേര്' },
  'Clear': { en: 'Clear', ml: 'മായ്ക്കുക' },
  'verified workers': { en: 'verified workers', ml: 'സ്ഥിരീകരിച്ച തൊഴിലാളികൾ' },
  'Showing': { en: 'Showing', ml: 'കാണിക്കുന്നു' },
  'Send Request': { en: 'Send Request', ml: 'അഭ്യർത്ഥന അയയ്ക്കുക' },
  'No workers found': { en: 'No workers found', ml: 'തൊഴിലാളികളെ കണ്ടെത്തിയില്ല' },
  'Try adjusting your search or filter criteria': { en: 'Try adjusting your search or filter criteria to find the right worker for your needs.', ml: 'നിങ്ങളുടെ ആവശ്യങ്ങൾക്ക് അനുയോജ്യമായ തൊഴിലാളിയെ കണ്ടെത്താൻ നിങ്ങളുടെ തിരയൽ അല്ലെങ്കിൽ ഫിൽട്ടർ മാനദണ്ഡം ക്രമീകരിക്കാൻ ശ്രമിക്കുക.' },
  
  // Profile
  'Profile': { en: 'Profile', ml: 'പ്രൊഫൈൽ' },
  'Employee Profile': { en: 'Employee Profile', ml: 'ജീവനക്കാരൻ പ്രൊഫൈൽ' },
  'Skills': { en: 'Skills', ml: 'നൈപുണ്യങ്ങൾ' },
  'Badges': { en: 'Badges', ml: 'ബാഡ്ജുകൾ' },
  'Vouches & Reviews': { en: 'Vouches & Reviews', ml: 'വൗച്ചുകളും അവലോകനങ്ങളും' },
  'Jobs Done': { en: 'Jobs Done', ml: 'ചെയ്ത ജോലികൾ' },
  'Send Job Request': { en: 'Send Job Request', ml: 'ജോലി അഭ്യർത്ഥന അയയ്ക്കുക' },
  'Message': { en: 'Message', ml: 'സന്ദേശം' },
  'Member since': { en: 'Member since', ml: 'അംഗമായത് മുതൽ' },
  'Top Trusted': { en: 'Top Trusted', ml: 'ഏറ്റവും വിശ്വസ്തൻ' },
  'Fast Responder': { en: 'Fast Responder', ml: 'വേഗത്തിലുള്ള പ്രതികരണം' },
  'Community Favorite': { en: 'Community Favorite', ml: 'കമ്മ്യൂണിറ്റി ഇഷ്ടം' },
  'Verified': { en: 'Verified', ml: 'സ്ഥിരീകരിച്ചു' },
  
  // Jobs
  'Jobs': { en: 'Jobs', ml: 'ജോലികൾ' },
  'Logout': { en: 'Logout', ml: 'ലോഗൗട്ട്' },
  'Home': { en: 'Home', ml: 'ഹോം' },
  
  // Navigation
  'Features': { en: 'Features', ml: 'സവിശേഷതകൾ' },
  'How It Works': { en: 'How It Works', ml: 'ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു' },
  'Testimonials': { en: 'Testimonials', ml: 'സാക്ഷ്യപത്രങ്ങൾ' },
  'Get Started': { en: 'Get Started', ml: 'ആരംഭിക്കുക' },
  
  // Stats
  'Verified Workers': { en: 'Verified Workers', ml: 'സ്ഥിരീകരിച്ച തൊഴിലാളികൾ' },
  'Jobs Completed Stats': { en: 'Jobs Completed', ml: 'പൂർത്തിയാക്കിയ ജോലികൾ' },
  'Satisfaction Rate': { en: 'Satisfaction Rate', ml: 'സംതൃപ്തി നിരക്ക്' },
  'Cities Covered': { en: 'Cities Covered', ml: 'ഉൾപ്പെടുത്തിയ നഗരങ്ങൾ' },
  
  // Hero
  'Trust-Driven Employment': { en: 'Trust-Driven Employment', ml: 'വിശ്വാസ-അധിഷ്ഠിത തൊഴിൽ' },
  'Hire with Confidence': { en: 'Hire with Confidence', ml: 'ആത്മവിശ്വാസത്തോടെ നിയമിക്കുക' },
  'Work with Trust': { en: 'Work with Trust', ml: 'വിശ്വാസത്തോടെ പ്രവർത്തിക്കുക' },
  'Start Building Trust': { en: 'Start Building Trust', ml: 'വിശ്വാസം കെട്ടിപ്പടുക്കാൻ തുടങ്ങുക' },
  'Find Workers': { en: 'Find Workers', ml: 'തൊഴിലാളികളെ കണ്ടെത്തുക' },
  
  // Features
  'Why Choose VouchSafe?': { en: 'Why Choose VouchSafe?', ml: 'VouchSafe എന്തിന് തിരഞ്ഞെടുക്കണം?' },
  'Verified Trust Scores': { en: 'Verified Trust Scores', ml: 'സ്ഥിരീകരിച്ച വിശ്വാസ സ്കോറുകൾ' },
  'Direct Connections': { en: 'Direct Connections', ml: 'നേരിട്ടുള്ള ബന്ധങ്ങൾ' },
  'Transparent Vouching': { en: 'Transparent Vouching', ml: 'സുതാര്യമായ വൗച്ചിംഗ്' },
  'Growing Reputation': { en: 'Growing Reputation', ml: 'വളരുന്ന പ്രശസ്തി' },
  
  // How it works
  'Create Account Steps': { en: 'Create Account', ml: 'അക്കൗണ്ട് സൃഷ്ടിക്കുക' },
  'Connect & Work': { en: 'Connect & Work', ml: 'ബന്ധപ്പെടുക & പ്രവർത്തിക്കുക' },
  'Vouch & Grow': { en: 'Vouch & Grow', ml: 'വൗച്ച് ചെയ്ത് വളരുക' },
  
  // CTA
  'Ready to Build Trust?': { en: 'Ready to Build Trust?', ml: 'വിശ്വാസം കെട്ടിപ്പടുക്കാൻ തയ്യാറാണോ?' },
  'Get Started Free': { en: 'Get Started Free', ml: 'സൗജന്യമായി ആരംഭിക്കുക' },
  'Browse Workers': { en: 'Browse Workers', ml: 'തൊഴിലാളികളെ ബ്രൗസ് ചെയ്യുക' },
  
  // Account
  'Deactivate Account': { en: 'Deactivate Account', ml: 'അക്കൗണ്ട് നിർജ്ജീവമാക്കുക' },
  'Reactivate Account': { en: 'Reactivate Account', ml: 'അക്കൗണ്ട് പുനരാരംഭിക്കുക' },
  'Account Settings': { en: 'Account Settings', ml: 'അക്കൗണ്ട് ക്രമീകരണങ്ങൾ' },
  'Your trust score will be preserved': { en: 'Your trust score will be preserved', ml: 'നിങ്ങളുടെ വിശ്വാസ സ്കോർ സംരക്ഷിക്കപ്പെടും' },
  'Are you sure you want to deactivate?': { en: 'Are you sure you want to deactivate your account?', ml: 'നിങ്ങളുടെ അക്കൗണ്ട് നിർജ്ജീവമാക്കണമെന്ന് ഉറപ്പാണോ?' },
  'Cancel': { en: 'Cancel', ml: 'റദ്ദാക്കുക' },
  'Confirm': { en: 'Confirm', ml: 'സ്ഥിരീകരിക്കുക' },
  
  // Toasts
  'Welcome back!': { en: 'Welcome back!', ml: 'തിരികെ സ്വാഗതം!' },
  'You have successfully logged in.': { en: "You've successfully logged in.", ml: 'നിങ്ങൾ വിജയകരമായി ലോഗിൻ ചെയ്തു.' },
  'Account created!': { en: 'Account created!', ml: 'അക്കൗണ്ട് സൃഷ്ടിച്ചു!' },
  'Welcome to VouchSafe': { en: 'Welcome to VouchSafe. Start building your trust score.', ml: 'VouchSafe-ലേക്ക് സ്വാഗതം. നിങ്ങളുടെ വിശ്വാസ സ്കോർ നിർമ്മിക്കാൻ ആരംഭിക്കുക.' },
  'Request Sent!': { en: 'Request Sent!', ml: 'അഭ്യർത്ഥന അയച്ചു!' },
  'Login failed': { en: 'Login failed', ml: 'ലോഗിൻ പരാജയപ്പെട്ടു' },
  'Registration failed': { en: 'Registration failed', ml: 'രജിസ്ട്രേഷൻ പരാജയപ്പെട്ടു' },
  
  // Misc
  "Don't have an account?": { en: "Don't have an account?", ml: 'അക്കൗണ്ട് ഇല്ലേ?' },
  'Create one': { en: 'Create one', ml: 'ഒന്ന് സൃഷ്ടിക്കുക' },
  'Already have an account?': { en: 'Already have an account?', ml: 'ഇതിനകം ഒരു അക്കൗണ്ട് ഉണ്ടോ?' },
  'Sign in': { en: 'Sign in', ml: 'സൈൻ ഇൻ ചെയ്യുക' },
  'Trust explanation': { en: 'Your Trust Score grows through verified work and vouches from employers. Start building trust today!', ml: 'നിങ്ങളുടെ വിശ്വാസ സ്കോർ സ്ഥിരീകരിച്ച ജോലികളിലൂടെയും തൊഴിലുടമകളുടെ വൗച്ചുകളിലൂടെയും വളരുന്നു. ഇന്ന് വിശ്വാസം കെട്ടിപ്പടുക്കാൻ ആരംഭിക്കുക!' },
  'Privacy': { en: 'Privacy', ml: 'സ്വകാര്യത' },
  'Terms': { en: 'Terms', ml: 'നിബന്ധനകൾ' },
  'Contact': { en: 'Contact', ml: 'ബന്ധപ്പെടുക' },
  'All rights reserved': { en: 'All rights reserved. Built with trust.', ml: 'എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം. വിശ്വാസത്തോടെ നിർമ്മിച്ചത്.' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored as Language) || 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const tSync = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    return translation[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, tSync }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
