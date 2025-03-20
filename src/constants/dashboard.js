import ICONS from "./icons";

const ANALYSIS_ITEM = [
  {
    title: "Transactions",
    icon: ICONS.transactions,
    path: "transactions",
  },
  {
    title: "Customer",
    icon: ICONS.employeeActive,
    path: "customer",
  },
  {
    title: "Revenue",
    icon: ICONS.revenue,
    path: "revenue",
  },
];

const LIST_TITLE_POPULAR_SERVICES = [
  {
    name: "No.",
    column: 1.5,
  },
  {
    name: "Services",
    column: 6,
  },
  {
    name: "Uses",
    column:2,
  },
  {
    name: "Price",
    column: 2.5,
  },
];

const LIST_TITLE_TRANSACTIONS = [
  {
    name: "No.",
    column: 1,
  },
  {
    name: "Customer",
    column: 3.2,
  },
  {
    name: "Service",
    column: 3.3,
  },

  {
    name: "Date",
    column: 2,
  },
  {
    name: "Price",
    column: 1,
  },

  {
    name: "Status",
    column: 1.5,
  },
];

const LIST_MONTH = Array.from({ length: 31 }, (_, i) => i + 1);

const LIST_YEAR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const STATUS_CHART = {
  WEEKLY: {
    name: "Weekly",
    path: "by-week",
    subName: "week",
  },
  MONTHLY: {
    name: "Monthly",
    path: "by-month",
    subName: "month",
  },
  YEARLY: {
    name: "Yearly",
    path: "by-year",
    subName: "year",
  },
};

const DASHBOARD = {
  ANALYSIS_ITEM,
  LIST_TITLE_POPULAR_SERVICES,
  LIST_TITLE_TRANSACTIONS,
  LIST_MONTH,
  LIST_YEAR,
  STATUS_CHART,
};

export default DASHBOARD;
