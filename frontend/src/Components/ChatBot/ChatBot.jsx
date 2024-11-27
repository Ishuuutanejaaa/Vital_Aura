
import { useState, useRef, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion(""); // Clear input immediately after sending

    // Add user question to chat history
    setChatHistory(prev => [...prev, { type: 'question', content: currentQuestion }]);

    try {
      const API_KEY = "AIzaSyBsxf2VPR3IY-z6AxUvy-aueidFZme_Llg"; // Replace with your actual API key
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      const aiResponse = response["data"]["candidates"][0]["content"]["parts"][0]["text"];
      setChatHistory(prev => [...prev, { type: 'answer', content: aiResponse }]);
      setAnswer(aiResponse);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }
    setGeneratingAnswer(false);
  }

  return (
    <div className="container">
      <header className="header">
        <a href="https://github.com/Vishesh-Pandey/chat-ai" 
           target="_blank" 
           rel="noopener noreferrer">
          <h1>Chat AI</h1>
        </a>
      </header>

      <div 
        ref={chatContainerRef}
        className="chat-container hide-scrollbar"
      >
        {chatHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <div className="bg-blue-50 rounded-xl p-8 max-w-2xl">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Welcome to Chat AI! 👋</h2>
              <p className="text-gray-600 mb-4">
                I'm here to help you with anything you'd like to know. You can ask me about:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-blue-500">💡</span> General knowledge
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-blue-500">🔧</span> Technical questions
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-blue-500">📝</span> Writing assistance
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-blue-500">🤔</span> Problem solving
                </div>
              </div>
              <p className="text-gray-500 mt-6 text-sm">
                Just type your question below and press Enter or click Send!
              </p>
            </div>
          </div>
        ) : (
          <>
            {chatHistory.map((chat, index) => (
              <div key={index} className={`chat-message ${chat.type}`}>
                <div className={`message ${chat.type}`}>
                  <ReactMarkdown>{chat.content}</ReactMarkdown>
                </div>
              </div>
            ))}
          </>
        )}
        {generatingAnswer && (
          <div className="text-left">
            <div className="inline-block bg-gray-100 p-3 rounded-lg animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={generateAnswer} className="input-form">
        <div className="flex gap-2">
          <textarea
 required
            className="flex-1"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything..."
            rows="2"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                generateAnswer(e);
              }
            }}
          ></textarea>
          <button
            type="submit"
            disabled={generatingAnswer}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;