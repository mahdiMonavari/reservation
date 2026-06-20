import EmptyState from "@/components/modules/emptyState/EmptyState";
import React from "react";

function WorkingDayCard({ schedules }) {
  return (
    <div className="mt-6">
      {schedules.length ? (
        schedules.map((schedule) => <div key={schedule.id}></div>)
      ) : (
        <EmptyState title="هنوز تاریخ حضوری تایین نکرده اید" />
      )}
    </div>
  );
}

export default WorkingDayCard;
