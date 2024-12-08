import "../pages/MainPage.css";
import "./SideBar.tsx";
import { useAuth } from "../../hooks/useAuth.tsx";
import { useNavigate } from "react-router-dom";
import React, {useState, useEffect} from "react";
import { getNotifications } from "../../service/notifications.ts";

interface NavBarProps {
  toggleSideBar: () => void;
  toggleUserInfo: () => void;
  onOpenProfile: () => void;
  isClicked: boolean;
  task: boolean;
  pomo: boolean;
}

const NavBar: React.FC<NavBarProps> = ({
  toggleSideBar,
  toggleUserInfo,
  onOpenProfile,
  isClicked,
  task,
  pomo,
}) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [hasNotifs, setHasNotifs] = useState(false);

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try{
        const notifications = await getNotifications()
        const pending = notifications.notificacoes.some(
          (notification: any) => notification.status === 'pendente'
        );
        setHasNotifs(pending);
      } catch (err) {
        console.error('Erro ao puxar notificações: ', err);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="object-none object-top">
      <div className="upper absolute inset-x-0 top-0 h-16 w-full">
        <div className="user-info">
          <div onClick={toggleUserInfo} className="absolute">
            <span id="username-wrapper" className="relative inline-block">
              <span id="username">
                {auth.user ? auth.user.nome : "Carregando..."}
              </span>
              {hasNotifs && (
                <span className="notification-dot"></span>
              )}
            </span>
          </div>
          <div
            id="menu"
            className={`mt-6 absolute flex flex-col gap-4 p-3 text-xl bg-branco rounded-xl transition-transform duration-300 ${
              isClicked ? "translate-y-10" : "hidden translate-y-0"
            }`}
          >
            <button className="hover:opacity-70" onClick={onOpenProfile}>
              Perfil
            </button>
            <button className="hover:opacity-70" onClick={handleLogout}>
              Deslogar
            </button>
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
