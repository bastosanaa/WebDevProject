import "../pages/MainPage.css";
import {getUser} from "../../service/users";
import AddFriendSide from "./AddFriendSide";
import {useState} from 'react';

interface SideBarProps {
  isOpen: boolean;
}

// interface Friend {
//   _id: string;
//   nome: string;
//   email: string;
// }

const SideBar: React.FC<SideBarProps> = ({isOpen}) => {
  const [addFriendVisible, setAddFriendVisible] = useState(false);
  // const [friends, setFriends] = useState<Friend[]>([]);

  // const getFriends = async () => {
  //   try {
  //     const user = await getUser();
  //     const friends_ids = user.amigos.map((friendObj: {usuario_id: string}) => friendObj.usuario_id);

  //     const friendPromises =
  //   } catch (err) {
  //     console.log("Erro ao puxar tarefas do usuário: ");
  //   }
  // };

  return (
    <div className={`side-right fixed inset-y-0 right-0 w-60 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="object-none object-right p-4 flex-grow flex flex-col">
        <span id="title">
          <b>AMIGOS</b>
        </span>
        <div className="names mt-2">
          <span>nome_surname</span>
          <br />
          <span>habibi_shihaji</span>
          <br />
          <span>streptococus_fungi</span>
        </div>
      </div>
      {!addFriendVisible && (
        <button className="button w-full !rounded-none p-2 hover:bg-rosa-mais-escuro transition" onClick={() => setAddFriendVisible(true)}>+ AMIGO</button>
      )}
      {addFriendVisible && (
        <AddFriendSide onClose={() => setAddFriendVisible(false)} />
      )}
    </div>
  );
};

export default SideBar;
