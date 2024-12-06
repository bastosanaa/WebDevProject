import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import LoginPage from "./components/pages/LoginPage";
import { ToastContainer } from "react-toastify";
import ProfilePage from "./components/pages/ProfilePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
