// import { describe } from 'node:test';
import { popupTemplates } from 'src/mock';
import popupTemplatesSlice, {
  initialState,
  setPopups,
} from 'src/store/features/popupTemplates.slice';

describe('popupTemplates reducer', () => {
  test('Empty action', () => {
    const { reducer } = popupTemplatesSlice;
    const action = { type: '' };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState });
  });
  test('Setting popups', () => {
    const { reducer } = popupTemplatesSlice;
    const action = setPopups(popupTemplates);
    const state = reducer(initialState, action);
    expect(state).toEqual({ popups: popupTemplates });
  });
});

export {}; // 👈️ if you don't have anything else to export
