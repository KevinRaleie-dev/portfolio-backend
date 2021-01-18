import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (_, res: express.Response) => {
  try {
    const posts = await prisma.post.findMany();

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.post('/create-post', async (req: express.Request, res: express.Response) => {
  try {
    const post = await prisma.post.create({
      data: {
          ...req.body
      },
    });

    return res.status(200).json({
        success: true,
        post
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
