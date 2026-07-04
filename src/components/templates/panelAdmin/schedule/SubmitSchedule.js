import { successToast } from "@/components/modules/toast/toast";
import React from "react";

function SubmitSchedule({ schedules }) {
  const submitHandler = async () => {
    console.log(schedules);

    const res = await fetch("/api/schedule", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(schedules),
    });
    if (res.status === 201) {
      successToast("زمان حضور شما با موفقیت ثبت شد");
    }
  };

  return (
    <div>
      <button
        onClick={submitHandler}
        className="px-6 py-2 bg-white dark:bg-slate-900 rounded-2xl border font-Morabba-Bold
        border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300
        shadow-sm hover:shadow-md transition-all duration-200"
      >
        ثبت زمان
      </button>
    </div>
  );
}

export default SubmitSchedule;
