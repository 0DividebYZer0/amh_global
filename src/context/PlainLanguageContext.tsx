import React, { createContext, useContext, useState, useEffect } from 'react';

// Dictionary of technical agricultural jargon to simplified plain language
export const JARGON_DICTIONARY: Record<
  string,
  {
    technical: string;
    plain: string;
    explanation: string;
  }
> = {
  offtake: {
    technical: 'Guaranteed Off-take',
    plain: 'Guaranteed Purchase (We Guarantee to Buy Your Crop)',
    explanation: 'A binding contract where AMH commits to buying everything you harvest at fixed cash rates.'
  },
  outgrower: {
    technical: 'Outgrower Farmer',
    plain: 'Partner Farmer / Local Grower',
    explanation: 'Independent local farmers who grow crops with AMH seeds and sell their harvests directly to our depot.'
  },
  outgrower_network: {
    technical: 'Outgrower Network',
    plain: 'Local Partner Farmer Network',
    explanation: 'Our community of contracted smallholder farmers across Barkly West and surrounding areas.'
  },
  agroprocessing: {
    technical: 'Agro-Processing',
    plain: 'Crop Cleaning, Pressing & Packing',
    explanation: 'Taking raw harvested leaves and seeds from the field and processing them into pure oil, powder, and feed.'
  },
  coldpressed: {
    technical: 'Cold-Pressed Virgin Oil',
    plain: 'Pure Oil Squeezed Without Heat',
    explanation: 'Seeds are crushed gently below 40°C so all the vitamins, antioxidants, and nutrients stay fresh and natural.'
  },
  moisture_content: {
    technical: 'Moisture < 7.0%',
    plain: 'Dryness: Nicely Dried Seeds (< 7% Water)',
    explanation: 'Seeds must be dry like dry soup beans before delivery so they do not rot or mold in storage bags.'
  },
  sansor_germination: {
    technical: 'SANSOR Certified Germination (88%+)',
    plain: 'Tested High-Sprouting Seeds (88+ of 100 Seeds Will Grow)',
    explanation: 'Officially tested seeds guaranteed to sprout strongly in healthy soil.'
  },
  dewinged: {
    technical: 'De-winged Seeds',
    plain: 'Cleaned Seeds (Thin White Wings Removed)',
    explanation: 'Moringa seeds have paper-thin white wings that are gently rubbed off before processing or pressing.'
  },
  iks: {
    technical: 'Indigenous Knowledge Systems (IKS)',
    plain: 'Traditional Plant Wisdom & Natural Heritage',
    explanation: 'Generational African knowledge of medicinal plants, natural water cleaning, and healthy food.'
  },
  flocculation: {
    technical: 'Flocculation / Water Clarification',
    plain: 'Natural River Water Cleaning (Mud Settling)',
    explanation: 'Crushed moringa seeds bind to dirt particles in cloudy river water, pulling them to the bottom so water turns clear.'
  },
  chaff: {
    technical: 'Dried Leaf Chaff & Press Cake',
    plain: 'Crushed Leaf & Seed Feed for Animals (Cattle & Goats)',
    explanation: 'High-protein leftover leaves and pressed seed cake used to feed livestock.'
  },
  coa: {
    technical: 'Certificate of Analysis (COA)',
    plain: 'Official Laboratory Quality Test Certificate',
    explanation: 'A document signed by scientists proving the oil is pure, clean, and free of dirt or chemicals.'
  },
  oleic_acid: {
    technical: 'Oleic Acid (72.4%)',
    plain: 'Healthy Omega-9 Oil (72.4%)',
    explanation: 'A natural heart-healthy and skin-smoothing oil component that makes moringa oil silky and long-lasting.'
  },
  peroxide_value: {
    technical: 'Peroxide Value (< 1.2 meq/kg)',
    plain: 'Freshness Check (Not Spoiled or Rancid)',
    explanation: 'A laboratory measurement proving the oil is freshly pressed and has not gone bad.'
  },
  hdpe_drums: {
    technical: '25L UN Food-Grade HDPE Drums',
    plain: '25-Litre Heavy-Duty Safe Plastic Storage Drums',
    explanation: 'Tough, certified blue plastic drums that protect food and cosmetic oils from sunlight and spills.'
  },
  nitrogen_purged: {
    technical: 'Nitrogen-Purged Airtight Seal',
    plain: 'Airtight Freshness Seal (Oxygen Removed)',
    explanation: 'Air is replaced with natural nitrogen before sealing so the oil never goes stale during shipping.'
  },
  rfq: {
    technical: 'Request for Quotation (RFQ)',
    plain: 'Ask for Price & Bulk Delivery Quote',
    explanation: 'A quick request sent to our sales desk to get an exact cost breakdown for large volumes.'
  },
  pic_nagoya: {
    technical: 'Prior Informed Consent (PIC) & Nagoya Protocol',
    plain: 'Community Permission & Fair Royalty Promise',
    explanation: 'An international agreement ensuring tribal elders approve traditional wisdom sharing and rural communities receive money from commercial sales.'
  },
  cultivar_pkm1: {
    technical: 'Cultivar (PKM-1 Variety)',
    plain: 'High-Yield Plant Variety (Fast-Growing PKM-1 Moringa)',
    explanation: 'A specially bred moringa plant that grows fast, flowers quickly, and yields heavy pods with high seed counts.'
  },
  phytosanitary: {
    technical: 'Phytosanitary Certification',
    plain: 'Official Clean Plant Health Permit',
    explanation: 'Government agricultural certificate confirming seeds and leaves are 100% free of plant diseases and pests.'
  },
  eft_direct: {
    technical: 'Direct Bank EFT',
    plain: 'Direct Money Deposit into Your Bank Account',
    explanation: 'Safe digital payment straight to your bank within 24 hours of weighing your harvest.'
  }
};

