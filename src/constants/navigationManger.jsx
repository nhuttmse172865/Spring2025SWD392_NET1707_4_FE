import React from "react";
import Dashboard from "../pages/manager/dashboard/Dashboard";
import ICONS from "./icons";
import Category from "../pages/manager/services/category/Category";
import SkinType from "../pages/manager/services/skinType/SkinType";
import { IssueSkin } from "../pages/manager/services/issueSkin/IssueSkin";
import Services from "../pages/manager/services/services/Services";
import Customer from "../pages/manager/account/customer/Customer";
import Therapist from "../pages/manager/account/therapist/Therapist";
import Staff from "../pages/manager/account/staff/Staff";
import BusinessTime from "../pages/manager/schedule/businessTime/BusinessTime";
import WorkingTime from "../pages/manager/schedule/workingTime/WorkingTime";
import Appointment from "../pages/manager/appointment/Appointment";

const COMPONENTS = {
  DASHBOARD: <Dashboard />,
  SETTINGS: "Settings",
  SERVICES: <Services />,
  CATEGORY: <Category />,
  SKIN_TYPE: <SkinType />,
  ISSUE_SKIN: <IssueSkin />,
  CUSTOMER: <Customer />,
  THERAPIST: <Therapist />,
  STAFF: <Staff />,
  BUSINESS_TIME: <BusinessTime />,
  WORKING_TIME: <WorkingTime />,
  APPOINTMENT: <Appointment />
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
        component: COMPONENTS.APPOINTMENT,
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
        component: null,
        path: "menu-services",
      },
      {
        nameMenu: "Account",
        icon: ICONS.employee,
        iconActive: ICONS.employeeActive,
        sortNumber: 3,
        subItems: [
          {
            name: "Customer",
            component: COMPONENTS.CUSTOMER,
            path: "/",
          },
          {
            name: "Staff",
            component: COMPONENTS.STAFF,
            path: "/staff",
          },
          {
            name: "Therapist",
            component: COMPONENTS.THERAPIST,
            path: "/therapist",
          },
        ],
        component: "",
        path: "menu-account",
      },
      {
        nameMenu: "Schedule",
        icon: ICONS.schedule,
        iconActive: ICONS.scheduleActive,
        sortNumber: 4,
        subItems: [
          {
            name: "Business Time",
            component: COMPONENTS.BUSINESS_TIME,
            path: "/business-time",
          },
          {
            name: "Working Time",
            component:  COMPONENTS.WORKING_TIME,
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
