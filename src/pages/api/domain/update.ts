import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { User } from '../me';
import { Domains, Status } from '@prisma/client';
import { updateDomain } from '../../../lib/cloudflare';

async function Route(req: NextApiRequest, res: NextApiResponse<User>) {
  const user = req.session.user as User;
  if (user) {
    const form = req.body as Pick<
      Domains,
      'name' | 'content' | 'type' | 'proxied' | 'id'
    >;
    const { id, ...others } = form;
    const { count } = await prisma.domains.updateMany({
      where: {
        id,
        user: user.sub,
        status: Status.ACTIVE
      },
      data: others
    });
    if (count !== 1) {
      res.json({
        success: false
      });
      return;
    }
    const cfResult = await updateDomain(id, others);
    res.json({ success: cfResult });
  } else {
    res.json({
      success: false
    });
  }
}

export default withIronSessionApiRoute(Route, sessionOptions);
