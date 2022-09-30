import type { NextApiRequest, NextApiResponse } from 'next';
// import POPUP_010 from '@/components/Popups';
import { MyResponse } from '@/utils/componentConverter';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Get data from your database
  const { id } = _req.query;
  // console.log(id);
  res.status(200).json({ template: MyResponse(id) });
}
