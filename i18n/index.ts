import zh from './zh';
import en from './en';

export const messages = {
  zh,
  en
};

export const Locales = [
  ['zh', '中文', 'zh-CN'],
  ['en', 'English', 'en-US', 'default']
];

export type Languages = keyof typeof messages;
