// import { describe } from 'node:test';
import settingsSlice, {
  initialState as initialSettingsState,
  set_template,
} from 'src/store/features/settings.slice';

const formStatePayload = {
  dirty: false,
  dirtyFields: {},
  dirtyFieldsSinceLastSubmit: {
    logo: true,
    'content[0].value': true,
    'content[1].value': true,
    'content[2].value': true,
    'content[3].value': true,
    'content[4].value': true,
    'content[5].value': true,
    content: true,
    'images[0].value': true,
    images: true,
    'inputStatus.visitorDevice': true,
    'inputStatus.afterXSeconds': true,
    afterXSeconds: true,
    'inputStatus.afterScrollingXAmount': true,
    afterScrollingXAmount: true,
    'inputStatus.urlBrowsing': true,
    urlBrowsing: true,
    'inputStatus.browserLanguage': true,
    'inputStatus.exitIntentTargeting': true,
    webHookUrl: true,
    webHookTypes: true,
  },
  dirtySinceLastSubmit: false,
  errors: {
    browserLanguage:
      'browserLanguage must be a `string` type, but the final value was: `[\n  "\\"en-EN\\""\n]`.',
    urlBrowsing: 'Bu alan gerekli',
  },
  hasSubmitErrors: false,
  hasValidationErrors: true,
  initialValues: {
    template_id: 'POPUP_010',
    content: [
      {
        name: 'headline',
        type: 'text',
        value: 'Sign up',
        color: '#000000',
      },
      {
        name: 'description',
        type: 'text',
        value: 'Join the adventure',
        color: '#000000',
      },
      {
        name: 'input_1',
        type: 'text',
        value: 'Enter full name',
        color: '#000000',
      },
      {
        name: 'input_2',
        type: 'text',
        value: 'Enter you email',
        color: '#000000',
      },
      {
        name: 'button_text_1',
        type: 'text',
        value: 'Sign up',
        color: '#F37C34',
      },
      {
        name: 'privacy_text_1',
        type: 'text',
        value: 'By signing up, you agree to  Privacy Policy',
      },
    ],
    images: [
      {
        name: 'image_1',
        type: 'image',
        value: 'http://localhost:3000/assets/default-popup.jpg',
      },
    ],
    size: 'MEDIUM',
    position: 'CENTER_CENTER',
    color: '#F37C34',
    logo: '',
    visitorDevice: 'DESKTOP',
    afterXSeconds: '12',
    afterScrollingXAmount: '50',
    urlBrowsing: '',
    webHookUrl: '',
    webHookTypes: ['FORM'],
    browserLanguage: ['en-EN'],
    onExitIntent: true,
    inputStatus: {
      visitorDevice: true,
      afterXSeconds: true,
      afterScrollingXAmount: true,
      urlBrowsing: true,
      browserLanguage: true,
      onExitIntent: true,
      exitIntentTargeting: true,
    },
    settingsForm: undefined,
  },
  invalid: true,
  modified: {
    logo: false,
    'content[0].value': false,
    'content[1].value': false,
    'content[2].value': false,
    'content[3].value': false,
    'content[4].value': false,
    'content[5].value': false,
    content: false,
    'images[0].value': false,
    images: false,
    'inputStatus.visitorDevice': false,
    'inputStatus.afterXSeconds': false,
    afterXSeconds: false,
    'inputStatus.afterScrollingXAmount': false,
    afterScrollingXAmount: false,
    'inputStatus.urlBrowsing': false,
    urlBrowsing: false,
    'inputStatus.browserLanguage': false,
    'inputStatus.exitIntentTargeting': false,
    webHookUrl: false,
    webHookTypes: false,
  },
  modifiedSinceLastSubmit: false,
  pristine: true,
  submitting: false,
  submitFailed: false,
  submitSucceeded: false,
  touched: {
    logo: false,
    'content[0].value': false,
    'content[1].value': false,
    'content[2].value': false,
    'content[3].value': false,
    'content[4].value': false,
    'content[5].value': false,
    content: false,
    'images[0].value': false,
    images: false,
    'inputStatus.visitorDevice': false,
    'inputStatus.afterXSeconds': false,
    afterXSeconds: false,
    'inputStatus.afterScrollingXAmount': false,
    afterScrollingXAmount: false,
    'inputStatus.urlBrowsing': false,
    urlBrowsing: false,
    'inputStatus.browserLanguage': false,
    'inputStatus.exitIntentTargeting': false,
    webHookUrl: false,
    webHookTypes: false,
  },
  valid: false,
  validating: false,
  values: {
    template_id: 'POPUP_010',
    content: [
      {
        name: 'headline',
        type: 'text',
        value: 'Sign up',
        color: '#000000',
      },
      {
        name: 'description',
        type: 'text',
        value: 'Join the adventure',
        color: '#000000',
      },
      {
        name: 'input_1',
        type: 'text',
        value: 'Enter full name',
        color: '#000000',
      },
      {
        name: 'input_2',
        type: 'text',
        value: 'Enter you email',
        color: '#000000',
      },
      {
        name: 'button_text_1',
        type: 'text',
        value: 'Sign up',
        color: '#F37C34',
      },
      {
        name: 'privacy_text_1',
        type: 'text',
        value: 'By signing up, you agree to  Privacy Policy',
      },
    ],
    images: [
      {
        name: 'image_1',
        type: 'image',
        value: 'http://localhost:3000/assets/default-popup.jpg',
      },
    ],
    size: 'MEDIUM',
    position: 'CENTER_CENTER',
    color: '#F37C34',
    logo: '',
    visitorDevice: 'DESKTOP',
    afterXSeconds: '12',
    afterScrollingXAmount: '50',
    urlBrowsing: '',
    webHookUrl: '',
    webHookTypes: ['FORM'],
    browserLanguage: ['en-EN'],
    onExitIntent: true,
    inputStatus: {
      visitorDevice: true,
      afterXSeconds: true,
      afterScrollingXAmount: true,
      urlBrowsing: true,
      browserLanguage: true,
      onExitIntent: true,
      exitIntentTargeting: true,
    },
    settingsForm: undefined,
  },
  visited: {
    logo: false,
    'content[0].value': false,
    'content[1].value': false,
    'content[2].value': false,
    'content[3].value': false,
    'content[4].value': false,
    'content[5].value': false,
    content: false,
    'images[0].value': false,
    images: false,
    'inputStatus.visitorDevice': false,
    'inputStatus.afterXSeconds': false,
    afterXSeconds: false,
    'inputStatus.afterScrollingXAmount': false,
    afterScrollingXAmount: false,
    'inputStatus.urlBrowsing': false,
    urlBrowsing: false,
    'inputStatus.browserLanguage': false,
    'inputStatus.exitIntentTargeting': false,
    webHookUrl: false,
    webHookTypes: false,
  },
};
describe('settings reducer', () => {
  test('Empty action', () => {
    const { reducer } = settingsSlice;
    const action = { type: '' };
    const state = reducer(initialSettingsState, action);
    // const initialSettingsState
    expect(state).toEqual({ ...initialSettingsState });
    // console.log(state);
  });
  test('Setting a new template', () => {
    const { reducer } = settingsSlice;
    const action = set_template('POPUP_135');
    const state = reducer(initialSettingsState, action);
    // const initialSettingsState
    expect(state).toEqual({
      ...initialSettingsState,
      template_id: 'POPUP_135',
    });
  });
  // test('Updating form', () => {
  //   const { reducer } = settingsSlice;
  //   const action = UPDATE_FORM_STATE(formStatePayload);
  //   const state = reducer(
  //     { ...initialSettingsState, settingsForm: undefined },
  //     action
  //   );
  //   // const initialSettingsState
  //   expect(state).toEqual({
  //     ...formStatePayload,
  //   });
  // });
  // test.todo('setting a template');
});

export {}; // 👈️ if you don't have anything else to export
