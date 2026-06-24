import Validator from "fastest-validator";

const v = new Validator();

const schema = {
  specialty: { type: "string", empty: false },
  about: { type: "string", empty: false },
  fieldOfStudy: { type: "string", empty: false },
  experience: { type: "number", positive: true },
  avgAppointmentTime: { type: "number", positive: true },
  baseFee: { type: "number", positive: true },
  $$strict: false,
};

const check = v.compile(schema);

const canDoctorActiveValidation = ({
  specialty,
  about,
  experience,
  avgAppointmentTime,
  baseFee,
  fieldOfStudy,
}) => {
  const result = check({
    specialty,
    about,
    experience,
    avgAppointmentTime,
    baseFee,
    fieldOfStudy,
  });
  return result === true;
};

export default canDoctorActiveValidation;
