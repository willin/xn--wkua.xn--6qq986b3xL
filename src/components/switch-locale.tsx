import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'classnames';
import useI18n from '../hooks/use-i18n';
import { Locales } from '../../i18n';

export default function SwitchLocale() {
  const { activeLocale } = useI18n();
  const { asPath } = useRouter();

  return (
    <nav>
      {Locales.map(([locale, label] = ['', '']) => (
        <Link key={locale} href={asPath} locale={locale}>
          <a
            className={clsx(
              'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all',
              locale === activeLocale
                ? 'font-semibold text-gray-800 dark:text-gray-200'
                : 'font-normal text-gray-600 dark:text-gray-400'
            )}>
            {label}
          </a>
        </Link>
      ))}
    </nav>
  );
}
