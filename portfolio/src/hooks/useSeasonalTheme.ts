import { useMemo } from "react";
import type { PortfolioData } from "@/types/portfolio";
import { determineActiveTheme, type SeasonalThemeType, type ActiveSeasonalState } from "@/lib/seasonalConfig";
import { urlFor } from "@/data/sanity";

export interface UseSeasonalThemeResult extends ActiveSeasonalState {
  seasonalProfileImageUrl: string | null;
  seasonalAboutImageUrl: string | null;
}

export function useSeasonalTheme(data: PortfolioData | null): UseSeasonalThemeResult {
  return useMemo(() => {
    const result = determineActiveTheme(data?.seasonalDecorations);

    let seasonalProfileImageUrl: string | null = null;
    let seasonalAboutImageUrl: string | null = null;

    if (result.decoration?.hero_image) {
      try {
        seasonalProfileImageUrl = urlFor(result.decoration.hero_image).url();
      } catch (err) {
        console.warn("[useSeasonalTheme] Failed to process hero_image from Sanity:", err);
      }
    }

    if (result.decoration?.about_image) {
      try {
        seasonalAboutImageUrl = urlFor(result.decoration.about_image).url();
      } catch (err) {
        console.warn("[useSeasonalTheme] Failed to process about_image from Sanity:", err);
      }
    }

    return {
      ...result,
      seasonalProfileImageUrl,
      seasonalAboutImageUrl,
    };
  }, [data?.seasonalDecorations]);
}
