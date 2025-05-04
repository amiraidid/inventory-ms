/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Login } from "../pages";
import { FaArrowLeft, FaUser, FaBolt, FaOpera, FaChartLine, FaDatabase, FaUserFriends, FaTh } from "react-icons/fa";


export const siderbars = [
  {
    link: "/",
    title: "Dashboard",
    icon: <FaChartLine />,
  },
  {
    link: "/products",
    title: "Products",
    icon: <FaBolt />,
  },
  {
    link: "/orders",
    title: "Orders",
    icon: <FaOpera />,
  },
  {
    link: "/suppliers",
    title: "Suppliers",
    icon: <FaTh />,
  },
  {
    link: "/customers",
    title: "Customers",
    icon: <FaUserFriends />,
  },
  {
    link: "/reports",
    title: "Reports",
    icon: <FaDatabase />,
  },
  {
    link: "/settings",
    title: "Settings",
    icon: <FaUser />,
  },
];

function Sidebar() {
  const [role, setRole] = useState("");
  const [showMenu, setShowMenu] = useState(true);
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    }
  }, [token]);

  const { user } = useContext(UserContext);

  return (
    <div
      className={`bg-slate-900 ${
        showMenu
          ? "w-56 translate-x-0 transition-all ease-in"
          : "w-10 px-0 transition-all translate-x-100 max-sm:w-8"
      }  h-screen`}
    >
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex float-end p-2 bg-slate-300 max-sm:hidden "
      >
        <FaArrowLeft className={`text-2xl `} />
      </button>
      <div className="mt-10">
        {
          user ? (
            <ul className="flex flex-col gap-5">
              {siderbars.map((item, index) => (
                <li key={index} className="hover:bg-slate-600">
                  <Link
                    to={item.link}
                    className="flex items-center gap-2 p-2 text-white hover:text-sky-50"
                  >
                    {item.icon}
                    {showMenu && <span>{item.title}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Login />
          )
        }
      </div>
    </div>
  );
}

export default Sidebar;


