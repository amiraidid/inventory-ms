import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AllRoutes from "./routes/AllRoutes";
import { Login } from "./pages";
import { UserContext } from "./context/UserContext";
import Loader from "./components/Loader";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setUser(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {user ? (
        <div className="max-w-7xl app mx-auto app my-2 min-h-screen overflow-x-hidden bg-gray-100 p-3 rounded-md">
          <Header />
          <div className="flex ">
            <Sidebar />
            <AllRoutes />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <Login />
        </div>
      )}
    </UserContext.Provider>
  );
}

export default App;
