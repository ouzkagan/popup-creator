import { PopupTemplate } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface defaultStateInterface {
  popups: PopupTemplate[];
}

export const initialState: defaultStateInterface = {
  popups: [],
};

// Hydration with next-redux-wrapper
export const popupTemplatesSlice = createSlice({
  name: 'popupTemplates',
  initialState,
  reducers: {
    setPopups: (
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

export const { setPopups } = popupTemplatesSlice.actions;

export default popupTemplatesSlice;
