// validators/workingDay.validator.js
import Validator from "fastest-validator";

const v = new Validator();

const objectIdPattern = /^[a-fA-F0-9]{24}$/
const timePattern     = /^([01]\d|2[0-3]):([0-5]\d)$/  // HH:MM

export const createWorkingDayValidator = v.compile({
    doctorId: {
        type: "string",
        pattern: objectIdPattern,
        messages: {
            string:        "آیدی دکتر باید متنی باشد",
            stringPattern: "آیدی دکتر معتبر نیست",
            required:      "آیدی دکتر الزامی است",
        }
    },
    date: {
        type: "string",
        pattern: /^\d{4}-\d{2}-\d{2}$/,
        messages: {
            string:        "تاریخ باید متنی باشد",
            stringPattern: "فرمت تاریخ معتبر نیست — مثال: 2024-03-15",
            required:      "تاریخ الزامی است",
        }
    },
    timeStart: {
        type: "string",
        pattern: timePattern,
        messages: {
            string:        "ساعت شروع باید متنی باشد",
            stringPattern: "فرمت ساعت شروع معتبر نیست — مثال: 09:00",
            required:      "ساعت شروع الزامی است",
        }
    },
    timeEnd: {
        type: "string",
        pattern: timePattern,
        messages: {
            string:        "ساعت پایان باید متنی باشد",
            stringPattern: "فرمت ساعت پایان معتبر نیست — مثال: 09:30",
            required:      "ساعت پایان الزامی است",
        }
    },
    $$strict: true
})

// export const updateWorkingDayValidator = v.compile({
//     doctorId: {
//         type: "string",
//         pattern: objectIdPattern,
//         optional: true,
//         messages: {
//             string:        "آیدی دکتر باید متنی باشد",
//             stringPattern: "آیدی دکتر معتبر نیست",
//         }
//     },
//     date: {
//         type: "string",
//         pattern: /^\d{4}-\d{2}-\d{2}$/,
//         optional: true,
//         messages: {
//             string:        "تاریخ باید متنی باشد",
//             stringPattern: "فرمت تاریخ معتبر نیست — مثال: 2024-03-15",
//         }
//     },
//     timeStart: {
//         type: "string",
//         pattern: timePattern,
//         optional: true,
//         messages: {
//             string:        "ساعت شروع باید متنی باشد",
//             stringPattern: "فرمت ساعت شروع معتبر نیست — مثال: 09:00",
//         }
//     },
//     timeEnd: {
//         type: "string",
//         pattern: timePattern,
//         optional: true,
//         messages: {
//             string:        "ساعت پایان باید متنی باشد",
//             stringPattern: "فرمت ساعت پایان معتبر نیست — مثال: 09:30",
//         }
//     },
//     $$strict: true
// })