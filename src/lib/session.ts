// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from 'iron-session';
import type { User } from '../pages/api/me';
import { sessionSecret, isProduction } from '../config';

export const sessionOptions: IronSessionOptions = {
  password: sessionSecret,
  cookieName: 'authing',
  cookieOptions: {
    secure: isProduction
  }
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  // eslint-disable-next-line no-unused-vars
  interface IronSessionData {
    user?: User;
  }
}
