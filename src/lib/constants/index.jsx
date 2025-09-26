import { HiOutlineViewGrid, HiUser } from "react-icons/hi";
import { MdFlight, MdOutlineStar } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "users",
    label: "Users",
    path: "/users",
    icon: <HiUser />,
  },
  {
    key: "subscriptions-parent",
    label: "Subscriptions",
    icon: <RiMoneyDollarCircleLine />,
    subLinks: [
      {
        key: "plans",
        label: "Subscription Plans",
        path: "/plans",
        icon: <RiMoneyDollarCircleLine />,
      },
      {
        key: "subscriptions",
        label: "All Subscriptions",
        path: "/subscriptions",
        icon: <MdOutlineStar />,
      },
    ],
  },
];


export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  // {
  //   key: "settings",
  //   label: "Settings",
  //   path: "/dashsetting",
  //   icon: <HiOutlineCog />,
  // },
];
