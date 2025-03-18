const ANALYSIS_ITEM = [
  {
    title: "Transactions",
  },
  {
    title: "Customer",
  },
  {
    title: "Revenue",
  },
];

const LIST_TITLE_POPULAR_SERVICES = [
  {
    name: "No.",
    column: 1.5,
  },
  {
    name: "Services",
    column: 5,
  },
  {
    name: "Number Uses",
    column: 3,
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
    column: 1.5,
  },

  {
    name: "Status",
    column: 1,
  },
];

const  LIST_MONTH = Array.from({ length: 31 }, (_, i) => i + 1);

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

const STATUS_CHART = { WEEKLY: "Weekly", MONTHLY: "Monthly", YEARLY: "Yearly" };

const DASHBOARD = {
  ANALYSIS_ITEM,
  LIST_TITLE_POPULAR_SERVICES,
  LIST_TITLE_TRANSACTIONS,
  LIST_MONTH,
  LIST_YEAR,
  STATUS_CHART,
};

export default DASHBOARD;
