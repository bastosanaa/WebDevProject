import '../pages/MainPage.css';
import './SideBar.tsx';
import { BsBellFill } from "react-icons/bs";
import logo from "../../assets/logo.png";

interface NavBarProps {
    toggleSideBar: () => void;
    toggleUserInfo: () => void;
    isClicked: boolean;
}

const NavBar: React.FC<NavBarProps> = ({toggleSideBar, toggleUserInfo, isClicked}) => {
    return (
        <div className='object-none object-top'>
                <div className='upper absolute inset-x-0 top-0 h-16'>
                    <div className="user-info">
                        <div onClick={toggleUserInfo}>
                            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"/>
                            <span id="username">nome_nome</span>
                        </div>
                        <div className="notif absolute right-20 p-2">
                            <span><BsBellFill /></span>
                        </div>
                        <div id="menu" className={`mt-6 absolute bg-branco transition-transform duration-300 ${isClicked ? 'opacity-100 translate-y-full': ' opacity-0 translate-y-0'}`}>
                            <p>Sign Out</p>
                        </div>
                    </div>
                    <img id="title" src={logo} alt="Bloom Logo" className="logo" />
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