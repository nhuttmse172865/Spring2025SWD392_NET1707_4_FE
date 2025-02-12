import React from "react";
import Dashboard from "../pages/manager/dashboard/Dashboard";
import ICONS from "./icons";
import Category from "../pages/manager/services/category/Category";
import SkinType from "../pages/manager/services/skinType/SkinType";
import { IssueSkin } from "../pages/manager/services/issueSkin/IssueSkin";

const COMPONENTS = {
  DASHBOARD: <Dashboard />,
  SETTINGS: "Settings",
  SERVICES: "Services",
  CATEGORY: <Category />,
  SKIN_TYPE: <SkinType />,
  ISSUE_SKIN: <IssueSkin />
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
        component: null,
        path: "menu-appointment",
      },
      {
        nameMenu: "Services",
        icon: ICONS.services,
        iconActive: ICONS.servicesActive,
        sortNumber: 2,
        subItems: [
          {
            name: "Services",
            component: COMPONENTS.SERVICES,
            path: "/",
          },
          {
            name: "Category",
            component: COMPONENTS.CATEGORY,
            path: "/category",
          },
          {
            name: "Skin Type",
            component: COMPONENTS.SKIN_TYPE,
            path: "/skin-type",
          },
          {
            name: "Issue Skin",
            component: COMPONENTS.ISSUE_SKIN,
            path: "/issue-skin",
          },
        ],
        component:null,
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
