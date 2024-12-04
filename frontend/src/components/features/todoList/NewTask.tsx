import '../../pages/MainPage.css';
import React, { useEffect, useState } from "react";
import {createTask} from "../../../service/tasks";
import {getUser} from "../../../service/users";

interface NewTaskProps {
    onClose: () => void;
}

const NewTask: React.FC<NewTaskProps> = ({onClose}) => {
    const [formData, setFormData] = useState({
        titulo: '',
        metaTempoChecked: false,
        metaTempo: '',
        dataTerminoChecked: false,
        dataTermino: '',
        emGrupoChecked: false,
        membros: []
    });

    const [usuarioId, setUsuarioId] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUser('674f9f89c12add41cb2c902a');
                setUsuarioId(user);
                console.log(user);
            } catch (error) {
                console.error('Erro ao buscar o usuário:', error);
            }
        };

        fetchUser();
    }, []);

    const handleCreateTask = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!usuarioId) {
        alert(`Usuário não encontrado ${usuarioId}`);
        return;
      }

      try{
        await createTask(usuarioId, {
          titulo: formData.titulo,
          meta_tempo: formData.metaTempo,
          data_termino: formData.dataTermino,
          membros: formData.membros,
        });
        alert('Tarefa criada com sucesso!');
        setTimeout(() =>{
          onClose();
        }, 5000);
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

    return (
      <form className="new-task flex flex-col gap-4 min-w-full p-4 rounded-2xl">
        <div className="flex flex-col gap-1">
          <label className="label">Título da Tarefa</label>
          <input type="text" value={formData.titulo} onChange={handleChange} className="input" name="titulo"/>
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
                <input type="text" value={formData.membros} onChange={handleChange} className="input"/>
            </div>
        )}
  
        <button type="submit" className="button" onClick={handleCreateTask}>
          Criar
        </button>
      </form>
    );
  };
    

export default NewTask;