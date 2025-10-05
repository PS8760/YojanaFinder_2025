import Navbar from "./components/Navbar/Navbar";
import MainBody from "./MainBody";
import Footer from "./components/Footer/Footer";

const Home = () => {
  return (
    <div className="h-screen w-screen bg-amber-50">
      <Navbar />
      <MainBody />
      <Footer />
    </div>
  );
};

export default Home;
