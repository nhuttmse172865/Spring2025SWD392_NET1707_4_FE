import ManagerHeader from "../components/headers/ManagerHeader";
import ManagerFooter from "../components/footers/ManagerFooter";
import ManagerSidebar from "../components/sidebars/ManagerSidebar";
import ManagerForm from "../components/forms/ManagerForm";
import '../styles/layout.scss'; 


const ManagerLayout = () => {
  return (
    <div className="layout">
      <ManagerHeader />
      <div className="body">
        <ManagerSidebar />
        <main className="content">
          <ManagerForm />
        </main>
      </div>
      <ManagerFooter />
    </div>
  );
};

export default ManagerLayout;
