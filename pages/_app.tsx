import React, { useState } from 'react';
import '../src/styles/global.scss';
import ThemeContext from '../src/common/context/ThemeContext';
import { THEME_TYPE } from '../src/common/enums/theme';

function MyApp({ Component, pageProps }) {
	const [theme, setTheme] = useState(THEME_TYPE.BASE);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			<Component {...pageProps} />
		</ThemeContext.Provider>
	);
}

export default MyApp;
