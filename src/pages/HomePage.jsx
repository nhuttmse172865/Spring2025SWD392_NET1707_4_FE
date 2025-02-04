
import HomePageForm from "../components/forms/HomePageForm/HomePageForm";
import '../styles/layout.scss'; 


const AdminLayout = () => {
  return (
    <div className="layout">
      <div className="body">
        <main className="content">
          <HomePageForm />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
