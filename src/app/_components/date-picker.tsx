"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { cn } from "~/lib/utils";

type Props = {
  startMonth?: Date;
  endMonth?: Date;
  className?: string;
  setBirthDate?: (date: Date) => void;
};

function DatePicker({ startMonth, endMonth, className, setBirthDate }: Props) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const handleSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    setOpen(false);
    if (setBirthDate) {
      setBirthDate(selectedDate); // RHF setter
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className={cn("w-48 justify-between font-normal", className)}
        >
          {date ? date.toLocaleDateString() : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          required
          selected={date}
          captionLayout="dropdown"
          onSelect={handleSelect}
          startMonth={startMonth}
          endMonth={endMonth}
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
