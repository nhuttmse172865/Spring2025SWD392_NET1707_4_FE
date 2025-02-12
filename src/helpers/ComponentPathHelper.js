import NAVIGATION from "../constants/navigationManger";

let listRouteNavigationManager = [];
NAVIGATION.LIST_NAVIGATION_MANAGER.forEach((itemMenu, indexMenu) => {
  itemMenu.data.forEach((item, indexItem) => {
    if (item.subItems.length === 0) {
      listRouteNavigationManager.push({
        path: item.path,
        component: item.component,
        indexMenu: indexMenu,
        indexItem: indexItem,
        indexSubItem: 0,
        title: item.nameMenu
      });
    } else {
      item.subItems.forEach((subItem, indexSubItem) => {
        listRouteNavigationManager.push({
          path: item.path + subItem.path,
          component: subItem.component,
          indexMenu: indexMenu,
          indexItem: indexItem,
          indexSubItem: indexSubItem,
          title: subItem.name
        });
      });
    }
  });
});

const COMPONENT_PATH_HELPER = {
  listRouteNavigationManager,
};

export default COMPONENT_PATH_HELPER;
