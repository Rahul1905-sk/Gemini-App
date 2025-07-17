import { FiCopy } from 'react-icons/fi';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useChatStore } from '../../stores/chatStore';

export const Message = ({ message, isTyping }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayedContent, setDisplayedContent] = useState('');
  const isAi = message.sender === 'ai';
  const updateMessageFlag = useChatStore((state) => state.updateMessageFlag); 

  useEffect(() => {
    let interval;

    if (message.isNew && isAi) {
      let index = 0;
      const fullText = message.content;
      let currentText = '';

      interval = setInterval(() => {
        if (index < fullText.length) {
          currentText += fullText[index];
          setDisplayedContent(currentText); 
          index++;
        } else {
          clearInterval(interval);
          updateMessageFlag?.(message.id); 
        }
      }, 40);
    } else {
      setDisplayedContent(message.content);
    }

    return () => clearInterval(interval);
  }, [message]);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast.success('Copied to clipboard');
  };

  return (
    <div className={`group flex ${isAi ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${isAi ? 'bg-gray-100 dark:bg-gray-700' : 'bg-blue-600 text-white'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isTyping ? (
          <div className="flex space-x-1 items-center">
            <p className='mr-2'>Gemini is typing</p>
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '450ms' }} />
          </div>
        ) : (
          <>
            <div className="whitespace-pre-wrap">
              {displayedContent}
            </div>

            {message.image && (
              <div className="mt-2">
                <img
                  src={message.image}
                  alt="Sent Image"
                  className="max-w-xs max-h-40 rounded-lg"
                />
              </div>
            )}

            <div className={`text-xs mt-1 flex items-center justify-end ${isAi ? 'text-gray-500 dark:text-gray-400' : 'text-blue-100'}`}>
              {format(new Date(message.timestamp), 'h:mm a')}
              {!isTyping && isHovered && (
                <button
                  onClick={handleCopy}
                  className="ml-2 p-1 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                  <FiCopy size={14} />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
