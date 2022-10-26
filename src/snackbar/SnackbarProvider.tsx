import React, { useReducer } from 'react';
import FakeSnack from './fakeSnack/FakeSnack';
import {
  snackbarReducer,
  SnackbarReducerState
} from '../reducers/snackbar/snackbarReducer';
import { AnyAction } from 'redux';

type Props = {};

export const SnackbarContext = React.createContext<{
  state: SnackbarReducerState;
  dispatch?: React.Dispatch<AnyAction>;
}>({
  state: { snacks: [] }
});

const SnackbarProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(snackbarReducer, { snacks: [] });

  return (
    <SnackbarContext.Provider value={{ state, dispatch }}>
      <div
        className={
          'fixed z-[15] w-fit m-auto right-0 left-0 bottom-[24px] flex flex-col gap-[12px]'
        }
      >
        {state.snacks.map(({ text, theme }) => (
          <FakeSnack text={text} theme={theme} />
        ))}
      </div>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
