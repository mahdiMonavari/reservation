import connectionToDB from "@/utiles/DB/connection";
import { verifyAccessToken } from "@/utiles/auth/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import userModel from "../../../../../model/user";
import UserProfilePage from "@/components/templates/panelUser/profile/page";

async function page() {
  await connectionToDB();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { phone } = verifyAccessToken(token);
  const user = await userModel.findOne(
    { phoneNumber: phone },
    "firstName lastName phoneNumber"
  );
  if (!user) {
    redirect("/");
  }
  return <UserProfilePage info={JSON.parse(JSON.stringify(user))} />;
}

export default page;
