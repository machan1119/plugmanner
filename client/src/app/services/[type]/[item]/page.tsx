import ServiceArticle from "@/components/pages/Services/ServiceArticle/ServiceArticle";
import ServiceBuyFeature from "@/components/pages/Services/ServiceBuyFeature/ServiceBuyFeature";
import ServiceCustomerReview from "@/components/pages/Services/ServiceCustomerReview/ServiceCustomerReview";
import ServiceFeature from "@/components/pages/Services/ServiceFeature/ServiceFeature";
import ServiceHowToOrder from "@/components/pages/Services/ServiceHowToOrder/ServiceHowToOrder";
import ServiceInfo from "@/components/pages/Services/ServiceInfo/ServiceInfo";
import ServiceMethod from "@/components/pages/Services/ServiceMethod/ServiceMethod";
import ServicePowerUp from "@/components/pages/Services/ServicePowerUp/ServicePowerUp";
import ServiceQuestion from "@/components/pages/Services/ServiceQuestion/ServiceQuestion";
import ServiceReview from "@/components/pages/Services/ServiceReview/ServiceReview";
import ServiceState from "@/components/pages/Services/ServiceState/ServiceState";
import ServiceTip from "@/components/pages/Services/ServiceTip/ServiceTip";
import ServiceVideo from "@/components/pages/Services/ServiceVideo/ServiceVideo";
import { slugify_reverse } from "@/libs/functions";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ type: string; item: string }>;
}) {
  const type = slugify_reverse((await params).type);
  const item = slugify_reverse((await params).item);
  return (
    <div className="text-black text-clash">
      My Post: {type} {item}
      <ServiceInfo />
      <ServiceState />
      <ServiceReview />
      <ServiceHowToOrder />
      <ServicePowerUp />
      <ServiceVideo />
      <ServiceFeature />
      <ServiceBuyFeature />
      <ServiceTip />
      <ServiceMethod />
      <ServiceCustomerReview />
      <ServiceQuestion />
      <ServiceArticle />
    </div>
  );
}
