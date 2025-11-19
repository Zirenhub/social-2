import { clsx, type ClassValue } from "clsx";
import { format, formatDistance, isSameDay } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FormatDateProps = {
  date: Date;
  include?: {
    hours?: boolean;
  };
};

export function formatDate({ date, include }: FormatDateProps): string {
  const currentDate = new Date();
  const within24Hours = isSameDay(currentDate, date);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  if (include?.hours) {
    options.hour = "numeric";
    options.minute = "numeric";
  }

  if (within24Hours) {
    return formatDistance(date, currentDate, {
      addSuffix: true,
      includeSeconds: true,
    });
  }

  return format(date, "MMM d, yyyy" + (include?.hours ? " • h:mm aa" : ""));
}
