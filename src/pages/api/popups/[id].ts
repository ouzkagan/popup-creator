import type { NextApiRequest, NextApiResponse } from 'next';
// import POPUP_010 from '@/components/Popups';
import { MyResponse } from '@/utils/componentConverter';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Get data from your database
  res.status(200).json({ template: MyResponse });
}
