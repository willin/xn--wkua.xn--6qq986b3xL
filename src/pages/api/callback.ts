import { createCallbackApi } from '@authing/nextjs';
import { appDomain, clientId, clientSecret } from '../../config';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/session';

export default withIronSessionApiRoute(
  createCallbackApi({
    appDomain,
    clientId,
    clientSecret,
    // 登录失败返回登录页
    failureRedirect: '/',
    // 跳转到 /user 接口去记录数据库用户
    successRedirect: '/dashboard'
  }),
  sessionOptions
);
