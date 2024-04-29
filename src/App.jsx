import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SingupPage from "./Pages/SingupPage";
import QuizeBox from "./Pages/QuizeBox";
import Profile from "./Pages/ProfilePage";
import ResultPage from "./Pages/ResultPage";
import Dashboard from "./Admin/Dashboard/Dasboard";
import AdminLogin from "./Admin/AdminLogin/AdminLogin";
import ProtectedRoute from "./Routes/ProtectedRoute";
import ProtectedAdmin from "./Routes/ProtectedAdmin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SingupPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <QuizeBox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <ResultPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login-admin" element={<AdminLogin />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedAdmin>
              <Dashboard />
            </ProtectedAdmin>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
