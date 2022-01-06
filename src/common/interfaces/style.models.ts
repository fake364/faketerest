import { THEME_TYPE } from '../enums/theme';

namespace StyleModels {
	export type Theme = {
		PRIMARY: string;
		SECONDARY: string;
		BUTTON_RADIUS: number;
		TEXT_PRIMARY: string;
		TEXT_SECONDARY: string;
	};

	export type ThemeTypeValues = { [key in THEME_TYPE]: StyleModels.Theme };
}

export default StyleModels;
