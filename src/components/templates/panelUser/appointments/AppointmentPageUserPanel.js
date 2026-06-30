import React from "react";
import AppointmentCard from "./AppointmentCard";
import SearchInput from "@/components/modules/admin/Search";
import Pagination from "@/components/modules/pagination/Pagination";

function AppointmentPageUserPanel({ appointments, totalPages, currentPage }) {
  return (
    <div>
      <header className="flex items-center justify-between text-2xl font-Morabba-Bold mb-6">
        <span> تمامی نوبتها</span>
        <div className="flex items-center gap-4">
          <span className="text-sm">اسم دکتر</span>
          <SearchInput />
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment._id} {...appointment} />
        ))}
      </div>
      <div className=" mt-6">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}

export default AppointmentPageUserPanel;
