import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode, CurrencyConfig } from '../types';

export interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  currencyConfig: CurrencyConfig;
  allCurrencies: Record<CurrencyCode, CurrencyConfig>;
  convertFromZar: (amountInZar: number, targetCurrency?: CurrencyCode) => number;
  convertToZar: (amount: number, sourceCurrency?: CurrencyCode) => number;
  formatPrice: (amountInZar: number, targetCurrency?: CurrencyCode) => string;
  formatAmount: (amount: number, currencyCode?: CurrencyCode) => string;
  getSecondaryPriceText: (amountInZar: number) => string;
  detectedRegionInfo: string;
  isAutoDetected: boolean;
  refreshLocation: () => void;
}

export const CURRENCY_CONFIGS: Record<CurrencyCode, CurrencyConfig> = {
  ZAR: {
    code: 'ZAR',
    symbol: 'R',
    name: 'South African Rand',
    flag: '🇿🇦',
    region: 'South Africa & SADC Hub',
    rateAgainstZar: 1.0 // 1 ZAR = 1 ZAR
  },
  GHS: {
    code: 'GHS',
    symbol: 'GH₵',
    name: 'Ghanaian Cedi',
    flag: '🇬🇭',
    region: 'Ghana & West Africa Hub',
    rateAgainstZar: 0.80 // 1 ZAR = 0.80 GHS (1 GHS ≈ 1.25 ZAR)
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar (AfCFTA & Global)',
    flag: '🌐',
    region: 'Pan-African & Global Trade',
    rateAgainstZar: 0.05479 // 1 ZAR ≈ 0.0548 USD (1 USD ≈ 18.25 ZAR)
  }
};

const STORAGE_KEY = 'amh_preferred_currency';

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>('ZAR');
  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(true);
  const [detectedRegionInfo, setDetectedRegionInfo] = useState<string>('Detecting regional currency...');

  // Set currency and persist user preference
  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    setIsAutoDetected(false);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      // Ignore storage errors
    }
  };

  // Heuristic timezone detection
  const detectFromTimezone = (): { currency: CurrencyCode; label: string } => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const tzLower = tz.toLowerCase();

      // Ghana & West Africa (ECOWAS)
      if (
        tzLower.includes('accra') ||
        tzLower.includes('abidjan') ||
        tzLower.includes('monrovia') ||
        tzLower.includes('freetown') ||
        tzLower.includes('dakar') ||
        tzLower.includes('bamako') ||
        tzLower.includes('lomé') ||
        tzLower.includes('ouagadougou')
      ) {
        return { currency: 'GHS', label: `Timezone: West Africa Hub (${tz})` };
      }

      // South Africa & Southern Africa (SADC)
      if (
        tzLower.includes('johannesburg') ||
        tzLower.includes('harare') ||
        tzLower.includes('gaborone') ||
        tzLower.includes('windhoek') ||
        tzLower.includes('maseru') ||
        tzLower.includes('mbabane') ||
        tzLower.includes('maputo') ||
        tzLower.includes('lusaka')
      ) {
        return { currency: 'ZAR', label: `Timezone: Southern Africa HQ (${tz})` };
      }

      // Other African states or international
      return { currency: 'USD', label: `Timezone: Pan-African / Global Trade (${tz})` };
    } catch {
      return { currency: 'ZAR', label: 'Default: South Africa HQ' };
    }
  };

  const detectLocation = async () => {
    const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
    if (saved && (saved === 'ZAR' || saved === 'GHS' || saved === 'USD')) {
      setCurrencyState(saved);
      setIsAutoDetected(false);
      setDetectedRegionInfo(`User selected: ${CURRENCY_CONFIGS[saved].name}`);
      return;
    }

    // Step 1: Initial quick guess via browser timezone
    const tzGuess = detectFromTimezone();
    setCurrencyState(tzGuess.currency);
    setDetectedRegionInfo(`Auto-detected via ${tzGuess.label}`);

    // Step 2: Try fast IP Geolocation API (non-blocking, fallback gracefully)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2600);

      // Free, CORS-friendly IP geolocation API
      const res = await fetch('https://ipapi.co/json/', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const countryCode = (data.country_code || '').toUpperCase();
        const countryName = data.country_name || countryCode;

        // If user hasn't manually selected while request was resolving
        if (!localStorage.getItem(STORAGE_KEY)) {
          if (countryCode === 'GH') {
            setCurrencyState('GHS');
            setDetectedRegionInfo(`IP Located in Ghana (${countryName}) · West Africa Hub`);
          } else if (['ZA', 'NA', 'BW', 'LS', 'SZ', 'ZW', 'MZ'].includes(countryCode)) {
            setCurrencyState('ZAR');
            setDetectedRegionInfo(`IP Located in Southern Africa (${countryName}) · HQ Corridor`);
          } else {
            setCurrencyState('USD');
            setDetectedRegionInfo(`IP Located in ${countryName} · AfCFTA Cross-Border Trade`);
          }
        }
      }
    } catch {
      // Fallback remains the timezone detection which is already set
    }
  };

  useEffect(() => {
    detectLocation();
  }, []);

  const convertFromZar = (amountInZar: number, targetCurrency: CurrencyCode = currency): number => {
    const rate = CURRENCY_CONFIGS[targetCurrency]?.rateAgainstZar ?? 1.0;
    return amountInZar * rate;
  };

  const convertToZar = (amount: number, sourceCurrency: CurrencyCode = currency): number => {
    const rate = CURRENCY_CONFIGS[sourceCurrency]?.rateAgainstZar ?? 1.0;
    if (rate === 0) return amount;
    return amount / rate;
  };

  const formatAmount = (amount: number, currencyCode: CurrencyCode = currency): string => {
    const config = CURRENCY_CONFIGS[currencyCode] || CURRENCY_CONFIGS.ZAR;
    if (currencyCode === 'USD') {
      return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (currencyCode === 'GHS') {
      return `GH₵ ${amount.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPrice = (amountInZar: number, targetCurrency: CurrencyCode = currency): string => {
    const converted = convertFromZar(amountInZar, targetCurrency);
    return formatAmount(converted, targetCurrency);
  };

  const getSecondaryPriceText = (amountInZar: number): string => {
    if (currency === 'GHS') {
      const zarVal = `R ${amountInZar.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      const usdVal = `$${(amountInZar * CURRENCY_CONFIGS.USD.rateAgainstZar).toFixed(2)}`;
      return `(Base: ${zarVal} · ≈ ${usdVal} USD)`;
    }
    if (currency === 'USD') {
      const zarVal = `R ${amountInZar.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      const ghsVal = `GH₵ ${(amountInZar * CURRENCY_CONFIGS.GHS.rateAgainstZar).toFixed(2)}`;
      return `(Base: ${zarVal} · ≈ ${ghsVal} GHS)`;
    }
    // Default is ZAR
    const ghsVal = `GH₵ ${(amountInZar * CURRENCY_CONFIGS.GHS.rateAgainstZar).toFixed(2)}`;
    const usdVal = `$${(amountInZar * CURRENCY_CONFIGS.USD.rateAgainstZar).toFixed(2)}`;
    return `(≈ ${ghsVal} GHS · ≈ ${usdVal} USD)`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currencyConfig: CURRENCY_CONFIGS[currency],
        allCurrencies: CURRENCY_CONFIGS,
        convertFromZar,
        convertToZar,
        formatPrice,
        formatAmount,
        getSecondaryPriceText,
        detectedRegionInfo,
        isAutoDetected,
        refreshLocation: detectLocation
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
