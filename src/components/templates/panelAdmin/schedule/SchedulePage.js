import Calendar from "@/components/modules/calendar/Calendar";
import React from "react";
import WorkingDayCards from "./WorkingDayCards";

function SchedulePage({ schedules }) {
  const schedulesDate = schedules.map((schedule) => schedule.date);
  return (
    <div className="flex flex-col items-center justify-center">
      <Calendar schedules={schedulesDate} />
      <WorkingDayCards schedules={schedules} />
    </div>
  );
}

export default SchedulePage;
