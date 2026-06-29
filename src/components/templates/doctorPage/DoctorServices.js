import React from "react";
import DoctorService from "./DoctorService";
import EmptySection from "@/components/modules/emptyState/EmptySection";

function DoctorServices({ services }) {
  return (
    <section className="container py-16">
      <h2 className="text-3xl md:text-4xl font-Morabba-Bold text-emerald-950 dark:text-white mb-8 text-center">
        خدمات قابل ارائه
      </h2>
      {services.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <DoctorService key={index} service={service} index={index} />
          ))}
        </div>
      ) : (
        <EmptySection title="هنوز دکتر خدماتی برای ارائه ثبت نکرده است" />
      )}
    </section>
  );
}

export default DoctorServices;
