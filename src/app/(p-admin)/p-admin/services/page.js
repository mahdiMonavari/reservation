import ServicesPage from "@/components/templates/panelAdmin/servicesPage/ServicesPage";
import serviceModel from "../../../../../model/service";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/utiles/auth/auth";
import userModel from "../../../../../model/user";

async function Page() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  const { phone } = verifyAccessToken(token);
  const user = await userModel.findOne({ phoneNumber: phone });
  const services = await serviceModel.find({ doctorId: user._id });
  return (
    <ServicesPage initialServices={JSON.parse(JSON.stringify(services))} />
  );
}

export default Page;
