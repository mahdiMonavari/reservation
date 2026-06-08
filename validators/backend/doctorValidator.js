// validators/doctor.validator.js
import Validator from "fastest-validator";

const v = new Validator();

export const createDoctorValidator = v.compile({
    userId: {
        type: "string",
        pattern: /^[a-fA-F0-9]{24}$/,
        messages: {
            string:        "آیدی کاربر باید متنی باشد",
            stringPattern: "آیدی کاربر معتبر نیست",
            required:      "آیدی کاربر الزامی است",
        }
    },
    expertise: {
        type: "string",
        min: 3,
        max: 100,
        messages: {
            string:    "تخصص باید متنی باشد",
            stringMin: "تخصص باید حداقل ۳ کاراکتر باشد",
            stringMax: "تخصص نباید بیشتر از ۱۰۰ کاراکتر باشد",
            required:  "تخصص الزامی است",
        }
    },
    $$strict: true
})

export const updateDoctorValidator = v.compile({
    expertise: {
        type: "string",
        min: 3,
        max: 100,
        optional: true,
        messages: {
            string:    "تخصص باید متنی باشد",
            stringMin: "تخصص باید حداقل ۳ کاراکتر باشد",
            stringMax: "تخصص نباید بیشتر از ۱۰۰ کاراکتر باشد",
        }
    },
    $$strict: true
})