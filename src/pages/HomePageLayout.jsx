
import HomePageForm from "../components/forms/HomePageForm/HomePageForm";
import '../styles/layout.scss'; 


const HomePageLayout = () => {
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

export default HomePageLayout;
