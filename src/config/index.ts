export const clientId =
  process.env.AUTHING_CLIENT_ID || '61dcec7e3f318cc9804acdf5';

export const clientSecret =
  process.env.AUTHING_CLIENT_SECRET || '45f302c105deae5d285e8f426bdc51c1';

export const appDomain =
  process.env.AUTHING_CLIENT_DOMAIN || 'https://remix.authing.cn';

export const ssoDomain =
  process.env.AUTHING_SSO_DOMAIN || 'https://remix-sso.authing.cn';

export const redirectUri =
  process.env.AUTHING_REDIRECT_URI || 'http://localhost:3000/api/callback';

export const logoutRedirectUri =
  process.env.AUTHING_LOGOUT_REDIRECT_URI || 'http://localhost:3000/';

export const sessionSecret =
  process.env.SECRET_COOKIE_PASSWORD || 'authing-nextjs-example-long-password';

export const isProduction = process.env.NODE_ENV === 'production';

export const CfAPIToken = process.env.HANHAN_CF_API_TOKEN || '';

export const CfZoneId = process.env.HANHAN_CF_ZONE_ID || '';

// TODO: Keep updating
export const RestrictedNames = new Set([
  // in Chinese
  '管理',
  '广告',
  // in English
  'about',
  'ad',
  'ads',
  'admin',
  'admins',
  'api',
  'app',
  'blog',
  'bbs',
  'cdn',
  'ddns',
  'dev',
  'developer',
  'dns',
  'doc',
  'docs',
  'document',
  'documentation',
  'domain',
  'donate',
  'edu',
  'free',
  'ftp',
  'fund',
  'git',
  'gov',
  'm',
  'mil',
  'mobile',
  'my',
  'net',
  'ns',
  'ns1',
  'ns2',
  'news',
  'now',
  'online',
  'org',
  'open',
  'pop3',
  'pub',
  'rss',
  'shop',
  'site',
  'smtp',
  'store',
  'sub',
  'subscribe',
  'support',
  'sync',
  'system',
  'tag',
  'team',
  'tech',
  'test',
  'tip',
  'tool',
  'url',
  'user',
  'vpn',
  'vps',
  'w',
  'wap',
  'web',
  'ww'
]);
