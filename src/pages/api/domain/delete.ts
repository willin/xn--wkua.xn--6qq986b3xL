import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { User } from '../me';
import { Domains, Status } from '@prisma/client';
import { deleteDomain } from '../../../lib/cloudflare';

async function Route(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean }>
) {
  const user = req.session.user as User;
  if (user) {
    const form = req.body as Pick<Domains, 'id'>;
    const { id } = form;

    const { count } = await prisma.domains.updateMany({
      where: {
        id,
        user: user.sub
      },
      data: {
        status: Status.DELETED
      }
    });

    if (count !== 1) {
      res.json({
        success: false
      });
      return;
    }
    await deleteDomain(id);
    res.json({ success: true });
  } else {
    res.json({
      success: false
    });
  }
}

export default withIronSessionApiRoute(Route, sessionOptions);
