import "../../pages/MainPage.css";
import React, { useEffect, useState } from "react";
import { BsFillTrash3Fill, BsCheckLg, BsPencilSquare } from "react-icons/bs";
import {
  getTasksByUser,
  deleteTask,
  updateTaskStatus,
} from "../../../service/tasks";
import { toast } from "react-toastify";

interface Task {
  _id: string;
  titulo: string;
  usuario_id: string;
  meta_tempo?: string;
  data_termino?: string;
  em_andamento: boolean;
  em_grupo?: boolean;
  membros?: string[];
}

interface TasksProps {
  onTaskClick: (task: Task) => void;
  onAddTask: () => void;
  isSideBarOpen: boolean;
}

const Tasks: React.FC<TasksProps> = ({
  onTaskClick,
  onAddTask,
  isSideBarOpen,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    try {
      const response = await getTasksByUser();
      setTasks(response);
    } catch (err) {
      console.log("Erro ao puxar tarefas do usuário: ");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      toast.warning("Tarefa excluída!");
    } catch (err) {
      console.error("Erro ao excluir tarefa:", err);
    }
  };

  const handleEndTask = async (taskId: string) => {
    try {
      await updateTaskStatus(taskId);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, em_andamento: false } : task
        )
      );
      toast.warning("Tarefa encerrada.");
    } catch (err) {
      console.error("Erro ao encerrar tarefa: ", err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div
      className={`tasks w-full space-y-16 ${isSideBarOpen ? "shrink" : " "}`}
    >
      <div className="tasks-group scale-125 overflow-y-auto h-80 rounded-2xl m-0">
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`flex justify-between items-center ${
                task.em_andamento
                  ? "bg-rosa-claro"
                  : "border border-vermelho-encerrado"
              }`}
            >
              <button className="p-4" onClick={() => onTaskClick(task)}>
                {task.titulo}
              </button>
              <div className="flex space-x-2 p-2">
                <button
                  className="end"
                  title="Encerrar tarefa"
                  onClick={() => handleEndTask(task._id)}
                >
                  <BsCheckLg />
                </button>
                <button className="edit" title="Editar tarefa">
                  <BsPencilSquare />
                </button>
                <button
                  className="delete"
                  title="Excluir tarefa"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  <BsFillTrash3Fill />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="plus-task relative inset-x-0 bottom-0 p-4 rounded-lg"
        onClick={onAddTask}
      >
        Adicionar Tarefa
      </button>
    </div>
  );
};

export default Tasks;
