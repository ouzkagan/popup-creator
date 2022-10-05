import type { RootState } from '@/store/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

export type PopupSizes = 'SMALL' | 'MEDIUM' | 'LARGE';
export type PopupPositions =
  | 'TOP_CENTER'
  | 'TOP_RIGHT'
  | 'TOP_LEFT'
  | 'CENTER_LEFT'
  | 'CENTER_CENTER'
  | 'CENTER_RIGHT'
  | 'BOTTOM_CENTER'
  | 'BOTTOM_RIGHT'
  | 'BOTTOM_LEFT';
export type DeviceType = 'DESKTOP' | 'MOBILE';
export type VisitorDeviceType = {
  desktop: boolean;
  mobile: boolean;
};
export type UrlSourceType = {
  domain: null | string;
  targetAll: boolean;
};

export type WebHookType = 'FORM' | 'CLICK';
export interface Content {
  name: string;
  type: string;
  value: string;
  color?: string;
}

export interface ContentImage {
  name: string;
  type: string;
  value: string;
}
export interface inputStatusInterface {
  // Targeting Rules
  visitorDevice: boolean;
  afterXSeconds: boolean;
  afterScrollingXAmount: boolean;
  urlBrowsing: boolean;
  browserLanguage: boolean;
  onExitIntent: boolean;
  exitIntentTargeting: boolean;
}

export interface formStateInterface {
  template_id: string;
  // appearance
  size: PopupSizes;
  position: PopupPositions;
  color?: Color;
  logo: null | string;
  // Targeting Rules
  visitorDevice: DeviceType;
  afterXSeconds: null | string;
  afterScrollingXAmount: null | string;
  urlBrowsing: null | string;
  browserLanguage: string[];
  onExitIntent: boolean;
  webHookUrl: string;
  // content: Content[];
  // images: Image[];
  // isFormSubmission: boolean;
  // isClickData: boolean;
  webHookTypes: WebHookType[];
  content?: Content[];
  images?: ContentImage[];
  inputStatus: inputStatusInterface;
  settingsForm?: unknown;
}

export const initialState: formStateInterface = {
  template_id: 'POPUP_010',
  // appearance
  size: 'MEDIUM',
  position: 'CENTER_CENTER',
  color: '#F37C34',
  logo: '',
  // Targeting Rules
  visitorDevice: 'DESKTOP',
  afterXSeconds: '12',
  afterScrollingXAmount: '50',
  urlBrowsing: '',
  webHookUrl: '',
  webHookTypes: ['FORM'],
  // content: [],
  // images: [],
  browserLanguage: ['en-EN'],
  onExitIntent: true,
  // content: [],
  // images: [],
  inputStatus: {
    // Targeting Rules
    visitorDevice: true,
    afterXSeconds: true,
    afterScrollingXAmount: true,
    urlBrowsing: true,
    browserLanguage: true,
    onExitIntent: true,
    exitIntentTargeting: true,
  },
  settingsForm: {},
};

// This action is what we will call using the dispatch in order to trigger the API call.
// export const getPopupTemplates = createAsyncThunk(
//   'settings/popups',
//   async () => {
//     const res = await fetch('https://localhost:3000/api/popups');
//     const popupTemplates = await res.json();

//     return popupTemplates;
//   }
// );

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    UPDATE_FORM_STATE: (state, action) => {
      // const formName: string = action?.payload?.form;
      // console.log(action.payload.state);
      state.settingsForm = action.payload.state;
    },

    set_template: (
      state,
      { payload }: PayloadAction<formStateInterface['template_id']>
    ) => {
      state.template_id = payload;
    },
    set_initial: (state, { payload }: PayloadAction<formStateInterface>) => {
      state = payload;
    },
    [HYDRATE]: (state, action) => {
      state = {
        ...state,
        ...action.payload,
      };
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getPopupTemplates.pending, (state) => {
  //       state.pending = true;
  //     })
  //     .addCase(getPopupTemplates.fulfilled, (state, { payload }) => {
  //       // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
  //       state.pending = false;
  //       state.popups = payload;
  //       console.log('redux: ', state.popups);
  //     })
  //     .addCase(getPopupTemplates.rejected, (state) => {
  //       state.pending = false;
  //       state.error = true;
  //     });
  // },
});

export const { UPDATE_FORM_STATE, set_template } = settingsSlice.actions;

export const selectForm = (state: RootState, form: string) => {
  // console.log(state.settings);
  return (
    (state &&
      state.settings &&
      state.settings[form as keyof typeof state.settings]) ||
    undefined
  );
};

// export const popupValues = (state: RootState) => {
//   return (
//     (state && state.settings && state.settings.popupValues?.values) ||
//     (state && state.settings && state.settings)
//   );
// };

export default settingsSlice;
