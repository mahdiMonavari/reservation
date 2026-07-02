import Validator from "fastest-validator";

const v = new Validator();

export default v.compile({
  dateShamsi: {
    type: "string",
  },
  timeStart: {
    type: "string",
  },
});
