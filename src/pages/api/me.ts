import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/session';
import { NextApiRequest, NextApiResponse } from 'next';

export type User = {
  isLoggedIn: boolean;
  sub: string;
  username: string;
  nickname: string;
  name: string;
  picture: string;
  profile: string;
};

function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...(req.session.user as User),
      isLoggedIn: true
    });
  } else {
    res.json({
      isLoggedIn: false,
      username: ''
    } as User);
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
