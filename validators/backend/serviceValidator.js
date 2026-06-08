// validators/service.validator.js
import Validator from "fastest-validator";

const v = new Validator();

export const createServiceValidator = v.compile({
    title: {
        type: "string",
        min: 3,
        max: 100,
        messages: {
            string:    "عنوان سرویس باید متنی باشد",
            stringMin: "عنوان سرویس باید حداقل ۳ کاراکتر باشد",
            stringMax: "عنوان سرویس نباید بیشتر از ۱۰۰ کاراکتر باشد",
            required:  "عنوان سرویس الزامی است",
        }
    },
    doctorId: {
        type: "string",
        pattern: /^[a-fA-F0-9]{24}$/,
        messages: {
            string:        "آیدی دکتر باید متنی باشد",
            stringPattern: "آیدی دکتر معتبر نیست",
            required:      "آیدی دکتر الزامی است",
        }
    },
    price: {
        type: "number",
        min: 0,
        messages: {
            number:    "قیمت باید عدد باشد",
            numberMin: "قیمت نباید منفی باشد",
            required:  "قیمت الزامی است",
        }
    },
    amountTime: {
        type: "number",
        min: 5,
        max: 480,
        messages: {
            number:    "مدت زمان باید عدد باشد",
            numberMin: "مدت زمان باید حداقل ۵ دقیقه باشد",
            numberMax: "مدت زمان نباید بیشتر از ۴۸۰ دقیقه باشد",
            required:  "مدت زمان الزامی است",
        }
    },
    $$strict: true
})

export const updateServiceValidator = v.compile({
    title: {
        type: "string",
        min: 3,
        max: 100,
        optional: true,
        messages: {
            string:    "عنوان سرویس باید متنی باشد",
            stringMin: "عنوان سرویس باید حداقل ۳ کاراکتر باشد",
            stringMax: "عنوان سرویس نباید بیشتر از ۱۰۰ کاراکتر باشد",
        }
    },
    price: {
        type: "number",
        min: 0,
        optional: true,
        messages: {
            number:    "قیمت باید عدد باشد",
            numberMin: "قیمت نباید منفی باشد",
        }
    },
    amountTime: {
        type: "number",
        min: 5,
        max: 480,
        optional: true,
        messages: {
            number:    "مدت زمان باید عدد باشد",
            numberMin: "مدت زمان باید حداقل ۵ دقیقه باشد",
            numberMax: "مدت زمان نباید بیشتر از ۴۸۰ دقیقه باشد",
        }
    },
    $$strict: true
})