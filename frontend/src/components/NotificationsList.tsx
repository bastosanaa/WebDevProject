import { useEffect, useState } from "react";
import {
  getNotifications,
  Notification,
  updateStatus,
} from "../service/notifications";
import { toast } from "react-toastify";

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const friendRequests = notifications.filter(
    (n) => n.tipo === "convite_amizade" && n.status === "pendente"
  );
  const groupInvites = notifications.filter(
    (n) => n.tipo === "convite_tarefa_grupo" && n.status === "pendente"
  );

  useEffect(() => {
    const fetchNotificaitons = async () => {
      const res = await getNotifications();
      setNotifications(res.notificacoes);
    };
    fetchNotificaitons();
  }, []);

  const handleAddFriend = (n: Notification) => {
    updateStatus(n._id, "aceito");
    setNotifications(
      notifications.filter((notification) => n._id !== notification._id)
    );
    toast("Aceito!!");
  };

  return (
    <div className="flex flex-col text-start gap-2">
      {friendRequests.length > 0 && (
        <>
          <h3 className="text-xl">Pedidos de amizade:</h3>
          <ul className="flex flex-col gap-2">
            {friendRequests.map((n) => (
              <li className="flex gap-1 items-center" key={n._id}>
                Pedido de amizade de
                <span className="font-semibold">{n.remetente.nome}</span>
                <button
                  className="button ml-3"
                  onClick={() => handleAddFriend(n)}
                >
                  Aceitar
                </button>
                <button className="button">Recusar</button>
              </li>
            ))}
          </ul>
        </>
      )}
      {groupInvites.length > 0 && (
        <>
          <h3 className="text-xl">Convites tarefa grupo:</h3>
          <ul className="flex flex-col gap-2">
            {groupInvites.map((n) => (
              <li className="flex gap-1 items-center" key={n._id}>
                Convite tarefa grupo de{" "}
                <span className="font-semibold">{n.remetente.nome}</span>
                <button className="button ml-3">Aceitar</button>
                <button className="button">Recusar</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default NotificationList;
