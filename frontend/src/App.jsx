import { useContext } from "react";
import SigninCard from "./components/SigninCard";
import { AuthContext } from "./contexts/AuthContext";
import { NavMenu } from "./components/NavMenu";
import DashBoard from "./components/DashBoard";
import { Navigate, Route, Routes } from "react-router-dom";
import SignupCard from "./components/SignupCard";
import AdminPanel from "./components/AdminPanel";

function App() {
  const { isAuthenticated, isAdmin, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return (
    <Routes>
      <Route
        path="/signin"
        element={
          <div className="flex w-screen h-screen justify-center items-center">
            <SigninCard />
          </div>
        }
      />
      <Route
        path="/signup"
        element={
          <div className="flex w-screen h-screen justify-center items-center">
            <SignupCard />
          </div>
        }
      />
      <Route
        path="/"
        element={
          isAuthenticated() ? (
            <div className="h-screen flex flex-col">
              <NavMenu />
              <div className="flex w-screen flex-1 justify-center pt-8">
                <DashBoard />
              </div>
            </div>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
      <Route
        path="/admin"
        element={
          isAdmin() ? (
            <div className="w-screen flex justify-center">
              <AdminPanel />
            </div>
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

export default App;
