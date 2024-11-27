import '../../pages/MainPage.css';
import React, { useState } from "react";

interface NewTaskProps {
    onClose: () => void;
}

const NewTask: React.FC<NewTaskProps> = ({onClose}) => {
    const [formData, setFormData] = useState({
        title: '',
        timeGoalChecked: false,
        timeGoal: '',
        dueDateChecked: false,
        dueDate: '',
        groupTaskChecked: false,
        members: ''
    });

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
      <form className="new-task flex flex-col gap-4 min-w-96 p-4">
        <div className="flex flex-col gap-1">
          <label className="label">Título da Tarefa</label>
          <input type="text" value={formData.title} onChange={handleChange} className="input"/>
        </div>
  
        <div className="flex flex-col gap-1">
          <label className="label">Deseja informar meta de tempo para conclusão?</label>
          <input type="checkbox" checked={formData.timeGoalChecked} onChange={() => handleCheckboxChange('timeGoalChecked')} />
        </div>

        {formData.timeGoalChecked && (
            <div className="flex flex-col gap-1">
                <label className='label'>Meta de conclusão:</label>
                <input type="text" value={formData.timeGoal} onChange={handleChange} className="input"/>
            </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="label">Deseja informar data de término?</label>
          <input type="checkbox" checked={formData.dueDateChecked} onChange={() => handleCheckboxChange('dueDateChecked')} />
        </div>

        {formData.dueDateChecked && (
            <div className="flex flex-col gap-1">
                <label className='label'>Data de término</label>
                <input type="date" value={formData.dueDate} onChange={handleChange} className="input"/>
            </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="label">Tarefa será em grupo?</label>
          <input type="checkbox" checked={formData.groupTaskChecked} onChange={() => handleCheckboxChange('groupTaskChecked')} />
        </div>

        {formData.groupTaskChecked && (
            <div className="flex flex-col gap-1">
                <label className='label'>Membros:</label>
                <input type="text" value={formData.members} onChange={handleChange} className="input"/>
            </div>
        )}
  
        <button type="submit" className="button" onClick={onClose}>
          Criar
        </button>
      </form>
    );
  };
    

export default NewTask;