import StaffHeader from "../components/headers/StaffHeader";
import StaffFooter from "../components/footers/StaffFooter";
import StaffSidebar from "../components/sidebars/StaffSidebar";
import StaffForm from "../components/forms/StaffForm";
import '../styles/layout.scss'; 


const StaffLayout = () => {
  return (
    <div className="layout">
      <StaffHeader />
      <div className="body">
        <StaffSidebar />
        <main className="content">
          <StaffForm />
        </main>
      </div>
      <StaffFooter />
    </div>
  );
};

export default StaffLayout;
