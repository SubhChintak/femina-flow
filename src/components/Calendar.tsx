
import { useState } from "react";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";

interface CalendarProps {
  periodDates: Date[];
  ovulationDates: Date[];
}

const Calendar = ({ periodDates, ovulationDates }: CalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Function to determine if a date is in the period dates
  const isPeriodDate = (date: Date) => {
    return periodDates.some(
      (periodDate) =>
        periodDate.getDate() === date.getDate() &&
        periodDate.getMonth() === date.getMonth() &&
        periodDate.getFullYear() === date.getFullYear()
    );
  };

  // Function to determine if a date is an ovulation date
  const isOvulationDate = (date: Date) => {
    return ovulationDates.some(
      (ovulationDate) =>
        ovulationDate.getDate() === date.getDate() &&
        ovulationDate.getMonth() === date.getMonth() &&
        ovulationDate.getFullYear() === date.getFullYear()
    );
  };

  return (
    <Card className="p-4">
      <CalendarUI
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md pointer-events-auto"
        modifiers={{
          period: periodDates,
          ovulation: ovulationDates,
        }}
        modifiersClassNames={{
          period: "bg-blush-200 text-blush-900 rounded-md",
          ovulation: "bg-sky-200 text-sky-900 rounded-md",
        }}
        components={{
          DayContent: (props) => {
            const date = props.date;
            let extraClass = "";
            
            if (isPeriodDate(date)) {
              extraClass = "relative after:absolute after:top-0 after:right-0 after:w-2 after:h-2 after:bg-blush-500 after:rounded-full";
            } else if (isOvulationDate(date)) {
              extraClass = "relative after:absolute after:top-0 after:right-0 after:w-2 after:h-2 after:bg-sky-500 after:rounded-full";
            }
            
            return <div className={extraClass}>{props.date.getDate()}</div>;
          }
        }}
      />
      <div className="flex gap-6 mt-4 justify-center text-sm">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-blush-500"></div>
          <span>Period</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-sky-500"></div>
          <span>Ovulation</span>
        </div>
      </div>
    </Card>
  );
};

export default Calendar;
