import PopupSelector from '@/components/Popups';
import * as ReactDOMServer from 'react-dom/server';
import { tailwindHtmlToInline } from './tailwindToInline';

// export const MyResponse = ReactDOMServer.renderToString(POPUP_010(formValues));
export const MyResponse = (template_id: string) =>
  tailwindHtmlToInline(
    ReactDOMServer.renderToString(
      PopupSelector({
        template_id,
        content: [],
        images: [],
        size: 'SMALL',
        position: 'TOP_CENTER',
        logo: '',
        visitorDevice: 'DESKTOP',
        afterXSeconds: '',
        afterScrollingXAmount: '',
        urlBrowsing: '',
        browserLanguage: [],
        onExitIntent: false,
        webHookUrl: '',
        webHookTypes: [],
        inputStatus: {
          visitorDevice: false,
          afterXSeconds: false,
          afterScrollingXAmount: false,
          urlBrowsing: false,
          browserLanguage: false,
          onExitIntent: false,
        },
      })
    )
  );
