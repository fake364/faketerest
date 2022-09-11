import React, { useEffect, useState } from 'react';
import '../src/styles/global.scss';
import '../src/styles/customs/slider.scss';
import '../src/styles/customs/animations.scss';
import '../src/styles/customs/regForm/regForm.scss';
import ThemeContext from '../src/common/context/ThemeContext';
import { THEME_TYPE } from '../src/common/enums/theme';
import { Provider } from 'react-redux';
import { persistor, store, wrapper } from '../src/redux/store';
import { useFetchUser } from '../src/common/hooks/useFetchUser/useFetchUser';
import { useCheckAuth } from '../src/common/hooks/useCheckAuth';
import RegFormSpinner from '../src/components/mains/others/baseMain/regForm/form/spinner/RegFormSpinner';
import { PersistGate } from 'redux-persist/integration/react';
import setLanguage from 'next-translate/setLanguage';

type WrapperProps = { children?: React.ReactNode };

const WrapperUnderRedux: React.FC<WrapperProps> = ({ children }) => {
  const [theme, setTheme] = useState(THEME_TYPE.BASE);
  const [isTranslationLoading, setTranslationsLoading] = useState(true);

  // TODO revisit this hook with react-query
  useFetchUser();

  const { isCheckingAuth } = useCheckAuth();

  useEffect(() => {
    setLanguage(navigator.language)
      .then((res) => {
        !res && setLanguage('en');
      })
      .then(() => {
        setTranslationsLoading(false);
      });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {isCheckingAuth || isTranslationLoading ? <RegFormSpinner /> : children}
    </ThemeContext.Provider>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WrapperUnderRedux>
          <Component {...pageProps} />
        </WrapperUnderRedux>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
