import "../pages/MainPage.css";

interface SideBarProps {
  isOpen: boolean;
}

const SideBar: React.FC<SideBarProps> = ({isOpen}) => {

  return (
    <div className={`side-right fixed inset-y-0 right-0 w-60 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="object-none object-right p-4 flex-grow">
        <span id="title">
          <b>AMIGOS</b>
        </span>
        <div className="names">
          <span>nome_surname</span>
          <br />
          <span>habibi_shihaji</span>
          <br />
          <span>streptococus_fungi</span>
        </div>
      </div>
      <button className="button w-full !rounded-none">+ AMIGO</button>
    </div>
  );
};

export default SideBar;
