import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const user = await prisma.user.create({
      data: {
        ...req.body,
      },
    });

    req.session.user = String(user.id);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
