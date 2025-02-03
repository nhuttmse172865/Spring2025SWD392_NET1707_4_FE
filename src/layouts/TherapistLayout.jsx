import TherapistHeader from "../components/headers/TherapistHeader";
import TherapistFooter from "../components/footers/TherapistFooter";
import TherapistSidebar from "../components/sidebars/TherapistSidebar";
import TherapistForm from "../components/forms/TherapistForm";
import '../styles/layout.scss'; 


const TherapistLayout = () => {
  return (
    <div className="layout">
      <TherapistHeader />
      <div className="body">
        <TherapistSidebar />
        <main className="content">
          <TherapistForm />
        </main>
      </div>
      <TherapistFooter />
    </div>
  );
};

export default TherapistLayout;
