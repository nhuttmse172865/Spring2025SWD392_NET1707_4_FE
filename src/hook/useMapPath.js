import COMPONENT_PATH_HELPER from "../helpers/ComponentPathHelper";

const useMapPath = (currentPathName) => {
  let itemActivePathName = null;
  if (["/manager", "/manager/"].includes(currentPathName)) {
    itemActivePathName = COMPONENT_PATH_HELPER.listRouteNavigationManager[0];
    return itemActivePathName;
  }
  COMPONENT_PATH_HELPER.listRouteNavigationManager.forEach((item) => {
    if (currentPathName.includes(item.path)) {
      itemActivePathName = item;
      return;
    }
  });
  return itemActivePathName;
};
export default useMapPath;
