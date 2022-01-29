import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { User } from '../me';
import { Emails, Status } from '@prisma/client';
import { RestrictedNames } from '../../../config';

async function Route(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; id?: string }>
) {
  const user = req.session.user as User;
  if (user) {
    const form = req.body as Pick<Emails, 'name' | 'content'>;
    if (RestrictedNames.has(form.name)) {
      res.json({
        success: false
      });
      return;
    }
    // 每人限制注册 2 个
    const emails = await prisma.emails.count({
      where: {
        user: user.sub,
        status: {
          in: [Status.ACTIVE, Status.PENDING]
        }
      }
    });
    if (emails >= 2) {
      res.json({
        success: false
      });
      return;
    }

    const record = await prisma.emails.create({
      data: {
        ...form,
        user: user.sub,
        status: Status.PENDING
      } as Emails
    });
    res.json({ success: !!record.id });
  } else {
    res.json({
      success: false
    });
  }
}

export default withIronSessionApiRoute(Route, sessionOptions);
