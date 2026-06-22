import UserRow from "./UserRow";

function UsersTable({ users = [], onEdit, onToggleActive, onDelete }) {
  return (
    <div
      className="rounded-2xl border border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900 overflow-hidden"
    >
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <th className="px-4 py-3 text-center text-sm font-Morabba-Bold text-slate-500 dark:text-slate-400">
              کاربر
            </th>
            <th className="px-4 py-3 text-center text-sm font-Morabba-Bold text-slate-500 dark:text-slate-400 hidden sm:table-cell">
              شماره
            </th>
            <th className="px-4 py-3 text-center text-sm font-Morabba-Bold text-slate-500 dark:text-slate-400 hidden md:table-cell">
              نقش
            </th>
            {users[0].role === "DOCTOR" ? (
              <th className="px-4 py-3 text-center text-sm font-Morabba-Bold text-slate-500 dark:text-slate-400 hidden md:table-cell">
                وضعیت
              </th>
            ) : (
              ""
            )}
            <th className="px-4 py-3 text-center text-sm font-Morabba-Bold text-slate-500 dark:text-slate-400">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user._id}
              user={user}
              onEdit={onEdit}
              onToggleActive={onToggleActive}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
