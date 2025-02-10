import { CardSummary } from "./components/CardSummary";
import { UsersRound, Waypoints, BookOpenCheck } from "lucide-react"; 
import { LastCustomers } from "./components/LastCustomers";
import { SalesDistributors } from "./components/SalesDistributors";
import { TotalSubscribers } from "./components/TotalSubcribers";

const dataCardSummary = [
  {
    icon: UsersRound,
    total: "12.450",
    average: 15,
    title: "Companies Created",
    tooltipText: "See all companies created",
    description: "Companies created in the last 30 days"
  },
  {
    icon: Waypoints,
    total: "86.5%",
    average: 80,
    title: "Total Revenue",
    tooltipText: "See all summary",
    description: "Total revenue in the last 30 days"
  },
  {
    icon: BookOpenCheck,
    total: "363.95€",
    average: 30,
    title: "Bounce Rate",
    tooltipText: "See all bounce rate",
    description: "Bounce rate in the last 30 days"
  }
];

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl mb-5 font-semibold">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20">
        {dataCardSummary.map(({ icon, total, average, title, tooltipText, description }) => (
          <CardSummary 
            key={title} 
            icon={icon} 
            total={total} 
            average={average} 
            title={title} 
            tooltipText={tooltipText} 
            description={description} 
          />
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 md:gap-x-10 mt-12"> 
          <LastCustomers />
          <SalesDistributors/>
      </div>
      <div className="flex-col xl:flex xl:flex-row gap-y-4 md:gap-y-0 mt-12 md:mb-10 justify-center">
          <TotalSubscribers/>
          <p>List Integrations</p>
      </div>
    </div>
  );
}

