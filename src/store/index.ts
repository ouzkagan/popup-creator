import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import popupTemplates from './features/popupTemplates.slice';
import settingsSLice from './features/settings.slice';
const rootReducer = combineReducers({
  // user: userReducer,
  [settingsSLice.name]: settingsSLice.reducer,
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
