// utils/dateUtils.ts
export interface YearAvailability {
  currentYear: number;
  previousYear: number;
  daysSinceYearStart: number;
  availableYears: number[];
  defaultYear: number;
  eventsApiLimitDays: number;
}

export const getFallbackYear = (): number => new Date().getFullYear();

const GITHUB_EVENTS_LIMIT_DAYS = 90;

export const calculateYearAvailability = (): YearAvailability => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const previousYear = currentYear - 1;
  const yearStart = new Date(currentYear, 0, 1);

  const daysSinceYearStart = Math.floor(
    (today.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Offer the current year plus recent history (older years rely on commit
  // search, so quality degrades — getYearDisplayInfo labels them honestly)
  const YEARS_OFFERED = 5;
  const availableYears = Array.from({ length: YEARS_OFFERED }, (_, i) => currentYear - i);

  // After January, default to previous year (full-year wrap); early Jan defaults to current year
  const defaultYear = daysSinceYearStart > 31 ? previousYear : currentYear;

  return {
    currentYear,
    previousYear,
    daysSinceYearStart,
    availableYears,
    defaultYear,
    eventsApiLimitDays: GITHUB_EVENTS_LIMIT_DAYS,
  };
};

export const getYearDisplayInfo = (selectedYear: number): {
  isCurrentYear: boolean;
  dataQuality: 'full' | 'partial' | 'estimated';
  description: string;
} => {
  const { currentYear, daysSinceYearStart, eventsApiLimitDays } = calculateYearAvailability();

  if (selectedYear === currentYear) {
    if (daysSinceYearStart <= eventsApiLimitDays) {
      return {
        isCurrentYear: true,
        dataQuality: 'partial',
        description: `${currentYear} YTD (${daysSinceYearStart} days) — events API + commit search`,
      };
    }
    return {
      isCurrentYear: true,
      dataQuality: 'partial',
      description: `${currentYear} — events limited to last ${eventsApiLimitDays} days; commit search for totals`,
    };
  }

  if (selectedYear === currentYear - 1) {
    return {
      isCurrentYear: false,
      dataQuality: 'estimated',
      description: `${selectedYear} full year — commit search + repo activity (events API ~${eventsApiLimitDays}-day window)`,
    };
  }

  return {
    isCurrentYear: false,
    dataQuality: 'estimated',
    description: `${selectedYear} — estimated from commit history (events API doesn't cover past years)`,
  };
};
