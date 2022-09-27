import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import defaultForm from './features/default.slice';
import dynamicForm from './features/dynamic.slice';
import popupTemplates from './features/popupTemplates.slice';
const rootReducer = combineReducers({
  // user: userReducer,
  [defaultForm.name]: defaultForm.reducer,
  [dynamicForm.name]: dynamicForm.reducer,
  [popupTemplates.name]: popupTemplates.reducer,
});

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export default makeStore;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
