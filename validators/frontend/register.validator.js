import { z } from "zod";

const registerSchema = z.object({
  firstName: z
    .string()
    .min(3, "نام باید حداقل 3 کاراکتر باشد")
    .max(50, "نام نباید بیشتر از ۵۰ کاراکتر باشد"),

  lastName: z
    .string()
    .min(3, "نام خانوادگی باید حداقل 3 کاراکتر باشد")
    .max(50, "نام خانوادگی نباید بیشتر از ۵۰ کاراکتر باشد"),

  phoneNumber: z.string().regex(/^09[0-9]{9}$/, "شماره موبایل معتبر نیست"),

  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});

export default registerSchema;
