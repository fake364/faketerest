import { SLIDER_THEMES } from '../../enums/slider_themes';

export const SLIDER_ARRAY = [
  SLIDER_THEMES.DINNER_IDEA,
  SLIDER_THEMES.HOME_DECOR,
  SLIDER_THEMES.NEW_OUTFIT,
  SLIDER_THEMES.THUMB_IDEA
];

export default class SliderNode {
  private readonly _type: SLIDER_THEMES;

  get type(): SLIDER_THEMES {
    return this._type;
  }

  constructor(type: SLIDER_THEMES) {
    this._type = type;
  }

  public static createThemesArray = (themes: SLIDER_THEMES[]) =>
    themes.map((theme) => new SliderNode(theme));
}
