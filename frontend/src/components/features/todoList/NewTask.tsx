import '../../pages/MainPage.css';
import React, { useEffect, useState } from "react";
import {createTask} from "../../../service/tasks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewTask: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        titulo: '',
        metaTempoChecked: false,
        metaTempo: '',
        dataTerminoChecked: false,
        dataTermino: '',
        emGrupoChecked: false,
        membros: [] as string[]
    });

    const handleCreateTask = async (e: React.FormEvent) => {
      e.preventDefault();
      try{
        await createTask({
          titulo: formData.titulo,
          meta_tempo: formData.metaTempo,
          data_termino: formData.dataTermino,
          membros: formData.membros,
        });
        navigate("/");
        toast.success('Tarefa criada com sucesso!');
      } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao criar a tarefa');
      };
    };

    const handleCheckboxChange = (field: string) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddMember = () => {
      const newMember = prompt("Digite o usuário do membro:");
      if (newMember) {
        setFormData(prevState => ({
          ...prevState,
          membros: [...prevState.membros, newMember]
        }));
      }
    };

    return (
      <form className="new-task flex flex-col gap-4 min-w-full p-4 rounded-2xl">
        <div className="flex flex-col gap-1">
          <label className="label">Título da Tarefa</label>
          <input type="text" value={formData.titulo} onChange={handleChange} className="input" name="titulo" required/>
        </div>
  
        <div className="flex flex-col gap-1">
          <label className="label">Deseja informar meta de tempo para conclusão?</label>
          <input type="checkbox" checked={formData.metaTempoChecked} onChange={() => handleCheckboxChange('metaTempoChecked')} />
        </div>

        {formData.metaTempoChecked && (
            <div className="flex flex-col gap-1">
                <label className='label'>Meta de conclusão:</label>
                <input type="text" value={formData.metaTempo} onChange={handleChange} className="input"/>
            </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="label">Deseja informar data de término?</label>
          <input type="checkbox" checked={formData.dataTerminoChecked} onChange={() => handleCheckboxChange('dataTerminoChecked')} />
        </div>

        {formData.dataTerminoChecked && (
            <div className="flex flex-col gap-1">
                <label className='label'>Data de término</label>
                <input type="date" value={formData.dataTermino} onChange={handleChange} className="input"/>
            </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="label">Tarefa será em grupo?</label>
          <input type="checkbox" checked={formData.emGrupoChecked} onChange={() => handleCheckboxChange('emGrupoChecked')} />
        </div>

        {formData.emGrupoChecked && (
            <div className="flex flex-col gap-1">
                <label className='label'>Membros:</label>
                <div className="flex flex-col gap-1">
                  <button type="button" onClick={handleAddMember} className='button'>Adicionar Membro</button>
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
    

export default NewTask;