import { useState } from 'react';
import { FiPlus, FiMoon, FiSun, FiLogOut, FiMenu } from 'react-icons/fi';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { ChatRoomList } from '../chat/ChatRoomList';
import { useChatStore } from '../../stores/chatStore';
import { toast } from 'react-hot-toast';

export const Sidebar = () => {
  const { logout } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { createChatRoom, editChatRoom, deleteChatRoom } = useChatStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState('');

  const handleCreateChat = async () => {
    const newChat = createChatRoom();
    navigate(`/chat/${newChat.id}`);
  };

 
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this chat?')) {
      deleteChatRoom(id);
      const chatRooms = useChatStore.getState().chatRooms;
      if (chatRooms.length > 0) {
        navigate(`/chat/${chatRooms[0].id}`);
      } else {
        navigate('/');
      }
      toast.success('Chat deleted');
    }
  };

  const handleEdit = (id, currentName) => {
    setEditingId(id);
    setNewName(currentName);
  };

  const handleEditSubmit = (id, name) => {
    if (name.trim() === '') {
      toast.error('Chat name cannot be empty');
      return;
    }
    editChatRoom(id, name);
    setEditingId(null);
    setNewName('');
    toast.success('Chat renamed');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewName('');
  };


  return (
    <div className={`relative flex flex-col h-full ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}>
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FiMenu className="w-5 h-5" />
        </button>
        {!isCollapsed && (
          <h2 className="ml-2 font-semibold text-lg">Chat Rooms</h2>
        )}
      </div>

      <div className="p-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={handleCreateChat}
          className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors ${isCollapsed ? 'px-2' : 'px-4'}`}
          title={isCollapsed ? "New chat" : undefined}
        >
          <FiPlus className="flex-shrink-0" />
          {!isCollapsed && <span className="truncate">New chat</span>}
        </button>
      </div>
      
       <div className="flex-1 overflow-y-auto">
       {!isCollapsed && <ChatRoomList 
          isCollapsed={isCollapsed}
          editingId={editingId}
          newName={newName}
          onNameChange={setNewName}
          onEdit={handleEdit}
          onEditSubmit={handleEditSubmit}
          onDelete={handleDelete}
          onCancelEdit={handleCancelEdit}
        />}
      </div>
      
      <div className="p-2 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-1">
        <button
          onClick={toggleTheme}
          className={`flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${isCollapsed ? '' : 'justify-start gap-2'}`}
          title={isCollapsed ? (theme === 'dark' ? 'Light Mode' : 'Dark Mode') : undefined}
        >
          {theme === 'dark' ? <FiSun  className="w-5 h-5" /> : <FiMoon  className="w-5 h-5" />}
          {!isCollapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
        <button
          onClick={logout}
          className={`flex items-center  p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${isCollapsed ? '' : 'justify-start gap-2'}`}
          title={isCollapsed ? "Logout" : undefined}
        >
          <FiLogOut  className="w-5 h-5" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};