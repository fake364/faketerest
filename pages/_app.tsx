import React, { useState } from 'react';
import '../src/styles/global.scss';
import '../src/styles/customs/slider.scss';
import '../src/styles/customs/animations.scss';
import '../src/styles/customs/regForm/regForm.scss';
import ThemeContext from '../src/common/context/ThemeContext';
import { THEME_TYPE } from '../src/common/enums/theme';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';
import { wrapper, store } from '../src/redux/store';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(THEME_TYPE.BASE);

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Component {...pageProps} />
      </ThemeContext.Provider>
    </Provider>
  );
}

export default appWithTranslation(wrapper.withRedux(MyApp));
