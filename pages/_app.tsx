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
import 'reflect-metadata';
import SnackbarProvider from '../src/snackbar/SnackbarProvider';
import GlobalNotificationWrapper from '../src/components/globalNotificationWrapper/GlobalNotificationWrapper';
import '../src/common/utils/mobileCheck/mobileCheck';
import useSSRLoading from '../src/common/hooks/useSSRLoading/useSSRLoading';

type WrapperProps = { children?: React.ReactNode };

const WrapperUnderRedux: React.FC<WrapperProps> = ({ children }) => {
  const [theme, setTheme] = useState(THEME_TYPE.BASE);
  const [isTranslationLoading, setTranslationsLoading] = useState(true);

  useFetchUser();

  const { isCheckingAuth } = useCheckAuth();

  useEffect(() => {
    // TODO FIX TRANSLATIONS
    // setLanguage(navigator.language)
    //   .then((res) => {
    //     !res && setLanguage('en');
    //   })
    setLanguage('en').then(() => {
      setTranslationsLoading(false);
    });
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/public/sw.js', { scope: '/' }).then(
        () => {
          console.log('[Faketerest] SW has been installed successful');
        },
        (err) => {
          console.error('[Faketerest] Failed installing service worker', err);
        }
      );
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {isCheckingAuth || isTranslationLoading ? <RegFormSpinner /> : children}
    </ThemeContext.Provider>
  );
};

function MyApp({ Component, pageProps }) {
  const isPageLoading = useSSRLoading();

  return (
    <Provider store={store}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore*/}
      <PersistGate loading={null} persistor={persistor}>
        <WrapperUnderRedux>
          <SnackbarProvider>
            <GlobalNotificationWrapper>
              {isPageLoading ? (
                <RegFormSpinner />
              ) : (
                <Component {...pageProps} />
              )}
            </GlobalNotificationWrapper>
          </SnackbarProvider>
        </WrapperUnderRedux>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
