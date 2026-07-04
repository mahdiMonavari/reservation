// validators/workingDay.validator.js
import Validator from "fastest-validator";

const v = new Validator();

export const workingDayValidator = v.compile({
  doctorId: {
    type: "string",
    messages: {
      string: "آیدی دکتر باید متنی باشد",
      stringPattern: "آیدی دکتر معتبر نیست",
      required: "آیدی دکتر الزامی است",
    },
  },
  date: {
    type: "string",
    messages: {
      string: "تاریخ باید متنی باشد",
      stringPattern: "فرمت تاریخ معتبر نیست — مثال: 2024-03-15",
      required: "تاریخ الزامی است",
    },
  },
  timeStart: {
    type: "string",
    messages: {
      string: "ساعت شروع باید متنی باشد",
      stringPattern: "فرمت ساعت شروع معتبر نیست — مثال: 09:00",
      required: "ساعت شروع الزامی است",
    },
  },
  timeEnd: {
    type: "string",
    messages: {
      string: "ساعت پایان باید متنی باشد",
      stringPattern: "فرمت ساعت پایان معتبر نیست — مثال: 09:30",
      required: "ساعت پایان الزامی است",
    },
  },
  $$strict: true,
});
