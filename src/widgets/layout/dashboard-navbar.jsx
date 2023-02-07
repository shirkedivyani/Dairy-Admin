import {useLocation, Link, useNavigate} from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  Bars3Icon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import {useState, useContext} from "react";
import { UserContext } from "../../context/UserContext";

export function DashboardNavbar() {
  const navigate = useNavigate();
  const [token, setToken] = useContext(UserContext);
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  const logout = () => {
    setToken(null);
    localStorage.removeItem("auth_token");
    navigate('/auth/sign-in', { replace: true });
  }

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}/home`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          {/* <Typography variant="h6" color="blue-gray">
            {page}
          </Typography> */}
        </div>
        <div className="flex items-center">
          <div className="animate-pulse mr-auto md:mr-4 md:w-56 shadow-2xl shadow-transparent">
            <Input label="Type here " />
          </div>
          <IconButton
              variant="text"
              color="blue-gray"
              onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <div>
                  <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-1 font-normal"
                  >
                    <strong>1 new buffalo account added</strong>
                  </Typography>
                  <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div>
                  <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-1 font-normal"
                  >
                    <strong>Paid bill of 2 customer</strong>
                  </Typography>
                  <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 15 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div>
                  <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-1 font-normal"
                  >
                    <strong>10 lit cow milk added</strong>
                  </Typography>
                  <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 20 minutes ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
          <Link to="/dashboard/profile">
            <Button
                variant="text"
                color="blue-gray"
                className="hidden items-center gap-1 px-4 xl:flex"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </Button>
            <IconButton
                variant="text"
                color="blue-gray"
                className="grid xl:hidden"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          </Link>
          <IconButton
              variant="text"
              color="blue-gray"
              className="grid"
              onClick={() => logout()}
          >
            <ArrowRightOnRectangleIcon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>

          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>

        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
