import {
  HomeIcon,
  UserIcon,
  BoltIcon,
  DocumentIcon,
  CurrencyRupeeIcon,
  ChartBarIcon,
  CircleStackIcon
} from "@heroicons/react/24/solid";
import {
  Home,
  CustomerMaster,
  MilkMaster,
  MilkSales,
  // MilkPurchases,
  ExpensesMaster,
  Reports
} from "@/pages/dashboard";
import MilkPurchases from "./pages/dashboard/milk-purchases";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "customer master",
        path: "/customer-master",
        element: <CustomerMaster />,
      },
      {
        icon: <ChartBarIcon {...icon} />,
        name: "Milk sales",
        path: "/milk-sales",
        element: <MilkSales />,
      },
      {
        icon: <CurrencyRupeeIcon {...icon} />,
        name: "Milk purchases",
        path: "/milk-purchases",
        element: <MilkPurchases />,
      },
      {
        icon: <CircleStackIcon {...icon} />,
        name: "Milk master",
        path: "/milk-master",
        element: <MilkMaster />,
      },
      {
        icon: <CurrencyDollarIcon {...icon} />,
        name: "Expenses",
        path: "/expenses",
        element: <ExpensesMaster/>,
      },
      {
        icon: <DocumentIcon {...icon} />,
        name: "Reports",
        path: "/reports",
        element: <Reports />,
      },
    ],
  }
];

export default routes;
