import Validator from "fastest-validator";

const v = new Validator();

const schema = {
  specialty: { type: "string", empty: false },
  about: { type: "string", empty: false },
  fieldOfStudy: { type: "string", empty: false },
  reviewsCount: { type: "number", min: 0 },
  experience: { type: "number", positive: true },
  reviewsCount: { type: "number", min: 0 },
  avgAppointmentTime: { type: "number", positive: true },
  baseFee: { type: "number", positive: true },
  $$strict: false,
};

const check = v.compile(schema);

const canDoctorActiveValidation = ({
  specialty,
  about,
  rating,
  experience,
  reviewsCount,
  avgAppointmentTime,
  baseFee,
  fieldOfStudy,
}) => {
  const result = check({
    specialty,
    about,
    rating,
    experience,
    reviewsCount,
    avgAppointmentTime,
    baseFee,
    fieldOfStudy,
  });
  return result === true;
};

export default canDoctorActiveValidation;
