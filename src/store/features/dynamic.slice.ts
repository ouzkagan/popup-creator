import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
export const initialState = {};
export const dynamicFormSlice = createSlice({
  name: 'dynamicForm',
  initialState,
  reducers: {
    UPDATE_FORM_STATE: (state, action) => {
      state[action.payload.form] = action.payload.state;
    },
  },
});

export const { UPDATE_FORM_STATE } = dynamicFormSlice.actions;

export const selectForm = (state: RootState, form) => {
  return (state && state.dynamicForm && state.dynamicForm[form]) || {};
};

// export const popupValues = (state) => {
//   return (state && state.dynamicForm && state.dynamicForm.popupValues?.values) || (state && state.dynamicForm && state.dynamicForm);
// };

export default dynamicFormSlice;
