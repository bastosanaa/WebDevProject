import '../../pages/MainPage.css';
import React, { useEffect, useState } from "react";
import { BsFillTrash3Fill, BsCheckLg, BsPencilSquare } from "react-icons/bs";
import {getTask, getTasksByUser} from "../../../service/tasks";

interface TasksProps {
    onTaskClick: (task: string) => void;
    onAddTask: () => void;
    isSideBarOpen: boolean;
}

const Tasks:  React.FC<TasksProps> = ({onTaskClick, onAddTask, isSideBarOpen}) => {
    const [tasks, setTasks] = useState([]);

    const getTasks = async () =>{
        try {
            const response = await getTasksByUser()
            setTasks(response)
        } catch (err) {
            console.log("Erro ao puxar tarefas do usuário: ");
        };
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className={`tasks w-full space-y-16 ${isSideBarOpen ? 'shrink' : ' '}`}>
                    <div className="tasks-group scale-125 overflow-y-auto h-80 rounded-2xl m-0">
                        <ul>
                            {tasks.map((task) => (
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
                    <button className="plus-task relative inset-x-0 bottom-0 p-4 rounded-lg" onClick={onAddTask}>Adicionar Tarefa</button>
        </div>
    );
};

export default Tasks;