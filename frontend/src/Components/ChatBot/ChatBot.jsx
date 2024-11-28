import { useState, useRef, useEffect } from "react";
import "../ChatBot/ChatBot.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function ChatBot() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
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
    setChatHistory((prev) => [...prev, { type: "question", content: currentQuestion }]);

    try {
      const API_KEY = "AIzaSyBsxf2VPR3IY-z6AxUvy-aueidFZme_Llg"; // Use your API key
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      const aiResponse = response.data.candidates[0].content.parts[0].text;
      setChatHistory((prev) => [...prev, { type: "answer", content: aiResponse }]);
    } catch (error) {
      console.error(error);
      setChatHistory((prev) => [...prev, { type: "answer", content: "Sorry, something went wrong. Please try again!" }]);
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className="chatbot-container">
      <header className="chatbot-header">
       
          <h1 className="chatbot-title">ChatBot</h1>
        
      </header>

      <div
        ref={chatContainerRef}
        className="chatbot-chat-container chatbot-hide-scrollbar"
      >
        {chatHistory.length === 0 ? (
          <div className="chatbot-empty-state">
            <div className="chatbot-empty-content">
              <h2 className="chatbot-empty-title">Welcome to your ChatBot 👋</h2>
              <p className="chatbot-empty-description">
                I'm here to help you with any information you'd like to know. You can ask me anything
              </p>
             
            </div>
          </div>
        ) : (
          <>
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`chatbot-message ${chat.type === "question" ? "chatbot-question" : "chatbot-answer"}`}
              >
                <div className={`chatbot-message-content ${chat.type}`}>
                  <ReactMarkdown>{chat.content}</ReactMarkdown>
                </div>
              </div>
            ))}
          </>
        )}
        {generatingAnswer && (
          <div className="chatbot-thinking">
            <div className="chatbot-message-content chatbot-answer animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={generateAnswer} className="chatbot-input-form">
        <div className="chatbot-input-wrapper">
          <textarea
            required
            className="chatbot-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything..."
            rows="2"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                generateAnswer(e);
              }
            }}
          ></textarea>
          <button
            type="submit"
            className="chatbot-send-button"
            disabled={generatingAnswer}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatBot;
