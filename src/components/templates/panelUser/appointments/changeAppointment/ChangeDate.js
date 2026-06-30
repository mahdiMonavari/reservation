import Calendar from "@/components/modules/calendar/Calendar";
import React from "react";

function ChangeDate({ selectedDate, handleSelectDate, dateList }) {
  //   console.log(selectedDate);
  return (
    <Calendar
      mode="single"
      theme="emerald"
      permission={1}
      selectedDate={
        selectedDate
          ? (() => {
              const d = new Date(selectedDate.date);
              return {
                year: d.getFullYear(),
                month: d.getMonth(),
                date: d.getDate(),
              };
            })()
          : null
      }
      onSelectDate={handleSelectDate}
      workingDateList={dateList}
    />
  );
}

export default ChangeDate;
