import type { SeasonalDecoration } from "@/types/portfolio";

export type SeasonalThemeType = "halloween" | "christmas" | "birthday" | "normal";

export interface ActiveSeasonalState {
  activeTheme: SeasonalThemeType;
  decoration: SeasonalDecoration | null;
  isOverridden: boolean;
}

/**
 * Normalizes "M-D" or "MM-DD" string to clean 2-digit "MM-DD" format (e.g., "10-2" -> "10-02")
 */
export function normalizeMMDD(mmddStr?: string): string | null {
  if (!mmddStr || typeof mmddStr !== "string") return null;
  const parts = mmddStr.trim().split("-");
  if (parts.length !== 2) return null;
  const month = parts[0].padStart(2, "0");
  const day = parts[1].padStart(2, "0");
  return `${month}-${day}`;
}

/**
 * Converts a Date object to 2-digit "MM-DD" string (e.g. Oct 24 -> "10-24")
 */
export function getMMDD(date: Date = new Date()): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}-${day}`;
}

/**
 * Checks if current MMDD string (e.g. "10-28") strictly falls between startMMDD and endMMDD (inclusive).
 * Handles both same-year ranges (e.g. "10-24" to "11-02") and year-wrapping ranges (e.g. "12-25" to "01-05").
 */
export function isMMDDInRange(current: string, startRaw?: string, endRaw?: string): boolean {
  const start = normalizeMMDD(startRaw);
  const end = normalizeMMDD(endRaw);

  if (!start || !end) return false;
  
  if (start <= end) {
    return current >= start && current <= end;
  } else {
    // Range wraps over New Year (e.g., 12-25 to 01-05)
    return current >= start || current <= end;
  }
}

/**
 * Strictly evaluates Sanity seasonal configurations against current date.
 */
export function determineActiveTheme(
  sanityDecorations?: SeasonalDecoration[],
  customDate?: Date
): ActiveSeasonalState {
  const currentDate = customDate ?? new Date();
  const currentMMDD = getMMDD(currentDate);

  // Sanity decorations exist, strictly check them against today's date
  if (sanityDecorations && sanityDecorations.length > 0) {
    for (const item of sanityDecorations) {
      if (item.is_active !== false && isMMDDInRange(currentMMDD, item.start_date, item.end_date)) {
        const themeKey = item.name.trim().toLowerCase();
        if (themeKey === "halloween" || themeKey === "christmas" || themeKey === "birthday") {
          return {
            activeTheme: themeKey as SeasonalThemeType,
            decoration: item,
            isOverridden: false,
          };
        }
      }
    }

    return {
      activeTheme: "normal",
      decoration: null,
      isOverridden: false,
    };
  }

  return {
    activeTheme: "normal",
    decoration: null,
    isOverridden: false,
  };
}
