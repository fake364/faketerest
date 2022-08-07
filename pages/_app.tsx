import React, { useEffect, useState } from 'react';
import '../src/styles/global.scss';
import '../src/styles/customs/slider.scss';
import '../src/styles/customs/animations.scss';
import '../src/styles/customs/regForm/regForm.scss';
import ThemeContext from '../src/common/context/ThemeContext';
import { THEME_TYPE } from '../src/common/enums/theme';
import { appWithTranslation } from 'next-i18next';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, wrapper } from '../src/redux/store';
import { RootState } from '../src/redux/types';
import { fetchUserData } from '../src/redux/actions/user-data/actions';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

type WrapperProps = {};

const WrapperUnderRedux: React.FC<WrapperProps> = ({ children }) => {
  const [theme, setTheme] = useState(THEME_TYPE.BASE);
  const dispatch: ThunkDispatch<RootState, {}, AnyAction> = useDispatch();

  const isLoggedIn = useSelector(
    (state: RootState) => state.metadata.isLoggedIn
  );
  const userId: number | undefined = useSelector(
    (state: RootState) => state.metadata.userId
  );

  useEffect(() => {
    if (isLoggedIn && userId) {
      dispatch(fetchUserData(userId));
    }
  }, [isLoggedIn, userId]);


  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <WrapperUnderRedux>
        <Component {...pageProps} />
      </WrapperUnderRedux>
    </Provider>
  );
}

export default appWithTranslation(wrapper.withRedux(MyApp));
