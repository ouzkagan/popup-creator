import type { RootState } from '@/store/index';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

/*
template_id: int? | string?
// Appearance
size: small | medium | large,
position: CENTER_CENTER,
colors: #000000 | ... [option to pick custom?]
logo: image_url,

// Targeting Rules
visitorDevice: {
  desktop: true,
  mobile: false
}
// visitorBehaviour
afterXSeconds: null,
afterScrollingXAmount: null,
urlBrowsing: { 
  include: ['google.com'],
  exclude: ['mywebsite.com'],
  targetAll: false //true first
}
browserLanguage: ['en-US', 'tr-TR']
onExitIntent: {onExitIntentDegree: NONE|MEDIUM, overrideConditions:true}
*/

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

export type PopupSizes = 'small' | 'medium' | 'large';
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
export type VisitorDeviceType = {
  desktop: boolean;
  mobile: boolean;
};
export type UrlSourceType = {
  include: string[];
  exclude: string[];
  targetAll: boolean;
};

interface defaultStateInterface {
  template_id: string;
  // appearance
  size: PopupSizes;
  position: PopupPositions;
  color: Color;
  logo: null | string;
  // Targeting Rules
  visitorDevices: VisitorDeviceType;
  afterXSeconds: null | string;
  afterScrollingXAmount: null | string;
  urlBrowsing: UrlSourceType;
  browserLanguage: string[];
  onExitIntent: boolean;
}

export const initialState: defaultStateInterface = {
  template_id: 't1',
  // appearance
  size: 'medium',
  position: 'CENTER_CENTER',
  color: '#F37C34',
  logo: null,
  // Targeting Rules
  visitorDevices: {
    desktop: true,
    mobile: false,
  },
  afterXSeconds: null,
  afterScrollingXAmount: null,
  urlBrowsing: {
    include: [],
    exclude: [],
    targetAll: true,
  },
  browserLanguage: ['en-EN'],
  onExitIntent: true,
};
export const defaultFormSlice = createSlice({
  name: 'defaultForm',
  initialState,
  reducers: {
    UPDATE_FORM_STATE: (state, action) => {
      state[action?.payload?.form] = action.payload.state;
    },
    set_template: (
      state,
      { payload }: PayloadAction<defaultStateInterface['template_id']>
    ) => {
      state.template_id = payload;
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.state,
        // state[action?.payload?.form]:{...action.payload.state},
      };
    },
  },
});

export const { UPDATE_FORM_STATE, set_template } = defaultFormSlice.actions;

export const selectForm = (state: RootState, form: string) => {
  return (state && state.defaultForm && state.defaultForm?.[form]) || {};
};

export const popupValues = (state: RootState) => {
  return (
    (state && state.defaultForm && state.defaultForm.popupValues?.values) ||
    (state && state.defaultForm && state.defaultForm)
  );
};

export default defaultFormSlice;
