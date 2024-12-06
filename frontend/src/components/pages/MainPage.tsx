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

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTasks, setShowTasks] = useState<boolean>(true);
  const [showNewTask, setShowNewTask] = useState<boolean>(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [taskUpper, setTaskState] = useState(true);
  const [pomoUpper, setPomoState] = useState(false);

  const handleTaskClick = (task: { _id: string, titulo: string; usuario_id: string; meta_tempo?: string; data_termino?: string; em_andamento: boolean; em_grupo?: boolean; membros?: string[] }) => {
    setSelectedTask(task);
    setShowTasks(false);
    setShowNewTask(false);
    handlePomoState();
  };

  const handleCloseDetail = () => {
    setSelectedTask(null);
    setShowTasks(true);
    setShowNewTask(false);
    handleTaskState();
  };

  const handleAddTask = () => {
    setShowNewTask(true);
    setShowTasks(false);
    setSelectedTask(null);
  };

  const handleCloseNewTask = () => {
    setShowNewTask(false);
    setShowTasks(true);
    handleTaskState();
  };

  const toggleSideBar = () => {
    setIsSideBarOpen((prevState) => !prevState);
  };

  const menuToggle = () => {
    setisMenuOpen((prevState) => !prevState);
  };

  const handleTaskState = () => {
    setTaskState(true);
    setPomoState(false);
  }

  const handlePomoState = () => {
    setPomoState(true);
    setTaskState(false);
  }

  return (
    <div className="main-page">
      <NavBar
        toggleSideBar={toggleSideBar}
        toggleUserInfo={menuToggle}
        isClicked={isMenuOpen}
        task ={taskUpper}
        pomo ={pomoUpper}
      />
      <SideBar isOpen={isSideBarOpen} />
      {showTasks && !showNewTask && (
        <Tasks onTaskClick={handleTaskClick} onAddTask={handleAddTask} isSideBarOpen={isSideBarOpen}/>
      )}

      {selectedTask && <Task task={selectedTask} onClose={handleCloseDetail} />}

      {showNewTask && <NewTask onClose={handleCloseNewTask} />}
    </div>
  );
};

export default MainPage;
