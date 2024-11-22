import React from "react";

import './MainPage.css';

const MainPage: React.FC = () => {
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
            <div className="tasks w-full">
                <div className="tasks-group scale-125 overflow-y-auto h-80">
                    <ul>
                        <li><button className="p-4">Tarefa 1</button></li>
                        <li><button className="p-4">Tarefa 2</button></li>
                        <li><button className="p-4">Tarefa 3</button></li>
                        <li><button className="p-4">Tarefa 4</button></li>
                        <li><button className="p-4">Tarefa 5</button></li>
                        <li><button className="p-4">Tarefa 6</button></li>
                    </ul>
                </div>
                <button className="plus-task absolute inset-x-0 bottom-0 p-4 rounded-lg">Adicionar Tarefa</button>
            </div>
        </div>
    );
};

export default MainPage;
