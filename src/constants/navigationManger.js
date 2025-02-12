import ICONS from "./icons";

const COMPONENTS = {
  DASHBOARD: "Dasboard",
  SETTINGS: "Settings",
  SERVICES: "Services",
};

const LIST_NAVIGATION_MANAGER = [
  {
    title: "MENU",
    data: [
      {
        nameMenu: "Dashboard",
        icon: ICONS.dashboard,
        iconActive: ICONS.dashboardActive,
        sortNumber: 0,
        subItems: [],
        component: COMPONENTS.DASHBOARD,
        path: "menu-dashboard",
      },
      {
        nameMenu: "Appointment",
        icon: ICONS.appointment,
        iconActive: ICONS.appointmentActive,
        sortNumber: 1,
        subItems: [],
        component: "",
        path: "menu-schedule",
      },
      {
        nameMenu: "Services",
        icon: ICONS.services,
        iconActive: ICONS.servicesActive,
        sortNumber: 2,
        subItems: [
          {
            name: "Services",
            component: "",
            path: "/",
          },
          {
            name: "Category",
            component: "",
            path: "/category",
          },
          {
            name: "Skin Type",
            component: "",
            path: "/skin-type",
          },
          {
            name: "Issue Skin",
            component: "",
            path: "/issue-skin",
          },
        ],
        component: COMPONENTS.SERVICES,
        path: "menu-services",
      },
      {
        nameMenu: "Employee",
        icon: ICONS.employee,
        iconActive: ICONS.employeeActive,
        sortNumber: 3,
        subItems: [
          {
            name: "Staff",
            component: "",
            path: "/staff",
          },
          {
            name: "Therapist",
            component: "",
            path: "/therapist",
          },
        ],
        component: "",
        path: "menu-employee",
      },
      {
        nameMenu: "Schedule",
        icon: ICONS.schedule,
        iconActive: ICONS.scheduleActive,
        sortNumber: 4,
        subItems: [
          {
            name: "Business Time",
            component: "",
            path: "/business-time",
          },
          {
            name: "Working Time",
            component: "",
            path: "/working-time",
          },
        ],
        component: "",
        path: "menu-schedule",
      },
      
    ].sort((a, b) => a.sortNumber - b.sortNumber),
    sortNumber: 0,
  },
  {
    title: "SETTINGS",
    data: [
      {
        nameMenu: "Settings",
        icon: ICONS.setting,
        iconActive: ICONS.settingActive,
        sortNumber: 1,
        subItems: [],
        component: COMPONENTS.SETTINGS,
        path: "settings",
      },
    ].sort((a, b) => a.sortNumber - b.sortNumber),
    sortNumber: 1,
  },
].sort((a, b) => a.sortNumber - b.sortNumber);

const NAVIGATION = {
  LIST_NAVIGATION_MANAGER: LIST_NAVIGATION_MANAGER,
  COMPONENTS: COMPONENTS,
};

export default NAVIGATION;
