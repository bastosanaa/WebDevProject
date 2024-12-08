import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { sendAddFriendReq } from "../../service/notifications";

interface AddFriendFormProps {
  onClose: () => void;
}
const AddFriendSide: React.FC<AddFriendFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await sendAddFriendReq(email);
      toast("Pedido de amizade enviado!");
      console.log("res", res);
      onClose();
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 m-2">
      <div className="flex flex-col gap-1">
        <label className="label">Email</label>
        <input
          type="email"
          placeholder=""
          className="input"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex gap-4 w-full">
        <button
          className="button !bg-rosa-escuro opacity-60 w-full"
          onClick={handleCancel}
        >
          Cancelar
        </button>
        <button type="submit" className="button w-full">
          Enviar
        </button>
      </div>
    </form>
  );
};

export default AddFriendSide;
