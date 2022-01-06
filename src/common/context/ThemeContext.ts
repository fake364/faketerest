import React from 'react';
import { THEMES_VALUES } from '../constants/colors';
import StyleModels from '../interfaces/style.models';

const ThemeContext = React.createContext<{ theme: StyleModels.Theme; setTheme: Function }>({
	theme: THEMES_VALUES.MAIN,
	setTheme: () => null
});

export default ThemeContext;