interface PlainLanguageContextType {
  isPlainLanguage: boolean;
  togglePlainLanguage: () => void;
  setPlainLanguage: (enabled: boolean) => void;
  term: (key: keyof typeof JARGON_DICTIONARY) => string;
  getExplanation: (key: keyof typeof JARGON_DICTIONARY) => string;
  simplify: (technicalText: string, plainText: string) => string;
}

const PlainLanguageContext = createContext<PlainLanguageContextType | undefined>(undefined);

export const PlainLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial preference from localStorage or default to false
  const [isPlainLanguage, setIsPlainLanguage] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('amh_plain_language');
      return saved !== null ? JSON.parse(saved) : true; // Default to true for better accessibility
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('amh_plain_language', JSON.stringify(isPlainLanguage));
    } catch {
      // Ignore localStorage errors
    }
  }, [isPlainLanguage]);

  const togglePlainLanguage = () => {
    setIsPlainLanguage((prev) => !prev);
  };

  const setPlainLanguage = (enabled: boolean) => {
    setIsPlainLanguage(enabled);
  };

  const term = (key: keyof typeof JARGON_DICTIONARY): string => {
    const item = JARGON_DICTIONARY[key];
    if (!item) return key;
    return isPlainLanguage ? item.plain : item.technical;
  };

  const getExplanation = (key: keyof typeof JARGON_DICTIONARY): string => {
    const item = JARGON_DICTIONARY[key];
    return item ? item.explanation : '';
  };

  const simplify = (technicalText: string, plainText: string): string => {
    return isPlainLanguage ? plainText : technicalText;
  };

  return (
    <PlainLanguageContext.Provider
      value={{
        isPlainLanguage,
        togglePlainLanguage,
        setPlainLanguage,
        term,
        getExplanation,
        simplify
      }}
    >
      {children}
    </PlainLanguageContext.Provider>
  );
};

const defaultContext: PlainLanguageContextType = {
  isPlainLanguage: true,
  togglePlainLanguage: () => {},
  setPlainLanguage: () => {},
  term: (key: keyof typeof JARGON_DICTIONARY) => JARGON_DICTIONARY[key]?.plain || key,
  getExplanation: (key: keyof typeof JARGON_DICTIONARY) => JARGON_DICTIONARY[key]?.explanation || '',
  simplify: (_technical: string, plain: string) => plain
};

export const usePlainLanguage = () => {
  const context = useContext(PlainLanguageContext);
  if (!context) {
    return defaultContext;
  }
  return context;
};
