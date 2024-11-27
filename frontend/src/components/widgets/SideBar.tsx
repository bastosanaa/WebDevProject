import '../pages/MainPage.css';

const SideBar: React.FC = () => {
    return (
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
    );
};

export default SideBar;