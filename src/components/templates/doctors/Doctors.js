import TitleHeader from "@/components/modules/titleHeader/TitleHeader";
import Doctor from "./Doctor";
import EmptySection from "@/components/modules/emptyState/EmptySection";

function Doctors({ doctors }) {
  return (
    <div className="mt-20 mb-20">
      <TitleHeader title={"لیست متخصصین"} />
      {!doctors.length ? (
        <EmptySection title={"هنوز دکتری در سایت فعال نمیباشد"} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 mt-20 container">
          {doctors.map((doctor) => (
            <Doctor {...doctor} key={doctor._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Doctors;
