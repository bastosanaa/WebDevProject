import { useState } from "react";
import UserForm from "./UserForm";
import AddFriendForm from "./AddFriendForm";
import NotificationList from "./NotificationsList";

interface ProfileProps {
  onClose: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onClose }) => {
  const [editUserVisible, setEditUserVisible] = useState(false);
  const [addFriendVisible, setAddFriendVisible] = useState(false);
  return (
    <div className="relative text-start min-w-[380px] max-w-screen-md flex flex-col gap-6 p-8 rounded-2xl shadow bg-neutral-200">
      <h1 className="font-semibold text-3xl text-center">Perfil</h1>

      {!addFriendVisible && (
        <button onClick={() => setAddFriendVisible(true)} className="button">
          Adicionar amigo
        </button>
      )}
      {addFriendVisible && (
        <AddFriendForm onClose={() => setAddFriendVisible(false)} />
      )}

      {!editUserVisible && (
        <button onClick={() => setEditUserVisible(true)} className="button">
          Editar Cadastro
        </button>
      )}
      {editUserVisible && (
        <UserForm onClose={() => setEditUserVisible(false)} />
      )}

      <div className="flex flex-col gap-2 text-start">
        <h2 className="text-xl">Notificações:</h2>
        <NotificationList />
      </div>
      <button className="absolute top-0 right-0 p-4" onClick={onClose}>
        <b>X</b>
      </button>
    </div>
  );
};

export default Profile;
