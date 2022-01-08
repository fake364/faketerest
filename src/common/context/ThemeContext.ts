import React from 'react';
import { THEME_TYPE } from '../enums/theme';

const ThemeContext = React.createContext<{
	theme: THEME_TYPE;
	setTheme: Function;
}>({
	theme: THEME_TYPE.BASE,
	setTheme: () => null
});

export default ThemeContext;
