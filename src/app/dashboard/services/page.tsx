import { getServices } from "@/actions/service";
import ServicesClient from "@/components/dashboard/ServicesClient";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <ServicesClient initialServices={services} />
  );
}
