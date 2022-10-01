import Popups from '@/components/Popups';
import * as ReactDOMServer from 'react-dom/server';
import { tailwindHtmlToInline } from './tailwindToInline';

// export const MyResponse = ReactDOMServer.renderToString(POPUP_010(formValues));
export const MyResponse = (template_id: string | string[] | undefined) =>
  tailwindHtmlToInline(
    ReactDOMServer.renderToString(
      Popups({ template_id, content: [], images: [] })
    )
  );
