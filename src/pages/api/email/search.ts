import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '../../../lib/session';
import { prisma } from '../../../lib/prisma';
import { RestrictedNames } from '../../../config';
import { Status } from '@prisma/client';

async function Route(
  req: NextApiRequest,
  res: NextApiResponse<{ valid: boolean }>
) {
  if (req.session.user) {
    const name = decodeURIComponent((req.query.name as string) || '');
    if (RestrictedNames.has(name)) {
      res.json({
        valid: false
      });
      return;
    }
    const count = await prisma.emails.count({
      where: {
        status: {
          in: [Status.ACTIVE, Status.PENDING, Status.BANNED]
        },
        OR: [
          {
            name: name
          },
          {
            punycode: name
          }
        ]
      }
    });
    res.json({
      valid: count === 0
    });
  } else {
    res.json({
      valid: false
    });
  }
}

export default withIronSessionApiRoute(Route, sessionOptions);
