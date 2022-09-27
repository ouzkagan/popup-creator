import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

type Popup = {
  template_id: string;
  image: string;
  content: null | [];
};
interface defaultStateInterface {
  popups: Popup[];
}

export const initialState: defaultStateInterface = {
  popups: [],
};

export const popupTemplatesSlice = createSlice({
  name: 'popupTemplates',
  initialState,
  reducers: {
    set_popups: (
      state,
      { payload }: PayloadAction<defaultStateInterface['popups']>
    ) => {
      state.popups = payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // console.log('HYDRATE', action.payload);
      return {
        ...state,
        ...action.payload.popupTemplates,
      };
    },
  },
});

export const { set_popups } = popupTemplatesSlice.actions;

export default popupTemplatesSlice;
