import { render } from 'react-dom';
import { formStateInterface } from '../src/store/features/settings.slice';
//ignore
import POPUP_001 from '../src/components/Popups/POPUP_001';
const initialSettings: formStateInterface = {
  template_id: 'POPUP_001',

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
    exitIntentTargeting: false,
  },
};
describe('popupSelector test', () => {
  it('Can pick a render a popup', () => {
    const root = document.createElement('div');

    render(POPUP_001({ popupData: initialSettings }), root);
  });
});
