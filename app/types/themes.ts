import { LiveWallpaperType } from "./wallpaper";

export interface AccentColor {
  name: string;
  hex: string;
  glow: string;
}

export interface CustomTheme {
  themeName: string;
  accentColor: string;
  backgroundStyle: string;
  liveWallpaper: LiveWallpaperType;
  terminalGreeting: string;
  compilerSteps: string[];
}
