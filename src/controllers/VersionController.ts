import { Request, Response } from 'express';

export default {
  async list(req: Request, res: Response) {
    return res.json({ teste: 123 });
  },
};
