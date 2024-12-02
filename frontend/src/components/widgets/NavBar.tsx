import '../pages/MainPage.css';
import './SideBar.tsx';

interface NavBarProps {
    toggleSideBar: () => void;
    toggleUserInfo: () => void;
}

const NavBar: React.FC<NavBarProps> = ({toggleSideBar, toggleUserInfo}) => {
    return (
        <div className='object-none object-top'>
                <div className='upper absolute inset-x-0 top-0 h-16'>
                    <div className="user-info">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"/>
                        <button className='p-0' onClick={toggleUserInfo}>
                            <span id="username">nome_nome</span>
                        </button>
                    </div>
                    <span id="title">TO DO || POMO</span>
                    <button onClick={toggleSideBar} className="p-5 top-0 right-0" id="hamb">
                        <div className="flex flex-col items-center">
                            <span className="block w-6 h-1 bg-rosa-escuro mb-1"></span>
                            <span className="block w-6 h-1 bg-rosa-escuro mb-1"></span>
                            <span className="block w-6 h-1 bg-rosa-escuro"></span>
                        </div>
                    </button>
                </div>
        </div>
    );
};

export default NavBar;