import { SLIDER_THEMES } from '../enums/slider_themes';
import { Dispatch, SetStateAction } from 'react';

export type Nullable<T> = T | null;
export type ShownType = { shownType: SLIDER_THEMES };

export type StateSetter<T> = Dispatch<SetStateAction<T>>;

export type CountryObject = { code: string; label: string };
