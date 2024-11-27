import '../pages/MainPage.css';

const NavBar: React.FC = () => {
    return (
        <div className='object-none object-top'>
                <div className='upper absolute inset-x-0 top-0 h-16'>
                    <div className="user-info">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"/>
                        <span id="username">nome_nome</span>
                    </div>
                    <span id="title">TO DO || POMO</span>
                </div>
        </div>
    );
};

export default NavBar;