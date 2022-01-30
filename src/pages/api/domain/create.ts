import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { User } from '../me';
import { Domains, Status } from '@prisma/client';
import { createDomain } from '../../../lib/cloudflare';
import { RestrictedNames } from '../../../config';

async function Route(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; id?: string }>
) {
  const user = req.session.user as User;
  if (user) {
    const form = req.body as Pick<
      Domains,
      'name' | 'content' | 'type' | 'proxied'
    >;
    if (RestrictedNames.has(form.name)) {
      res.json({
        success: false
      });
      return;
    }
    // 每人限制注册一个
    const domains = await prisma.domains.count({
      where: {
        user: user.sub,
        status: {
          in: [Status.ACTIVE, Status.PENDING]
        }
      }
    });
    if (domains >= 1) {
      res.json({
        success: false
      });
      return;
    }

    const count = await prisma.domains.count({
      where: {
        status: {
          in: [Status.ACTIVE, Status.PENDING, Status.BANNED]
        },
        OR: [
          {
            name: form.name
          },
          {
            punycode: form.name
          }
        ]
      }
    });
    if (count >= 1) {
      res.json({
        success: false
      });
      return;
    }

    const id = await createDomain(form);
    if (!id) {
      res.json({
        success: false
      });
      return;
    }
    const record = await prisma.domains.create({
      data: {
        ...form,
        id,
        user: user.sub,
        status: Status.ACTIVE
      } as Domains
    });
    res.json({ success: !!record.id, id });
  } else {
    res.json({
      success: false
    });
  }
}

export default withIronSessionApiRoute(Route, sessionOptions);
