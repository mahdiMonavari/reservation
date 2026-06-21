import { verifyAccessToken } from "@/utiles/auth/auth";
import { cookies } from "next/headers";
import React from "react";
import userModel from "../../../../../model/user";

async function page() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  const { phone } = verifyAccessToken(token);
  const date = await userModel.findOne({ phoneNumber: phone });
  //   const user =

  return <div></div>;
}

export default page;
