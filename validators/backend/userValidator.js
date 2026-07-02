// validators/user.validator.js
import Validator from "fastest-validator";

const v = new Validator();

export const registerValidator = v.compile({
  firstName: {
    type: "string",
    min: 2,
    max: 50,
    messages: {
      string: "نام باید متنی باشد",
      stringMin: "نام باید حداقل ۲ کاراکتر باشد",
      stringMax: "نام نباید بیشتر از ۵۰ کاراکتر باشد",
      required: "نام الزامی است",
    },
  },
  lastName: {
    type: "string",
    min: 2,
    max: 50,
    messages: {
      string: "نام خانوادگی باید متنی باشد",
      stringMin: "نام خانوادگی باید حداقل ۲ کاراکتر باشد",
      stringMax: "نام خانوادگی نباید بیشتر از ۵۰ کاراکتر باشد",
      required: "نام خانوادگی الزامی است",
    },
  },
  phoneNumber: {
    type: "string",
    pattern: /^09[0-9]{9}$/,
    messages: {
      string: "شماره تلفن باید متنی باشد",
      stringPattern: "شماره تلفن معتبر نیست — مثال: 09123456789",
      required: "شماره تلفن الزامی است",
    },
  },
  password: {
    type: "string",
    min: 8,
    max: 100,
    pattern: /^[a-zA-Z0-9]+$/,
    messages: {
      string: "رمز عبور باید متنی باشد",
      stringMin: "رمز عبور باید حداقل ۸ کاراکتر باشد",
      stringMax: "رمز عبور نباید بیشتر از ۱۰۰ کاراکتر باشد",
      required: "رمز عبور الزامی است",
      pattern:
        "رمز عبور فقط می‌تواند شامل حروف انگلیسی و اعداد باشد (بدون فاصله یا کاراکتر خاص)",
    },
  },

  $$strict: true,
});
export const editValidator = v.compile({
  firstName: {
    type: "string",
    min: 2,
    max: 50,
    messages: {
      string: "نام باید متنی باشد",
      stringMin: "نام باید حداقل ۲ کاراکتر باشد",
      stringMax: "نام نباید بیشتر از ۵۰ کاراکتر باشد",
      required: "نام الزامی است",
    },
  },
  lastName: {
    type: "string",
    min: 2,
    max: 50,
    messages: {
      string: "نام خانوادگی باید متنی باشد",
      stringMin: "نام خانوادگی باید حداقل ۲ کاراکتر باشد",
      stringMax: "نام خانوادگی نباید بیشتر از ۵۰ کاراکتر باشد",
      required: "نام خانوادگی الزامی است",
    },
  },
  phoneNumber: {
    type: "string",
    pattern: /^09[0-9]{9}$/,
    messages: {
      string: "شماره تلفن باید متنی باشد",
      stringPattern: "شماره تلفن معتبر نیست — مثال: 09123456789",
      required: "شماره تلفن الزامی است",
    },
  },
  password: {
    type: "string",
    min: 8,
    max: 100,
    optional: true,
  },
  $$strict: true,
});

export const loginValidator = v.compile({
  phoneNumber: {
    type: "string",
    pattern: /^09[0-9]{9}$/,
    messages: {
      string: "شماره تلفن باید متنی باشد",
      stringPattern: "شماره تلفن معتبر نیست",
      required: "شماره تلفن الزامی است",
    },
  },
  password: {
    type: "string",
    min: 8,
    messages: {
      string: "رمز عبور باید متنی باشد",
      stringMin: "رمز عبور باید حداقل ۸ کاراکتر باشد",
      required: "رمز عبور الزامی است",
    },
  },
  $$strict: true,
});
