import React, { useState } from "react";
import "./MainPage.css";
import NavBar from "../widgets/NavBar";
import SideBar from "../widgets/SideBar";
import Tasks from "../features/todoList/Tasks";
import Task from "../features/todoList/Task";
import NewTask from "../features/todoList/NewTask";

const MainPage: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showTasks, setShowTasks] = useState<boolean>(true);
  const [showNewTask, setShowNewTask] = useState<boolean>(false);

  const handleTaskClick = (task: string) => {
    setSelectedTask(task);
    setShowTasks(false);
    setShowNewTask(false);
  };

  const handleCloseDetail = () => {
    setSelectedTask(null);
    setShowTasks(true);
    setShowNewTask(false);
  };

  const handleAddTask = () => {
    setShowNewTask(true);
    setShowTasks(false);
    setSelectedTask(null);
  };

  const handleCloseNewTask = () => {
    setShowNewTask(false);
    setShowTasks(true);
  };

  return (
    <div className="main-page relative">
      <NavBar />
      <SideBar />
      {showTasks && !showNewTask && (
        <Tasks onTaskClick={handleTaskClick} onAddTask={handleAddTask} />
      )}

      {selectedTask && <Task task={selectedTask} onClose={handleCloseDetail} />}

      {showNewTask && <NewTask onClose={handleCloseNewTask} />}
    </div>
  );
};

export default MainPage;
