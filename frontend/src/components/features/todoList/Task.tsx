import '../../pages/MainPage.css';
import React, { useEffect, useState } from "react";

interface Friend {
    id: string;
    nome: string;
}

interface Task{
    _id: string;
    titulo: string; 
    usuario_id: string;
    data_termino?: string; 
    em_andamento: boolean;
    em_grupo?: boolean; 
    membros?: Friend[] 
}

const Task: React.FC<{ task: Task; onClose: () => void }> = ({ task, onClose }) => {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [selectedTime, setSelectedTime] = useState(3600);

    const timeOptions = [
        { label: '60/20', value: 60 * 60},
        { label: '45/15', value: 45 * 60},
        { label: '30/10', value: 30 * 60},
        { label: '20/5', value: 20 * 60}
    ];

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isTimerActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsTimerActive(false);
        }

        return () => clearInterval(timer);
    }, [isTimerActive, timeLeft]);

    const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newTime = Number(event.target.value);
        setSelectedTime(newTime);
        setTimeLeft(newTime);
    };

    const toggleTimer = () => {
        if (isTimerActive) {
            setIsTimerActive(false);
        } else {
            if (timeLeft === 0) {
                setTimeLeft(selectedTime);
            }
            setIsTimerActive(true);
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    return (
        <div className="task-detail-overlay w-full">
            <div className="task-detail relative grid place-items-center scale-125 h-80 rounded-2xl">
                <h1 className="titulo absolute left-0 top-0 p-4"><b>{task.titulo}</b></h1> 
                <div className="task-info absolute left-4 top-10 mt-5">
                    <h3 className="data_termino">Data término: {formatDate(task.data_termino)}</h3>
                    <h3 className="membros">Membros: {task.membros?.map(membro => membro.nome).join(', ')}</h3>
                </div>
                <button className="absolute top-0 right-0 p-4" onClick={onClose}><b>X</b></button>
                <div className="timer-container space-y-6">
                    <div className="timer h-40 w-40">
                        {formatTime(timeLeft)}
                    </div>
                    <select onChange={handleTimeChange} value={selectedTime}>
                        {timeOptions.map(option => (
                            <option key={option.label} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="pause" onClick={toggleTimer}><b>{isTimerActive ? '| |' : '▶'}</b></button>
            </div>
        </div>
    );
};

export default Task;