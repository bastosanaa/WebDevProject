import "../pages/MainPage.css";
import { deleteFriend} from "../../service/users";
import AddFriendSide from "./AddFriendSide";
import {useEffect, useState} from 'react';
import { useAuth } from "../../hooks/useAuth.tsx";
import { toast } from "react-toastify";
import { BsFillPersonDashFill, BsFillPersonPlusFill } from "react-icons/bs";
import { Friend } from "../../contexts/AuthContext.tsx";

interface SideBarProps {
  isOpen: boolean;
}

const SideBar: React.FC<SideBarProps> = ({isOpen}) => {
  const [addFriendVisible, setAddFriendVisible] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const auth = useAuth();

  const getFriends = async () => {
    try {
      if (auth.user && Array.isArray(auth.user.amigos)) {
        const friends = auth.user.amigos.map((amigo) => amigo);
        setFriends(friends);
      }
    } catch (err) {
      console.log("Erro ao puxar amigos do usuário: ", err);
    }
  };

  const handleDeleteFriend = async (friendId: string) => {
    try {
      await deleteFriend(friendId);
      setFriends((prevFriends) => prevFriends.filter((friend) => friend._id !== friendId));
      toast.warning('Amigo removido!');
    } catch (err) {
      console.log('friend id: ', friendId);
      console.error('Erro ao remover amigo: ', err);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div className={`side-right fixed inset-y-0 right-0 w-60 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="object-none object-right p-4 flex-grow flex flex-col">
        <span id="title">
          <b>AMIGOS</b>
        </span>
        <div className="names mt-2">
          {friends.map((friend) => (
            <div key={friend._id} className="friend space-x-4 inline-block">
              <span>{friend.nome}</span>
              <button
                  className="delete"
                  title="Excluir amigo"
                  onClick={() => {if (auth.user) {
                      handleDeleteFriend(friend.usuario_id);
                    }
                  }}
                >
                  <BsFillPersonDashFill size={20}/>
                </button>
            </div>
          ))}
        </div>
      </div>
      {!addFriendVisible && (
        <button className="button w-full !rounded-none p-2 hover:bg-rosa-mais-escuro transition gap-2" onClick={() => setAddFriendVisible(true)}>
          <BsFillPersonPlusFill size={20}/>
          <span>AMIGO</span>
        </button>
      )}
      {addFriendVisible && (
        <AddFriendSide onClose={() => setAddFriendVisible(false)} />
      )}
    </div>
  );
};

export default SideBar;
