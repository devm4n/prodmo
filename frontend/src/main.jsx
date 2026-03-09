import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupCard from "./components/SignupCard.jsx";
import SigninCard from "./components/SigninCard.jsx";
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
        {/* <Route
          path="/signup"
          element={
            <div className="w-screen flex justify-center">
              <SignupCard />
            </div>
          }
        />
        <Route
          path="/signin"
          element={
            <div className="w-screen flex justify-center">
              <SigninCard />
            </div>
          }
        />*/}
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
);
