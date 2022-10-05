// import { describe } from 'node:test';
import settingsSlice, {
  initialState as initialSettingsState,
  set_template,
} from 'src/store/features/settings.slice';

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
