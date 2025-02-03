import CustomerHeader from "../components/headers/CustomerHeader";
import CustomerFooter from "../components/footers/CustomerFooter";
import CustomerSidebar from "../components/sidebars/CustomerSidebar";
import CustomerForm from "../components/forms/CustomerForm";
import '../styles/layout.scss'; 


const CustomerLayout = () => {
  return (
    <div className="layout">
      <CustomerHeader />
      <div className="body">
        <CustomerSidebar />
        <main className="content">
          <CustomerForm />
        </main>
      </div>
      <CustomerFooter />
    </div>
  );
};

export default CustomerLayout;
