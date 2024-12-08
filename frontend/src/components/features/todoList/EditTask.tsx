import "../../pages/MainPage.css";
import React from "react";
import EditTaskForm from "./EditTaskForm";

interface Task{
    _id: string;
    titulo: string;
    usuario_id: string;
    meta_tempo?: string;
    data_termino?: string;
    em_andamento: boolean;
    em_grupo?: boolean;
    membros?: string[];
}

const EditTask: React.FC<{ task: Task; onClose: () => void }> = ({ task, onClose }) => {
  return (
    <div className="edit-task relative flex flex-col gap-4 min-w-full p-4 rounded-2xl">
      <button className="absolute top-0 right-0 p-4" onClick={onClose}>
        <b>X</b>
      </button>
      <EditTaskForm onClose={onClose} task={task}/>
    </div>
  );
};

export default EditTask;
