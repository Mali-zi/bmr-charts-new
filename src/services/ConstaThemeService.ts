import { BaseService } from "bi-internal/core";
import {
  ThemePreset,
  presetGpnDefault,
  presetGpnDark,
} from "@consta/uikit/Theme";
import { IconComponent } from "@consta/icons/Icon";
import { IconSun } from "@consta/icons/IconSun";
import { IconMoon } from "@consta/icons/IconMoon";
import { ThemeVC } from "bi-internal/services";

export type IConstaTheme = {
  preset: ThemePreset;
  key?: string;
  label: string;
  icon: IconComponent;
};

export const themes: IConstaTheme[] = [
  {
    preset: presetGpnDefault,
    key: "light",
    label: "Светлая",
    icon: IconSun,
  },
  {
    preset: presetGpnDark,
    key: "dark",
    label: "Темная",
    icon: IconMoon,
  },
];

export interface IConstaThemeModel {
  loading: boolean;
  error: string;
  currentTheme: IConstaTheme;
  themes: IConstaTheme[];
}

export class ConstaThemeService extends BaseService<IConstaThemeModel> {
  constructor() {
    super({
      loading: false,
      error: "",
      currentTheme:
        themes.find(
          (theme) =>
            theme.key === ThemeVC.getInstance().getModel().currentThemeId
        ) || themes[0],
      themes,
    });
    Promise.all([]).then(([]) => []);
  }
  public setTheme = (theme: IConstaTheme) => {
    ThemeVC.getInstance().setTheme(theme.key);
    this._updateWithData({ currentTheme: theme });
  };
  protected _dispose() {
    super._dispose();
  }
  public static getInstance = () => {
    if (!window["__constaThemeService"]) {
      window["__constaThemeService"] = new ConstaThemeService();
    }
    return window["__constaThemeService"];
  };
}
ConstaThemeService.getInstance();
