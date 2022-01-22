import { SLIDER_THEMES } from '../enums/slider_themes';

export namespace CommonTypes {
	export type Nullable<T> = T | null;
	export type ShownType = { shownType: SLIDER_THEMES };
}
