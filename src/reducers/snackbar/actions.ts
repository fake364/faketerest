import { FakeSnackProps } from '../../snackbar/fakeSnack/FakeSnack';

export const ADD_SNACK = 'ADD_SNACK';
export const REMOVE_SNACK = 'REMOVE_SNACK';

export const addSnackAction = (snack: FakeSnackProps) => {
  const idSymbol = Symbol();
  return {
    type: ADD_SNACK,
    payload: { ...snack, id: idSymbol }
  };
};

export const removeSnackByIdentifier = (removeSymbol: Symbol) => ({
  type: REMOVE_SNACK,
  payload: removeSymbol
});
