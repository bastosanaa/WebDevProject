import '../../pages/MainPage.css';

interface Task{
    _id: string;
    titulo: string; 
    meta_tempo?: string; 
    data_termino?: string; 
    em_grupo?: boolean; 
    membros?: string[] 
}

const Task: React.FC<{ task: Task; onClose: () => void }> = ({ task, onClose }) => {
    return (
        <div className="task-detail-overlay w-full">
            <div className="task-detail relative grid place-items-center scale-125 h-80 rounded-2xl">
                <h2 className="titulo absolute left-0 top-0 p-4">{task.titulo}</h2> 
                <h3 className="meta_tempo absolute left-0 top-10">Meta de tempo:{task.meta_tempo}</h3>
                <h3 className="data_termino absolute left-0 top-16">Data término: {task.data_termino}</h3>
                <h3 className="membros absolute left-0 top-24">Membros: {task.membros}</h3>
                <button className="absolute top-0 right-0 p-4" onClick={onClose}><b>X</b></button>
                <button className="timer h-40 w-40">Timer</button>
                <button className="pause"><b>| |</b></button>
            </div>
        </div>
    );
};

export default Task;