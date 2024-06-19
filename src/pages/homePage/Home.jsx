import { Outlet } from "react-router-dom";
import Header from "../../api/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Home;
