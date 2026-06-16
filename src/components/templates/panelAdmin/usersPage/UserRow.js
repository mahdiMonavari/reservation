import { FaBan, FaEdit, FaTrash } from "react-icons/fa";

const roleLabel = {
  DOCTOR: "پزشک",
  USER: "کاربر",
  ADMIN: "ادمین",
};

const roleStyle = {
  DOCTOR:
    "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  USER: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  ADMIN: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

function UserRow({ user, onEdit, onBan, onDelete }) {
  return (
    <tr className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2.5">
          <span className="text-base font-Morabba-Bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
            {user.firstName} {user.lastName}
          </span>
        </div>
      </td>

      <td className="px-4 py-3 hidden sm:table-cell">
        <div
          className="text-base font-Dana-Medium text-slate-700 dark:text-slate-300 text-center"
          dir="ltr"
        >
          {user.phoneNumber}
        </div>
      </td>

      <td className="px-4 py-3 hidden md:table-cell">
        <div className="flex justify-center">
          <span
            className={`text-sm font-Morabba-Bold px-2.5 py-1 rounded-lg ${roleStyle[user.role]}`}
          >
            {roleLabel[user.role]}
          </span>
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-1.5">
          <button
            onClick={() => onEdit(user._id)}
            title="ویرایش"
            className="w-8 h-8 rounded-lg flex items-center justify-center
              text-slate-400 hover:text-blue-600 dark:hover:text-blue-400
              hover:bg-blue-50 dark:hover:bg-blue-900/20
              border border-transparent hover:border-blue-200 dark:hover:border-blue-800
              transition-all duration-150 text-lg"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => onBan(user._id)}
            title="بن کردن"
            className="w-8 h-8 rounded-lg flex items-center justify-center
              text-slate-400 hover:text-amber-600 dark:hover:text-amber-400
              hover:bg-amber-50 dark:hover:bg-amber-900/20
              border border-transparent hover:border-amber-200 dark:hover:border-amber-800
              transition-all duration-150 text-lg"
          >
            <FaBan />
          </button>

          <button
            onClick={() => onDelete(user._id)}
            title="حذف"
            className="w-8 h-8 rounded-lg flex items-center justify-center
              text-slate-400 hover:text-red-500 dark:hover:text-red-400
              hover:bg-red-50 dark:hover:bg-red-900/20
              border border-transparent hover:border-red-200 dark:hover:border-red-800
              transition-all duration-150 text-lg"
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default UserRow;
