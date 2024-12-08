import "../../pages/MainPage.css";
import React, { useEffect, useState } from "react";
import { updateTask } from "../../../service/tasks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Task from "./Task";
import EditTask from "./EditTask";

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
    membros?: string[];
  };
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

  const [formData, setFormData] = useState({
    titulo: task.titulo,
    data_termino: task.data_termino || '',
    em_grupo: task.em_grupo,
    membros: task.membros || [],
  });

  const handleEditTask = async (event?: React.FormEvent) => {
    event?.preventDefault();
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

  const handleAddMember = () => {
    const newMember = prompt("Digite o usuário do membro:");
    if (newMember) {
      setFormData((prevState) => ({
        ...prevState,
        membros: [...prevState.membros, newMember],
      }));
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
  }, [task]);

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
            <button type="button" onClick={handleAddMember} className="button">
              Adicionar Membro
            </button>
            <ul>
              {formData.membros.map((membro, index) => (
                <li key={index}>{membro}</li>
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
