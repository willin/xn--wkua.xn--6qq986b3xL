import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { User } from '../me';
import { Domains, Status } from '@prisma/client';
import { createDomain } from '../../../lib/cloudflare';

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
