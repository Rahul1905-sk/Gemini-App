
export const WelcomeScreen = () => {

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">
          Hello there ! 👋
        </h1>
        <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
          I'm Gemini, your AI assistant. How can I help you today?
        </p>
      </div>
    </div>
  );
};