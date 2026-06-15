import React from "react";
import userModel from "../../../../../model/user";
import connectionToDB from "@/utiles/DB/connection";

async function page() {
  connectionToDB();
  const users = await userModel.find({});
  return <div>page</div>;
}

export default page;
