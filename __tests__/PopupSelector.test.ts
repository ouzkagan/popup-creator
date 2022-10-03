import { formStateInterface } from '@/store/features/settings.slice';
import { render } from 'react-dom';
//ignore
import POPUP_001 from 'src/components/Popups/POPUP_001';
describe('popupSelector test', () => {
  test('Can pick a popup component', () => {
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
    const root = document.createElement('div');

    render(POPUP_001({ popupData: initialSettings }), root);
  });
});
