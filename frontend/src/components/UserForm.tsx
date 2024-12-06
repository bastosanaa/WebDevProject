import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { User } from "../contexts/AuthContext";
import { updateUser } from "../service/users";
import { toast } from "react-toastify";

interface UserFormProps {
  onClose: () => void;
}
const UserForm: React.FC<UserFormProps> = ({ onClose }) => {
  const auth = useAuth();
  const [userEdit, setUserEdit] = useState<User>(auth.user || ({} as User));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser(userEdit);
      auth.login(res.token);
      toast("Atualizado com sucesso!");
      console.log("res", res);
      onClose();
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-w-96">
      <div className="flex flex-col gap-1">
        <label className="label">Email</label>
        <input
          type="email"
          placeholder=""
          className="input"
          required
          value={userEdit.email}
          onChange={(e) =>
            setUserEdit((currentUser) => ({
              ...currentUser,
              email: e.target.value,
            }))
          }
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="label">Nome</label>
        <input
          type="text"
          placeholder=""
          className="input"
          required
          value={userEdit.nome}
          onChange={(e) =>
            setUserEdit((currentUser) => ({
              ...currentUser,
              nome: e.target.value,
            }))
          }
        />
      </div>

      <button type="submit" className="button mt-8">
        Save
      </button>
    </form>
  );
};

export default UserForm;
