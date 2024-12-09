import "../../pages/MainPage.css";
import React, { useEffect, useState } from "react";
import { updateTask } from "../../../service/tasks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createNotification } from "../../../service/notifications";
import { useAuth } from "../../../hooks/useAuth.tsx";

interface TaskFormProps {
  onClose: () => void;
  task: {
    _id: string;
    titulo: string;
    usuario_id: string;
    meta_tempo?: string;
    data_termino?: string;
    em_andamento: boolean;
    em_grupo?: boolean;
    membros?: { nome: string; email: string }[];
  };
}

interface Friend {
  nome: string;
  email: string;
}
// const initialTaskState: Task = {
//   titulo: "",
//   meta_tempo: "",
//   data_termino: "",
//   em_grupo: false,
//   membros: [] as string[],
// };

const EditTaskForm: React.FC<TaskFormProps> = ({ onClose, task }) => {
  const navigate = useNavigate();
  const [newMember, setNewMember] = useState<Friend | null>(null);
  const [filteredFriends, setFilteredFriends] = useState<Friend[]>([]);
  const auth = useAuth();

  const [formData, setFormData] = useState({
    titulo: task.titulo,
    data_termino: task.data_termino || '',
    em_grupo: task.em_grupo,
    membros: task.membros || [],
  });

  const handleEditTask = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await updateTask(task._id, {
        titulo: formData.titulo,
        data_termino: formData.data_termino || '',
        em_grupo: formData.em_grupo,
        membros: formData.membros || [],
      });
      toast.success("Tarefa editada com sucesso!");
      navigate("/");
      onClose();
    } catch (error) {
      console.error("Erro:", error);
      alert("Ocorreu um erro ao editar a tarefa");
    }
  };

  const handleCheckboxChange = (field: keyof typeof formData) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddMember = async () => {
    if (newMember && auth.user) {
      if (!formData.membros.find((membro) => membro.email === newMember.email)) {
        try {
          await createNotification({
            destinatarioEmail: newMember.email,
            mensagem: `${auth.user.nome} te convidou para participar de uma tarefa!`,
            tipo: 'convite_tarefa_grupo',
          });
          toast.success('Notificação enviada com sucesso!');
        } catch (err) {
          console.error("Erro ao criar notificação:", err);
          toast.error('Erro ao enviar notificação.');
        }
        setNewMember(null);
        setFilteredFriends([]);
      } else {
        toast.error('Esse membro já foi convidado')
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && auth.user && Array.isArray(auth.user.amigos)) {
      const filtered = auth.user.amigos.filter((amigo) => amigo.nome.toLowerCase().includes(value.toLocaleLowerCase()));
      setFilteredFriends(filtered);
    } else {
      setFilteredFriends([]);
    }
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setFormData({
        titulo: task.titulo,
        data_termino: formatDate(task.data_termino),
        em_grupo: task.em_grupo,
        membros: task.membros || [],
    });
  }, [task.titulo, task.data_termino, task.em_grupo, task.membros]);

  return (
    <form className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label className="label">Título da Tarefa</label>
        <input
          type="text"
          value={formData.titulo}
          onChange={handleChange}
          className="input"
          name="titulo"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="label">Data de término</label>
        <input
          type="date"
          value={formData.data_termino}
          onChange={handleChange}
          className="input"
          name="data_termino"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="label">Tarefa será em grupo?</label>
        <input
          type="checkbox"
          checked={formData.em_grupo}
          onChange={() => handleCheckboxChange("em_grupo")}
        />
      </div>

      {formData.em_grupo && (
        <div className="flex flex-col gap-1">
          <label className="label">Membros:</label>
          <div className="flex flex-col gap-1">
          <input 
              type="text"
              value={newMember?.nome || ''}
              onChange={handleSearchChange}
              placeholder="Buscar amigo..."
              className="input" 
            />
            {filteredFriends.length > 0 && (
              <ul className="suggestions-list">
                {filteredFriends.map((amigo, index) => (
                  <li key={index} onClick={() => setNewMember(amigo)} className="suggestion-item">
                    {amigo.nome}
                  </li>
                ))}
              </ul>
            )}
            <button type="button" onClick={handleAddMember} className="button">
              Adicionar Membro
            </button>
            <ul>
              {formData.membros.map((membro, index) => (
                <li key={index}>{membro.nome}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <button type="submit" className="button" onClick={handleEditTask}>
        Editar
      </button>
    </form>
  );
};

export default EditTaskForm;
