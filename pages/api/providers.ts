import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = fs.readFileSync('providers.json', 'utf8');
  const providers = JSON.parse(data).providers;
  res.status(200).json({ providers });
}
