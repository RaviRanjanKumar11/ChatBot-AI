import { useState } from "react";
import "./App.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [inputt, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const handleInput = async () => {
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = inputt;
      const result = await model.generateContent(prompt);
      const aiText = result.response.text();

      setChat([...chat, { userText: inputt, aiText }]);
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-bold text-blue-400 mb-4 animate-fade-in">
        Gemini Chatbot
      </h1>
      <div className="chat w-full max-w-2xl bg-gray-800 p-4 rounded-lg shadow-lg overflow-y-auto h-96">
        {chat.map((val, index) => (
          <div
            key={index}
            className="mb-4 p-3 rounded-lg shadow-md transition-all duration-300 hover:scale-105"
          >
            <h2 className="text-lg font-semibold text-gray-300">{val.userText}</h2>
            <p className="text-blue-400 mt-2">{val.aiText}</p>
          </div>
        ))}
      </div>
      <div className="input mt-5 w-full max-w-2xl flex items-center gap-3">
        <input
          className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring focus:ring-blue-400 outline-none"
          type="text"
          value={inputt}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI..."
        />
        <button
          className="bg-blue-600 p-3 text-white rounded-lg shadow-md hover:bg-blue-500 transition-all duration-300"
          onClick={handleInput}
        >
          Send
        </button>
        <button
          className="bg-red-600 p-3 text-white rounded-lg shadow-md hover:bg-red-500 transition-all duration-300"
          onClick={() => setChat([])}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default App;
