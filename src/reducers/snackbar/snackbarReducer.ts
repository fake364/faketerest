import { FakeSnackProps } from '../../snackbar/fakeSnack/FakeSnack';
import { AnyAction } from 'redux';
import { ADD_SNACK, REMOVE_SNACK } from './actions';

export type SnackbarReducerState = {
  snacks: FakeSnackProps[];
};

const initialState: SnackbarReducerState = { snacks: [] };

export function snackbarReducer(
  state = initialState,
  action: AnyAction
): SnackbarReducerState {
  switch (action.type) {
    case ADD_SNACK:
      return { ...state, snacks: [...state.snacks, action.payload] };
    case REMOVE_SNACK:
      return {
        ...state,
        snacks: state.snacks.filter(({ id }) => id !== action.payload)
      };
    default:
      return state;
  }
}
