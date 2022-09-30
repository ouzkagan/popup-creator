import Popups from '@/components/Popups';
import * as ReactDOMServer from 'react-dom/server';
import { tailwindHtmlToInline } from './tailwindToInline';
const formValues = {
  template_id: 'POPUP_010',
  content: [
    { name: 'headline', type: 'text', value: 'Sign up', color: '#000000' },
    {
      name: 'description',
      type: 'text',
      value: 'Join the adventure',
      color: '#000000',
    },
    {
      name: 'input_placeholder_1',
      type: 'text',
      value: 'Enter full name',
      color: '#000000',
    },
    { name: 'button_text_1', type: 'text', value: 'Signup', color: '#F37C34' },
    {
      name: 'privacy_text_1',
      type: 'text',
      value: 'By signing up, you agree to Privacy Policy',
    },
  ],
  images: [
    { name: 'image_1', type: 'image', value: '/assets/default-popup.jpg' },
  ],
  size: 'MEDIUM',
  position: 'CENTER_CENTER',
  color: '#F37C34',
  logo: '',
  visitorDevices: ['DESKTOP'],
  afterXSeconds: '12',
  afterScrollingXAmount: '50',
  urlBrowsing: { domain: '', targetAll: true },
  webHookUrl: '',
  webHookTypes: [],
  browserLanguage: ['en-EN'],
  onExitIntent: true,
  inputStatus: {
    visitorDevices: true,
    afterXSeconds: true,
    afterScrollingXAmount: true,
    urlBrowsing: true,
    browserLanguage: true,
    onExitIntent: true,
  },
};
// export const MyResponse = ReactDOMServer.renderToString(POPUP_010(formValues));
export const MyResponse = (template_id: string | string[] | undefined) =>
  tailwindHtmlToInline(
    ReactDOMServer.renderToString(Popups({ ...formValues, template_id }))
  );
