import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

export const useChatStore = create(
  persist(
    (set, get) => {
      const paginateMessages = (chatRoomId, page) => {
        const pageSize = 20;
        const allMessages = get().messages[chatRoomId] || [];
        const paginatedMessages = allMessages.slice((page - 1) * pageSize, page * pageSize);
        return paginatedMessages;
      };
      return {
      chatRooms: [],
      activeChatRoom: null,
      messages: {},
      hasInitialized: false, 

      initializePredefinedChats: () => {
        if (get().hasInitialized) return;
        
        const predefinedChats = [
          {
            id: 'welcome-1',
            title: 'Getting Started',
            isPredefined: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 'welcome-2',
            title: 'Ask About Features',
            isPredefined: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 'welcome-3',
            title: 'How To Use',
            isPredefined: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];

        const predefinedMessages = {
          'welcome-1': [
            {
              id: nanoid(),
              content: 'Hello! Welcome to Gemini Chat. How can I assist you today?',
              sender: 'ai',
              timestamp: new Date().toISOString()
            }
          ],
          'welcome-2': [
            {
              id: nanoid(),
              content: 'Feel free to ask me about any features or capabilities I have!',
              sender: 'ai',
              timestamp: new Date().toISOString()
            }
          ],
          'welcome-3': [
            {
              id: nanoid(),
              content: 'You can start by typing your question or select one of the suggested topics.',
              sender: 'ai',
              timestamp: new Date().toISOString()
            }
          ]
        };

        set({
          chatRooms: predefinedChats,
          messages: predefinedMessages,
          activeChatRoom: 'welcome-1',
          hasInitialized: true
        });
      },


      createChatRoom: (title) => {
        const newChatRoom = {
          id: nanoid(),
          title: title || `New Chat ${get().chatRooms.length + 1}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isPredefined: false
        };
        
        set((state) => ({
          chatRooms: [newChatRoom, ...state.chatRooms],
          messages: {
            ...state.messages,
            [newChatRoom.id]: [],
          },
          activeChatRoom: newChatRoom.id
        }));
        
        return newChatRoom;
      },

      editChatRoom: (id, newTitle) => {
        set(state => ({
          chatRooms: state.chatRooms.map(room => 
            room.id === id ? { ...room, title: newTitle, updatedAt: new Date().toISOString() } : room
          )
        }));
      },
      
      deleteChatRoom: (id) => {
        const state = get();
        const remainingChats = state.chatRooms.filter((room) => room.id !== id);
        
        set({
          chatRooms: remainingChats,
          activeChatRoom: state.activeChatRoom === id 
            ? remainingChats.length > 0 
              ? remainingChats[0].id 
              : null
            : state.activeChatRoom
        });
      },
      
      setActiveChatRoom: (id) => {
        set({ activeChatRoom: id });
      },
      
      addMessage: (chatRoomId, message) => {
        const newMessage = {
          id: nanoid(),
          ...message,
          timestamp: new Date().toISOString(),
        };
        
        set((state) => ({
          messages: {
            ...state.messages,
            [chatRoomId]: [...(state.messages[chatRoomId] || []), newMessage],
          },
          chatRooms: state.chatRooms.map((room) =>
            room.id === chatRoomId
              ? { ...room, updatedAt: new Date().toISOString() }
              : room
          ),
        }));
        
        return newMessage;
      },

      addImageMessage: (chatRoomId, imageFile) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
      
        reader.onloadend = () => {
          const newMessage = {
            id: nanoid(),
            content: reader.result,
            sender: 'user',
            timestamp: new Date().toISOString(),
            type: 'image',
          };
      
          set((state) => ({
            messages: {
              ...state.messages,
              [chatRoomId]: [...(state.messages[chatRoomId] || []), newMessage],
            },
            chatRooms: state.chatRooms.map((room) =>
              room.id === chatRoomId
                ? { ...room, updatedAt: new Date().toISOString() }
                : room
            ),
          }));
        };
      },
      
      addAiResponse: async (chatRoomId, prompt) => {
        const typingMessage = {
          id: 'typing',
          content: 'Gemini is typing...',
          sender: 'ai',
          isTyping: true,
        };
        
        set((state) => ({
          messages: {
            ...state.messages,
            [chatRoomId]: [...(state.messages[chatRoomId] || []), typingMessage],
          },
        }));

        const delay = Math.min(2000, Math.max(500, prompt.length * 50));
        await new Promise((resolve) => setTimeout(resolve, delay));

        set((state) => ({
          messages: {
            ...state.messages,
            [chatRoomId]: (state.messages[chatRoomId] || []).filter(
              (msg) => msg.id !== 'typing'
            ),
          },
        }));

        const aiResponses = [
          "I've analyzed your query and here's what I found.",
          "That's an interesting question! Based on my knowledge.",
          "Here are some insights about your request.",
          "I understand you're asking about this topic. Let me explain.",
          "After considering various perspectives, I would suggest.",
          "The information you're looking for can be summarized as.",
          "Based on current data and trends, here's what I can tell you.",
          "I've processed your input and here's my response.",
        ];

        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        console.log({randomResponse})
        const newAiMessage = {
          id: nanoid(),
          content: randomResponse,
          sender: 'ai',
          timestamp: new Date().toISOString(),
          isTyping: false,
          isNew: true, 
        };

        set((state) => ({
          messages: {
            ...state.messages,
            [chatRoomId]: [
              ...(state.messages[chatRoomId] || []),
              newAiMessage,
            ],
          },
          chatRooms: state.chatRooms.map((room) =>
            room.id === chatRoomId
              ? { ...room, updatedAt: new Date().toISOString() }
              : room
          ),
        }));
      },

      updateMessageFlag: (messageId) => {
        const state = get();
        const updatedMessages = { ...state.messages };
      
        for (const chatRoomId in updatedMessages) {
          updatedMessages[chatRoomId] = updatedMessages[chatRoomId].map((msg) => {
            if (msg.id === messageId && msg.isNew) {
              const { isNew, ...rest } = msg;
              return rest;
            }
            return msg;
          });
        }
      
        set({ messages: updatedMessages });
      },
    

      loadMoreMessages: (chatRoomId, currentPage) => {
        const newPage = currentPage;
        const messagesPage = paginateMessages(chatRoomId, newPage);

        set((state) => ({
          messages: {
            ...state.messages,
            [chatRoomId]: messagesPage,
          },
        }));
      },

      
      loadMoreMessages: (chatRoomId) => {
        const olderMessages = Array.from({ length: 10 }, (_, i) => ({
          id: `old-${i}-${Date.now()}`,
          content: `Older message ${i + 1}`,
          sender: i % 2 === 0 ? 'user' : 'ai',
          timestamp: new Date(Date.now() - (i + 1) * 60000).toISOString(),
        }));

        set((state) => ({
          messages: {
            ...state.messages,
            [chatRoomId]: [...olderMessages, ...(state.messages[chatRoomId] || [])],
          },
        }));
      },

    }},
    {
      name: 'chat-storage',
    }
  )
);