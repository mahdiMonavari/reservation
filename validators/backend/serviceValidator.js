import Validator from "fastest-validator";

const v = new Validator();

export const ServiceValidator = v.compile({
  title: {
    type: "string",
    min: 3,
    max: 100,
  },
  doctorId: {
    type: "string",
    pattern: /^[a-fA-F0-9]{24}$/,
  },
  price: {
    type: "string",
    min: 0,
  },
  duration: {
    type: "string",
  },
  description: {
    type: "string",
    min: 3,
    max: 200,
  },
  $$strict: true,
});
