import { useState } from "react";
import UserForm from "./UserForm";

interface ProfileProps {
  onClose: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onClose }) => {
  const [editUserVisible, setEditUserVisible] = useState(false);
  return (
    <div className="relative w-full flex flex-col gap-4 max-w-lg p-12 rounded-2xl shadow bg-neutral-200">
      <h1>Hi</h1>
      {!editUserVisible && (
        <button onClick={() => setEditUserVisible(true)}>
          Editar Cadastro
        </button>
      )}
      {editUserVisible && (
        <UserForm onClose={() => setEditUserVisible(false)} />
      )}
      <button className="absolute top-0 right-0 p-4" onClick={onClose}>
        <b>X</b>
      </button>
    </div>
  );
};

export default Profile;
