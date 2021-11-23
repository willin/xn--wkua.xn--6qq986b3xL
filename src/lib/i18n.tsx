import { useRouter } from 'next/router';
import { createContext, useState, useRef, ReactNode, useEffect } from 'react';
import rosetta from 'rosetta';
import { messages, Languages } from '../../i18n';

interface iI18nContext {
  activeLocale: Languages;
  // eslint-disable-next-line no-unused-vars
  t: (key: string, ...args: any[]) => string;
  // eslint-disable-next-line no-unused-vars
  locale: (locale: Languages) => void;
}

const i18n = rosetta();
i18n.locale('en');
export const I18nContext = createContext<iI18nContext>({} as iI18nContext);

export default function I18n({ children }: { children: ReactNode }) {
  const { locale } = useRouter();
  const activeLocaleRef = useRef<Languages>('' as Languages);
  const [, setTick] = useState(0);

  const i18nWrapper = {
    activeLocale: activeLocaleRef.current,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    t: (key: string, ...args: any[]) => i18n.t(key, ...args),
    locale: (l: Languages) => {
      i18n.locale(l);

      i18n.set(l, messages[l]);
      // force rerender to update view
      setTick((tick) => tick + 1);
    }
  };

  // for initial SSR render
  useEffect(() => {
    if (locale !== activeLocaleRef.current) {
      i18nWrapper.locale(locale as Languages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return <I18nContext.Provider value={i18nWrapper}>{children}</I18nContext.Provider>;
}
