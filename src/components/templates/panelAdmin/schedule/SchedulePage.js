"use client";
import Calendar from "@/components/modules/calendar/Calendar";
import React, { useState } from "react";
import WorkingDayCards from "./WorkingDayCards";
import SubmitSchedule from "./SubmitSchedule";

function SchedulePage({ schedules, doctorId }) {
  const [schedulesDate, setSchedulesDate] = useState(schedules || []);
  const [defaultStartTime, setDefaultStartTime] = useState("09:00");
  const [defaultEndTime, setDefaultEndTime] = useState("17:00");
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Calendar
        mode="multi"
        doctorId={doctorId}
        schedules={schedulesDate}
        setSchedulesDate={setSchedulesDate}
        defaultStartTime={defaultStartTime}
        setDefaultStartTime={setDefaultStartTime}
        defaultEndTime={defaultEndTime}
        setDefaultEndTime={setDefaultEndTime}
      />
      <WorkingDayCards
        schedules={schedulesDate}
        setSchedulesDate={setSchedulesDate}
      />
      {schedulesDate.length ? <SubmitSchedule schedules={schedulesDate} /> : ""}
    </div>
  );
}

export default SchedulePage;
