import { FaBan, FaEdit, FaTrash } from "react-icons/fa";

const roleLabel = {
  DOCTOR: "پزشک",
  USER: "کاربر",
  ADMIN: "ادمین",
};

const roleStyle = {
  doctor:
    "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  user: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  admin: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

function Avatar({ first, last }) {
  return (
    <div
      className="w-8 h-8 rounded-full shrink-0
        bg-violet-100 dark:bg-violet-900/30
        text-violet-700 dark:text-violet-400
        flex items-center justify-center
        text-xs font-bold"
    >
      {first[0]}
      {last[0]}
    </div>
  );
}

function UserRow({ user, onEdit, onBan, onDelete }) {
  return (
    <tr className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2.5">
          <Avatar first={user.firstName} last={user.lastName} />
          <span className="text-sm font-medium text-slate-800 dark:text-slate-100 whitespace-nowrap">
            {user.firstName} {user.lastName}
          </span>
        </div>
      </td>

      <td className="px-4 py-3 hidden sm:table-cell">
        <div
          className="text-sm text-slate-500 dark:text-slate-400 text-center"
          dir="ltr"
        >
          {user.phoneNumber}
        </div>
      </td>

      <td className="px-4 py-3 hidden md:table-cell">
        <div className="flex justify-center">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${roleStyle[user.role]}`}
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
              transition-all duration-150"
          >
            <FaEdit size={13} />
          </button>

          <button
            onClick={() => onBan(user._id)}
            title="بن کردن"
            className="w-8 h-8 rounded-lg flex items-center justify-center
              text-slate-400 hover:text-amber-600 dark:hover:text-amber-400
              hover:bg-amber-50 dark:hover:bg-amber-900/20
              border border-transparent hover:border-amber-200 dark:hover:border-amber-800
              transition-all duration-150"
          >
            <FaBan size={13} />
          </button>

          <button
            onClick={() => onDelete(user._id)}
            title="حذف"
            className="w-8 h-8 rounded-lg flex items-center justify-center
              text-slate-400 hover:text-red-500 dark:hover:text-red-400
              hover:bg-red-50 dark:hover:bg-red-900/20
              border border-transparent hover:border-red-200 dark:hover:border-red-800
              transition-all duration-150"
          >
            <FaTrash size={13} />
          </button>
        </div>
      </td>
    </tr>
  );
}
export default UserRow;
