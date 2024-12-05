import '../../pages/MainPage.css';
import React, { useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";


interface TasksProps {
    onTaskClick: (task: string) => void;
    onAddTask: () => void;
}

const Tasks:  React.FC<TasksProps> = ({onTaskClick, onAddTask}) => {
    return (
        <div className="tasks w-full">
                    <div className="tasks-group scale-125 overflow-y-auto h-80 rounded-2xl">
                        <ul>
                            {['Tarefa 1', 'Tarefa 2', 'Tarefa 3', 'Tarefa 4', 'Tarefa 5', 'Tarefa 6'].map((task) => (
                                <li key={task} className="flex justify-between items-center">
                                    <button className="p-4" onClick={() => onTaskClick(task)}>
                                        {task}
                                    </button>
                                    <div className="flex space-x-2 p-2">
                                        <button className="end" title='Encerrar tarefa'><BsCheckLg /></button>
                                        <button className="edit" title='Editar tarefa'><BsPencilSquare /></button>
                                        <button className='delete' title='Excluir tarefa'><BsFillTrash3Fill /></button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button className="plus-task relative  inset-x-0 bottom-0 p-4 rounded-lg" onClick={onAddTask}>Adicionar Tarefa</button>
        </div>
    );
};

export default Tasks;