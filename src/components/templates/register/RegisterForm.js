"use client";
import { useContext, useState } from "react";
import { FiPhone, FiUser, FiLock } from "react-icons/fi";
import registerSchema from "../../../../validators/frontend/register.validator";
import { errorToast } from "@/components/modules/toast/toast";
import LoadingOverlay from "@/components/modules/loading/LoadingOverlay";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const inputBase = `w-full rounded-xl py-3 pr-10 pl-4 text-base
  bg-emerald-50 dark:bg-white/5
  border border-emerald-200 dark:border-white/10
  text-emerald-900 dark:text-white
  placeholder:text-emerald-400 dark:placeholder:text-white/25
  focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-400/60
  focus:bg-white dark:focus:bg-white/10
  transition-all duration-200 text-right`;

const fields = [
  { name: "firstName", placeholder: "نام", icon: FiUser, type: "text" },
  { name: "lastName", placeholder: "نام خانوادگی", icon: FiUser, type: "text" },
  { name: "password", placeholder: "رمز عبور", icon: FiLock, type: "password" },
];

function RegisterForm({ phoneNumber }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });
  const createUserHandler = async () => {
    const result = registerSchema.safeParse({
      phoneNumber,
      firstName: form.firstName,
      lastName: form.lastName,
      password: form.password,
    });
    if (!result.success) {
      return errorToast(result.error.issues[0].message);
    }
    setLoading(true);
    try {
      const res = await fetch("api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          firstName: form.firstName,
          lastName: form.lastName,
          password: form.password,
        }),
      });
      if (res.status === 201) {
        router.push("/reservation");
        const { data } = await res.json();
        setUser({ ...data });
      } else if (res.status === 409) {
        errorToast("کاربر از قبل در سایت وجود دارد");
      } else if (res.status === 400) {
        errorToast("ورودی ها معتبر نمیباشد");
      }
    } catch (err) {
      errorToast("خطا سمت سرور");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <LoadingOverlay loading={loading} />
      <div className="space-y-4">
        <div className="relative">
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2
          text-emerald-400/50 dark:text-emerald-400/40 pointer-events-none"
          >
            <FiPhone size={17} />
          </span>
          <input
            value={phoneNumber}
            readOnly
            type="text"
            className={`${inputBase} opacity-55 cursor-not-allowed`}
            placeholder="شماره تماس"
            dir="rtl"
          />
        </div>

        {/* فیلدهای دیگر */}
        {fields.map(({ name, placeholder, icon: Icon, type }) => (
          <div key={name} className="relative">
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2
            text-emerald-400 dark:text-emerald-400/60 pointer-events-none"
            >
              <Icon size={17} />
            </span>
            <input
              value={form[name]}
              onChange={(e) =>
                setForm((p) => ({ ...p, [name]: e.target.value }))
              }
              type={type}
              placeholder={placeholder}
              className={inputBase}
              dir="rtl"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={createUserHandler}
          className="relative w-full py-3 rounded-xl font-Morabba-Bold text-base
          bg-emerald-500 hover:bg-emerald-600 text-white overflow-hidden
          transition-all duration-200
          hover:shadow-md hover:shadow-emerald-500/20
          active:scale-[0.98] group"
        >
          <span className="relative z-10">ثبت نام</span>
          <span
            className="absolute inset-0 bg-gradient-to-l
          from-white/0 via-white/10 to-white/0
          translate-x-full group-hover:translate-x-[-200%]
          transition-transform duration-700"
          />
        </button>
      </div>
    </>
  );
}

export default RegisterForm;
