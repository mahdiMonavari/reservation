// validators/appointment.validator.js
import Validator from "fastest-validator";

const v = new Validator();

const objectIdPattern = /^[a-fA-F0-9]{24}$/;
const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:MM

export const appointmentValidator = v.compile({
  userId: {
    type: "string",
    pattern: objectIdPattern,
    messages: {
      string: "آیدی کاربر باید متنی باشد",
      stringPattern: "آیدی کاربر معتبر نیست",
      required: "آیدی کاربر الزامی است",
    },
  },
  doctorId: {
    type: "string",
    pattern: objectIdPattern,
    messages: {
      string: "آیدی دکتر باید متنی باشد",
      stringPattern: "آیدی دکتر معتبر نیست",
      required: "آیدی دکتر الزامی است",
    },
  },
  serviceIds: {
    type: "array",
    min: 1,
    items: {
      type: "string",
      pattern: objectIdPattern,
      messages: {
        string: "آیدی سرویس باید متنی باشد",
        stringPattern: "آیدی سرویس معتبر نیست",
      },
    },
    messages: {
      array: "سرویس‌ها باید آرایه باشند",
      arrayMin: "حداقل یک سرویس باید انتخاب شود",
      required: "سرویس‌ها الزامی هستند",
    },
  },
  totalTime: {
    type: "number",
    min: 5,
    messages: {
      number: "زمان کل باید عدد باشد",
      numberMin: "زمان کل باید حداقل ۵ دقیقه باشد",
      required: "زمان کل الزامی است",
    },
  },
  timeStart: {
    type: "string",
    pattern: timePattern,
    messages: {
      string: "ساعت شروع باید متنی باشد",
      stringPattern: "فرمت ساعت شروع معتبر نیست — مثال: 09:00",
      required: "ساعت شروع الزامی است",
    },
  },
  timeEnd: {
    type: "string",
    pattern: timePattern,
    messages: {
      string: "ساعت پایان باید متنی باشد",
      stringPattern: "فرمت ساعت پایان معتبر نیست — مثال: 09:30",
      required: "ساعت پایان الزامی است",
    },
  },
  $$strict: true,
});
