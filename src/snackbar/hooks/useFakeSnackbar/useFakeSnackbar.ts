import { useContext } from 'react';
import { SnackbarContext } from '../../SnackbarProvider';
import { FakeSnackProps } from '../../fakeSnack/FakeSnack';
import {
  addSnackAction,
  removeSnackByIdentifier
} from '../../../reducers/snackbar/actions';

const SHIFT_TIMEOUT = 4500;

const useFakeSnackbar = () => {
  const {
    state: { snacks },
    dispatch
  } = useContext(SnackbarContext);

  const addFakeSnack = (snack: FakeSnackProps) => {
    const action = addSnackAction(snack);
    dispatch?.(action);
    setTimeout(() => {
      dispatch?.(removeSnackByIdentifier(action.payload.id));
    }, SHIFT_TIMEOUT);
  };

  return { snacks, addFakeSnack };
};

export default useFakeSnackbar;
