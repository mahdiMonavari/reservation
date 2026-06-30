import React from "react";
import AppointmentCard from "./AppointmentCard";

function AppointmentPageUserPanel({ appointments }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment._id} {...appointment} />
      ))}
    </div>
  );
}

export default AppointmentPageUserPanel;
