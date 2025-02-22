import ICONS from "./icons";
import ROLES from "./role";

const LIST_MENU_DROP_DOWN_HEADER = [
    {
        title: "Account",
        icon: ICONS.account,
        roles: [ROLES.CUSTOMER],
        path: "/customer-detail/account",
    },
    {
        title: "Appointments",
        icon: ICONS.appointment,
        roles: [ROLES.CUSTOMER],
        path: "/customer-detail/appointments",
    },
    {
        title: "Logout",
        icon: ICONS.logout,
        roles: [ROLES.CUSTOMER],
    },
]

export default LIST_MENU_DROP_DOWN_HEADER;