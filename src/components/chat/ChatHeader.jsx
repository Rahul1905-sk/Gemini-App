import { FiTrash2 } from 'react-icons/fi';
import { useChatStore } from '../../stores/chatStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const ChatHeader = ({ title }) => {
  const { activeChatRoom, deleteChatRoom } = useChatStore();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (activeChatRoom) {
      deleteChatRoom(activeChatRoom);
      toast.success('Chat deleted');
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
        {title}
      </h2>
      <button
        onClick={handleDelete}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
        title="Delete chat"
      >
        <FiTrash2 />
      </button>
    </div>
  );
};