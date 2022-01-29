import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { User } from '../me';
import { Emails, Status } from '@prisma/client';

async function Route(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean }>
) {
  const user = req.session.user as User;
  if (user) {
    const form = req.body as Pick<Emails, 'id'>;
    const { id } = form;

    const { count } = await prisma.emails.updateMany({
      where: {
        id,
        user: user.sub
      },
      data: {
        status: Status.DELETED
      }
    });
    console.log(id);
    console.log(user.sub);
    console.log(count);
    res.json({ success: count === 1 });
  } else {
    res.json({
      success: false
    });
  }
}

export default withIronSessionApiRoute(Route, sessionOptions);
