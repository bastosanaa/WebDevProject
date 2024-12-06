import "../pages/MainPage.css";
import "./SideBar.tsx";
import { useAuth } from "../../hooks/useAuth.tsx";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getUser } from "../../service/users";

interface NavBarProps {
  toggleSideBar: () => void;
  toggleUserInfo: () => void;
  isClicked: boolean;
  task: boolean;
  pomo: boolean;
}

interface User {
  _id: string;
  nome: string;
  email: string;
}

const NavBar: React.FC<NavBarProps> = ({
  toggleSideBar,
  toggleUserInfo,
  isClicked,
  task,
  pomo,
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getLoggedUser = async () => {
    try {
      const response = await getUser();
      setUser(response);
    } catch (err) {
      console.log("Erro ao puxar usuário:", user);
    }
  };

  useEffect(() => {
    getLoggedUser();
  }, []);

  return (
    <div className="object-none object-top">
      <div className="upper absolute inset-x-0 top-0 h-16 w-full">
        <div className="user-info">
          <div onClick={toggleUserInfo}>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
            <span id="username">{user ? user.nome : "Carregando..."}</span>
          </div>
          <div
            id="menu"
            className={`mt-6 absolute flex flex-col gap-4 bg-branco transition-transform duration-300 ${
              isClicked ? "translate-y-10" : "hidden translate-y-0"
            }`}
          >
            <button onClick={() => navigate("/perfil")}>Perfil</button>
            <button onClick={handleLogout}>Sign Out</button>
          </div>
        </div>
        <div className="task-pomo block space-x-10">
          <h1
            className={`inline ${
              task ? "bg-rosa-escuro text-rosa-claro p-1 rounded-lg" : ""
            }`}
          >
            <b>Tarefas</b>
          </h1>
          <h1
            className={`inline ${
              pomo ? "bg-rosa-escuro text-rosa-claro p-1 rounded-lg" : ""
            }`}
          >
            <b>Pomo</b>
          </h1>
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
