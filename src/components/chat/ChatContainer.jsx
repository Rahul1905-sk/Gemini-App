import { WelcomeScreen } from './WelcomeScreen';
import { Message } from './Message';
import { useChatStore } from '../../stores/chatStore';
import { useEffect,useRef, useState } from 'react';
import { ChatInput } from './ChatInput';
import { useInView } from 'react-intersection-observer';


export const ChatContainer = () => {
  const { activeChatRoom, messages, loadMoreMessages, initializePredefinedChats } = useChatStore();
  const messagesEndRef = useRef(null);
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const messagesContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentMessages = messages[activeChatRoom] || [];

  useEffect(() => {
    initializePredefinedChats();
  }, [initializePredefinedChats]);


  const handleScroll = () => {
    if (messagesContainerRef.current.scrollTop === 0 && !isLoading) {
      setIsLoading(true);
      loadMoreMessages(activeChatRoom);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };


  useEffect(() => {
   if(currentMessages.length>1){
     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
   }
  }, [currentMessages]);

  return (
    <div className="flex flex-col h-full">
      <div ref={ref}  className="flex-1 overflow-y-auto p-4">
        {currentMessages.length === 0 ? (
          <WelcomeScreen />
        ) : (
          currentMessages.map((message) => (
            <Message 
              key={message.id} 
              message={message} 
              isTyping={message.isTyping}
            />
          ))
          
        )}
         <div ref={messagesEndRef} />
      </div>
      <ChatInput />
    </div>
  );
};

