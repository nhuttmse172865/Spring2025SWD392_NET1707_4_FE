
import { Outlet } from "react-router-dom";
import HomePageHeader from "../components/headers/HomepageHeader/HomePageHeader";
import '../styles/layout.scss'; 
import HomePageFooter from "../components/footers/HomePageFooter/HomePageFooter";


const MainLayout = () => {
  return (
  <>
    <HomePageHeader/>
    <main>
      <Outlet />
    </main>
    <HomePageFooter/>
  </>
  );
};

export default MainLayout;
