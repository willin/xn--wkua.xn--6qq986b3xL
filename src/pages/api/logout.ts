import { withIronSessionApiRoute } from 'iron-session/next';
import { createLogoutApi } from '@authing/nextjs';
import { appDomain, logoutRedirectUri } from '../../config';
import { sessionOptions } from '../../lib/session';

export default withIronSessionApiRoute(
  createLogoutApi({
    appDomain,
    redirectUri: logoutRedirectUri
  }),
  sessionOptions
);
