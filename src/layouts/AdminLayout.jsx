import AdminHeader from "../components/headers/AdminHeader";
import AdminFooter from "../components/footers/AdminFooter";
import AdminSidebar from "../components/sidebars/AdminSidebar";
import AdminForms from "../components/forms/AdminForms";
import '../styles/layout.scss'; 


const AdminLayout = () => {
  return (
    <div className="layout">
      <AdminHeader />
      <div className="body">
        <AdminSidebar />
        <main className="content">
          <AdminForms />
        </main>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
