import React, { useEffect, useState } from "react";
import "./MainPage.css";
import NavBar from "../widgets/NavBar";
import SideBar from "../widgets/SideBar";
import Tasks from "../features/todoList/Tasks";
import Task from "../features/todoList/Task";
import NewTask from "../features/todoList/NewTask";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showTasks, setShowTasks] = useState<boolean>(true);
  const [showNewTask, setShowNewTask] = useState<boolean>(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isMenuOpen, setisMenuOpen] = useState(false);

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

  const toggleSideBar = () => {
    setIsSideBarOpen((prevState) => !prevState);
  };

  const menuToggle = () => {
    setisMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="main-page relative">
      <NavBar
        toggleSideBar={toggleSideBar}
        toggleUserInfo={menuToggle}
        isClicked={isMenuOpen}
      />
      <SideBar isOpen={isSideBarOpen} />
      {showTasks && !showNewTask && (
        <Tasks onTaskClick={handleTaskClick} onAddTask={handleAddTask} />
      )}

      {selectedTask && <Task task={selectedTask} onClose={handleCloseDetail} />}

      {showNewTask && <NewTask onClose={handleCloseNewTask} />}
    </div>
  );
};

export default MainPage;
