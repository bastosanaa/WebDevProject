import '../../pages/MainPage.css';
import React, { useState } from "react";

interface TasksProps {
    onTaskClick: (task: string) => void;
    onAddTask: () => void;
}

const Tasks:  React.FC<TasksProps> = ({onTaskClick, onAddTask}) => {
    return (
        <div className="tasks w-full">
                    <div className="tasks-group scale-125 overflow-y-auto h-80">
                        <ul>
                            {['Tarefa 1', 'Tarefa 2', 'Tarefa 3', 'Tarefa 4', 'Tarefa 5', 'Tarefa 6'].map((task) => (
                                <li key={task}>
                                    <button className="p-4" onClick={() => onTaskClick(task)}>
                                        {task}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button className="plus-task absolute inset-x-0 bottom-0 p-4 rounded-lg" onClick={onAddTask}>Adicionar Tarefa</button>
        </div>
    );
};

export default Tasks;