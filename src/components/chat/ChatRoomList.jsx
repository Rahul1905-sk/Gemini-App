import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import { useChatStore } from '../../stores/chatStore';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce'; 

export const ChatRoomList = ({ 
  isCollapsed, 
  editingId, 
  newName, 
  onNameChange, 
  onEdit, 
  onEditSubmit, 
  onDelete,
  onCancelEdit
}) => {
  const { chatRooms, setActiveChatRoom } = useChatStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const [localName, setLocalName] = useState('');
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 300); 

  const filteredRooms = chatRooms.filter((room) =>
    room.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleSelectChat = (chatId) => {
    if (editingId) return;
    setActiveChatRoom(chatId);
    navigate(`/chat/${chatId}`);
  };

  const handleEditStart = (roomId, currentName) => {
    setLocalName(currentName);
    onEdit(roomId, currentName);
  };

  const handleSubmit = (roomId) => {
    onEditSubmit(roomId, localName);
  };

  return (
    <div className="space-y-1 p-2">
      {!isCollapsed && (
        <div className="mb-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chats..."
            className="w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {filteredRooms.map((room) => (
        <div
          key={room.id}
          onClick={() => !editingId && handleSelectChat(room.id)}
          className={`p-2 rounded-lg flex items-center justify-between group ${
            id === room.id 
              ? 'bg-blue-100 dark:bg-blue-900' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          } ${editingId ? 'cursor-default' : 'cursor-pointer'}`}
        >
          {editingId === room.id ? (
            <div className="flex items-center w-full gap-2">
              <input
                type="text"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmit(room.id);
                  if (e.key === 'Escape') onCancelEdit();
                }}
              />
              <div className="flex gap-1">
                <button
                  onClick={() => handleSubmit(room.id)}
                  className="p-1 text-green-600 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                >
                  <FiCheck />
                </button>
                <button
                  onClick={onCancelEdit}
                  className="p-1 text-red-600 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                >
                  <FiX />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="truncate flex-1">
                <div className="font-medium truncate">
                  {isCollapsed ? room.title.charAt(0).toUpperCase() : room.title}
                </div>
                {!isCollapsed && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(room.updatedAt), { addSuffix: true })}
                  </div>
                )}
              </div>
              {!isCollapsed && !editingId && (
                <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditStart(room.id, room.title);
                    }}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(room.id);
                    }}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-red-500"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};
