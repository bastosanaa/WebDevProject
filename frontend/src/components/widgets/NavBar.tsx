import "../pages/MainPage.css";
import "./SideBar.tsx";
import { BsBellFill } from "react-icons/bs";
import logo from "../../assets/logo.png";
import { useAuth } from "../../hooks/useAuth.tsx";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  toggleSideBar: () => void;
  toggleUserInfo: () => void;
  isClicked: boolean;
}

const NavBar: React.FC<NavBarProps> = ({
  toggleSideBar,
  toggleUserInfo,
  isClicked,
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="object-none object-top">
      <div className="upper absolute inset-x-0 top-0 h-16 w-full">
        <div className="user-info">
          <div onClick={toggleUserInfo}>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
            <span id="username">nome_nome</span>
          </div>
          <div
            id="menu"
            className={`mt-6 absolute bg-branco transition-transform duration-300 ${
              isClicked
                ? "opacity-100 translate-y-full"
                : " opacity-0 translate-y-0"
            }`}
          >
            <button onClick={handleLogout}>Sign Out</button>
          </div>
        </div>
        <div className="task-pomo block space-x-10">
          <h1 className="inline"><b>Tarefas</b></h1>
          <h1 className="inline"><b>Pomo</b></h1>
        </div>
        <button onClick={toggleSideBar} className="p-5 top-0 right-0" id="hamb">
          <div className="flex flex-col items-center">
            <span className="block w-6 h-1 bg-rosa-escuro mb-1"></span>
            <span className="block w-6 h-1 bg-rosa-escuro mb-1"></span>
            <span className="block w-6 h-1 bg-rosa-escuro"></span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
