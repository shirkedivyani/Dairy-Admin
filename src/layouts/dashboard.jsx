import { Routes, Route } from "react-router-dom";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { Profile } from "@/pages/dashboard"
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
export function Dashboard() {
    const navigate = useNavigate();
    const [tempToken, setTempToken] = useState(localStorage.getItem("auth_token"));
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

    useEffect(() => {
        // * auto logout if already authenticated
        const fetchUser = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + tempToken,
                },
            };
            const response = await fetch("http://localhost:8000/api/users/me", requestOptions);
            if (!response.ok)  navigate('/auth/sign-in', { replace: true });
        };
        fetchUser();
    }, [tempToken]);

  return (
    // <div className="min-h-screen  bg-[url('https://www.wallpaperflare.com/static/810/635/711/liquid-milk-illustration-wallpaper.jpg')]">
    <div className="min-h-screen  bg-blue-gray-50/50">
    <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark"  ? "/img/logo-large.png" : "/img/logo-large.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <Routes>
          <Route exact path="/profile" element={<Profile />} />
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
