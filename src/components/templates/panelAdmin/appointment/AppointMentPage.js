"use client";
import { useEffect, useState } from "react";
import EmptyState from "@/components/modules/emptyState/EmptyState";
import SearchInput from "@/components/modules/admin/Search";
import Pagination from "@/components/modules/pagination/Pagination";
import DescriptionModal from "./DescriptionModal";
import AppointmentCard from "./AppointmentCard";

function AppointMentPage({ appointments: initial, totalPages, currentPage }) {
  const [appointments, setAppointments] = useState(initial);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    setAppointments(initial);
  }, [initial]);
  const handleSave = (id, description) => {
    setAppointments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, description } : a))
    );
    setSelected(null);
  };

  return (
    <>
      {selected && (
        <DescriptionModal
          appointment={selected}
          onClose={() => setSelected(null)}
          onSave={handleSave}
        />
      )}

      <div className="p-6 flex flex-col gap-6">
        {/* سرچ */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-Morabba-Bold text-slate-800 dark:text-slate-100">
            نوبت‌ها
          </h1>
          <SearchInput />
        </div>

        {/* کارت‌ها */}
        {appointments.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onEdit={setSelected}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="نوبتی ثبت نشده" />
        )}
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        )}
      </div>
    </>
  );
}

export default AppointMentPage;
