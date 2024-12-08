import "../../pages/MainPage.css";
import React from "react";
import TaskForm from "./CreateTaskForm";

interface NewTaskProps {
  onClose: () => void;
}

const NewTask: React.FC<NewTaskProps> = ({ onClose }) => {
  return (
    <div className="new-task relative flex flex-col gap-4 min-w-full p-4 rounded-2xl">
      <button className="absolute top-0 right-0 p-4" onClick={onClose}>
        <b>X</b>
      </button>
      <TaskForm onClose={onClose} />
    </div>
  );
};

export default NewTask;
