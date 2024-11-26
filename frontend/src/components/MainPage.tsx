import React, { useState } from "react";
import './MainPage.css';

const TaskDetail: React.FC<{ task: string; onClose: () => void }> = ({ task, onClose }) => {
    return (
        <div className="task-detail-overlay w-full">
            <div className="task-detail relative grid place-items-center scale-125 h-80">
                <h2 className="absolute left-0 top-0 p-2">{task}</h2> 
                <button className="absolute top-0 right-0 p-2" onClick={onClose}>X</button>
                <button className="timer h-40 w-40">Timer</button>
                <button className="pause"><b>| |</b></button>
            </div>
        </div>
    );
};

const MainPage: React.FC = () => {
    const [selectedTask, setSelectedTask] = useState<string | null>(null);
    const [showTasks, setShowTasks] = useState<boolean>(true);

    const handleTaskClick = (task: string) => {
        setSelectedTask(task);
        setShowTasks(false);
    };

    const handleCloseDetail = () => {
        setSelectedTask(null);
        setShowTasks(true);
    };

    return (
        <div className='main-page relative'>
            <div className='object-none object-top'>
                <div className='upper absolute inset-x-0 top-0 h-16'>
                    <div className="user-info">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"/>
                        <span id="username">nome_nome</span>
                    </div>
                    <span id="title">TO DO || POMO</span>
                </div>
            </div>
            <div className='side-right fixed inset-y-0 right-0 w-60 flex flex-col'>
                <div className="object-none object-right p-4 flex-grow">
                    <span id="title"><b>RANKING</b></span>
                    <div className='names'>
                        <span>1. nome_surname</span>
                        <br />
                        <span>2. habibi_shihaji</span>
                        <br />
                        <span>3. streptococus_fungi</span>
                    </div>
                </div>
                <div className="button">
                    <button className="w-full rounded-none">+ AMIGO</button>
                </div>
            </div>
            {showTasks &&
                <div className="tasks w-full">
                    <div className="tasks-group scale-125 overflow-y-auto h-80">
                        <ul>
                            {['Tarefa 1', 'Tarefa 2', 'Tarefa 3', 'Tarefa 4', 'Tarefa 5', 'Tarefa 6'].map((task) => (
                                <li key={task}>
                                    <button className="p-4" onClick={() => handleTaskClick(task)}>
                                        {task}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button className="plus-task absolute inset-x-0 bottom-0 p-4 rounded-lg">Adicionar Tarefa</button>
                </div>
            }

            {selectedTask && <TaskDetail task={selectedTask} onClose={handleCloseDetail} />}
        </div>
    );
};

export default MainPage;
