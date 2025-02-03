import HomePageHeader from "../components/headers/HomePageHeader";
import HomePageFooter from "../components/footers/HomePageFooter";
import HomePageSidebar from "../components/sidebars/HomePageSidebar";
import HomePageForm from "../components/forms/HomePageForm";
import '../styles/layout.scss'; 


const AdminLayout = () => {
  return (
    <div className="layout">
      <HomePageHeader />
      <div className="body">
        <HomePageSidebar />
        <main className="content">
          <HomePageForm />
        </main>
      </div>
      <HomePageFooter />
    </div>
  );
};

export default AdminLayout;
