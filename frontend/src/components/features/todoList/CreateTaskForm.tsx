import "../../pages/MainPage.css";
import React, { useState } from "react";
import { createTask } from "../../../service/tasks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Task from "./Task";

interface TaskFormProps {
  onClose: () => void;
  user: {amigos: string[]};
}

// const initialTaskState: Task = {
//   titulo: "",
//   meta_tempo: "",
//   data_termino: "",
//   em_grupo: false,
//   membros: [] as string[],
// };

const TaskForm: React.FC<TaskFormProps> = ({ onClose, user }) => {
  const navigate = useNavigate();

  const [showDataTermino, setShowDataTermino] = useState(false);

  const [formData, setFormData] = useState({
    titulo: "",
    data_termino: "",
    em_grupo: false,
    membros: [] as string[],
  });

  const [newMember, setNewMember] = useState("");
  const [filteredFriends, setFilteredFriends] = useState<string[]>([]);

  const handleCreateTask = async (event?: React.FormEvent) => {
    event?.preventDefault();
    try {
      await createTask({
        titulo: formData.titulo,
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
    if (newMember && !formData.membros.includes(newMember)) {
      setFormData((prevState) => ({
        ...prevState,
        membros: [...prevState.membros, newMember],
      }));
      setNewMember('');
      setFilteredFriends([]);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewMember(value);
    if (value) {
      const filtered = user.amigos.filter((amigo) => 
      amigo.toLowerCase().includes(value.toLocaleLowerCase())
    );
    setFilteredFriends(filtered);
    } else {
      setFilteredFriends([]);
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
            <input 
              type="text"
              value={newMember}
              onChange={handleSearchChange}
              placeholder="Buscar amigo..."
              className="input" 
            />
            {filteredFriends.length > 0 && (
              <ul className="suggestions-list">
                {filteredFriends.map((amigo, index) => (
                  <li key={index} onClick={() => setNewMember(amigo)} className="suggestion-item">
                    {amigo}
                  </li>
                ))}
              </ul>
            )}
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
