import '../../pages/MainPage.css';

const Task: React.FC<{ task: string; onClose: () => void }> = ({ task, onClose }) => {
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

export default Task;