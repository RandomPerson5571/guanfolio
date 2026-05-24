export type LiveWallpaperType = "none" | "matrix" | "stars" | "nebula" | "grid";

export interface WallpaperPreset {
  id: string;
  name: string;
  type: "preset" | "url" | "animated";
  value: string;
  thumbnail: string;
}
