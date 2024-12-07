import "../../pages/MainPage.css";
import React, { useState } from "react";
import { createTask } from "../../../service/tasks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Task from "./Task";

interface TaskFormProps {
  onClose: () => void;
  editTask?: Task;
}

// const initialTaskState: Task = {
//   titulo: "",
//   meta_tempo: "",
//   data_termino: "",
//   em_grupo: false,
//   membros: [] as string[],
// };

const TaskForm: React.FC<TaskFormProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const [showMetaTempo, setShowMetaTempo] = useState(false);
  const [showDataTermino, setShowDataTermino] = useState(false);

  const [formData, setFormData] = useState({
    titulo: "",
    meta_tempo: "",
    data_termino: "",
    em_grupo: false,
    membros: [] as string[],
  });

  const handleCreateTask = async (event?: React.FormEvent) => {
    event?.preventDefault();
    try {
      await createTask({
        titulo: formData.titulo,
        meta_tempo: formData.meta_tempo,
        data_termino: formData.data_termino,
        membros: formData.membros,
      });
      toast.success("Tarefa criada com sucesso!");
      navigate("/");
      onClose();
    } catch (error) {
      console.error("Erro:", error);
      alert("Ocorreu um erro ao criar a tarefa");
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
        <label className="label">
          Deseja informar meta de tempo para conclusão?
        </label>
        <input
          type="checkbox"
          checked={showMetaTempo}
          onChange={() => setShowMetaTempo(!showMetaTempo)}
        />
      </div>

      {showMetaTempo && (
        <div className="flex flex-col gap-1">
          <label className="label">Meta de conclusão:</label>
          <input
            type="text"
            value={formData.meta_tempo}
            onChange={handleChange}
            className="input"
            name="metaTempo"
          />
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="label">Deseja informar data de término?</label>
        <input
          type="checkbox"
          checked={showDataTermino}
          onChange={() => setShowDataTermino(!showDataTermino)}
        />
      </div>

      {showDataTermino && (
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
      )}

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

      <button type="submit" className="button" onClick={handleCreateTask}>
        Criar
      </button>
    </form>
  );
};

export default TaskForm;
