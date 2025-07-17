
import { FiImage, FiSend } from 'react-icons/fi';
import { useRef, useState } from 'react';
import { useChatStore } from '../../stores/chatStore';

export const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null); 
  const fileInputRef = useRef(null);
  const { activeChatRoom, addMessage, addAiResponse } = useChatStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() && !imagePreview) return;

    if (activeChatRoom) {
      const newMessage = {
        content: message,
        sender: 'user',
        image: imagePreview, 
      };

      addMessage(activeChatRoom, newMessage);
      addAiResponse(activeChatRoom, message);

      setMessage('');
      setImagePreview(null); 
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const resetFileInput = () => {
    fileInputRef.current.value = '';
  };

  return (
    <div className="pt-[15px] pr-[10px] pb-[15px] pl-0 md:p-4 border-t border-gray-200 dark:border-gray-700">
      {imagePreview && (
        <div className="mb-3 relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-xs max-h-40 rounded-lg"
          />
          <button
            onClick={() => setImagePreview(null)}
            className="absolute top-1 right-1 bg-gray-800 bg-opacity-50 text-white rounded-full p-1"
          >
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            handleImageChange(e);
            resetFileInput(); 
          }}
          accept="image/*"
          className="hidden"
        />
        <button
          type="button"
          onClick={triggerFileInput}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FiImage className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full py-2 px-4 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={!message.trim() && !imagePreview}
          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <FiSend />
        </button>
      </form>
    </div>
  );
};
