import DoctorPage from "@/components/templates/doctorPage/DoctorPage";
import doctorModel from "../../../../../model/doctor";
import commentModel from "../../../../../model/comment";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/utiles/auth/auth";
import userModel from "../../../../../model/user";
import connectionToDB from "@/utiles/DB/connection";

export async function generateMetadata({ params }) {
  const { id } = await params;
  await connectionToDB();

  const doctor = await doctorModel
    .findById(id)
    .populate("userId", "firstName lastName")
    .lean();

  if (!doctor) {
    return {
      title: "دکتر یافت نشد",
      robots: { index: false, follow: false },
    };
  }

  const fullName = `${doctor.userId?.firstName} ${doctor.userId?.lastName}`;
  const description =
    doctor.about || `صفحه دکتر ${fullName} متخصص ${doctor.specialty}`;
  const url = `https://your-domain.com/doctors/${id}`;

  return {
    title: `${doctor.fieldOfStudy} ${fullName}`,
    description,
    keywords: [fullName, doctor.specialty, "دکتر", "متخصص", "رزرو نوبت"],
    openGraph: {
      title: `دکتر ${fullName} | کلینیک پزشکی`,
      description,
      url,
      images: doctor.photo ? [{ url: doctor.photo }] : [],
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Physician",
        name: `دکتر ${fullName}`,
        description,
        medicalSpecialty: doctor.specialty,
        url,
        image: doctor.photo || undefined,
        aggregateRating:
          doctor.reviewsCount > 0
            ? {
                "@type": "AggregateRating",
                ratingValue: doctor.rating,
                reviewCount: doctor.reviewsCount,
              }
            : undefined,
        priceRange: doctor.baseFee
          ? `${doctor.baseFee.toLocaleString("fa-IR")} تومان`
          : undefined,
      }),
    },
  };
}

async function page({ params }) {
  await connectionToDB();
  const { id } = await params;
  const doctor = await doctorModel
    .findOne({ userId: id })
    .populate("userId", "firstName lastName");
  const commentCount = await commentModel.countDocuments({
    doctorId: id,
    parentId: null,
    isVerified: true,
  });
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { phone } = verifyAccessToken(token);
  const user = await userModel.findOne({ phoneNumber: phone }, "_id");
  return (
    <div className="min-h-screen pt-21 bg-gray-100 dark:bg-zinc-800">
      <DoctorPage
        doctor={JSON.parse(JSON.stringify(doctor))}
        commentCount={commentCount}
        isUserLogin={JSON.parse(JSON.stringify(user))}
        params={id}
      />
    </div>
  );
}

export default page;
