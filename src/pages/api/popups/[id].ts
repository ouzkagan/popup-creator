import type { NextApiRequest, NextApiResponse } from 'next';
// import POPUP_010 from '@/components/Popups';
import { popupTemplates } from '@/mock';
import type { PopupTemplate } from '@/types';
import { MyResponse } from '@/utils/componentConverter';
import Cors from 'cors';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
});

// export default function handler(_req: NextApiRequest, res: NextApiResponse) {
//   // Get data from your database
//   const { id } = _req.query;
//   // console.log(id);
//   // res.status(200).json({ template: MyResponse(id) });
//   res.status(200).json(MyResponse(id));
// }

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const popups: PopupTemplate[] = [...popupTemplates];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  // Rest of the API logic
  // res.json({ message: 'Hello Everyone!' })
  const { id } = req.query;
  let pid: string;
  if (typeof id === 'string') {
    pid = id;
  } else {
    pid = 'POPUP_010';
  }

  const settings = popups.find((popup) => popup.template_id == id)?.settings;

  // console.log(id);
  res.status(200).json({ template: MyResponse(pid), settings: settings });
  // res.status(200).json(MyResponse(id));
}
