import React, { useState } from 'react';
import '../src/styles/global.scss';
import ThemeContext from '../src/common/context/ThemeContext';
import { THEMES_VALUES } from '../src/common/constants/colors';

function MyApp({ Component, pageProps }) {
	const [theme, setTheme] = useState(THEMES_VALUES.MAIN);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			<Component {...pageProps} />
		</ThemeContext.Provider>
	);
}

export default MyApp;
