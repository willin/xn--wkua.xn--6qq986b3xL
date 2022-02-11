import { createLoginApi } from '@authing/nextjs';
import { appDomain, ssoDomain, clientId, redirectUri } from '../../config';

export default createLoginApi({
  appDomain,
  ssoDomain,
  clientId,
  redirectUri,
  scope: 'openid roles username phone profile'
});
