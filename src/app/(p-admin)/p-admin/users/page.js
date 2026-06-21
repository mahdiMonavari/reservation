import userModel from "../../../../../model/user";
import UsersPage from "@/components/templates/panelAdmin/usersPage/UsersPage";

async function Page({ searchParams }) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || "";
  const limit = 10;

  const query = search
    ? {
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { phoneNumber: { $regex: search } },
        ],
        role: "USER",
      }
    : { role: "USER" };
  const [users, total] = await Promise.all([
    userModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit),
    userModel.countDocuments(query),
  ]);
  const totalPages = Math.ceil(total / limit);

  return (
    <UsersPage
      total={total}
      initialUsers={JSON.parse(JSON.stringify(users))}
      totalPages={totalPages}
      currentPage={page}
      search={search}
    />
  );
}
export default Page;
