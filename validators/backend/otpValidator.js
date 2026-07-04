import Validator from "fastest-validator";

const v = new Validator();

const PHONE_PATTERN = /^09[0-9]{9}$/;
const CODE_PATTERN = /^[0-9]{6}$/;

export const sendOtpValidator = v.compile({
  phone: {
    type: "string",
    pattern: PHONE_PATTERN,
    messages: {
      string: "شماره تلفن باید متنی باشد",
      stringPattern: "شماره تلفن معتبر نیست — مثال: 09123456789",
      required: "شماره تلفن الزامی است",
    },
  },
  $$strict: true,
});

export const verifyOtpValidator = v.compile({
  phone: {
    type: "string",
    pattern: PHONE_PATTERN,
    messages: {
      string: "شماره تلفن باید متنی باشد",
      stringPattern: "شماره تلفن معتبر نیست — مثال: 09123456789",
      required: "شماره تلفن الزامی است",
    },
  },
  code: {
    type: "string",
    length: 6,
    pattern: CODE_PATTERN,
    messages: {
      string: "کد تأیید باید متنی باشد",
      stringLength: "کد تأیید باید ۶ رقم باشد",
      stringPattern: "کد تأیید فقط باید شامل ۶ رقم انگلیسی باشد",
      required: "کد تأیید الزامی است",
    },
  },
  $$strict: true,
});
