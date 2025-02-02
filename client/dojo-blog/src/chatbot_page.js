// ChatBotPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatBotPage = () => {
  const { id } = useParams();
  const [building, setBuilding] = useState(null);
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/builder/${id}`);
        setBuilding(response.data);
      } catch (error) {
        console.error("Error fetching building details:", error);
      }
    };

    fetchBuilding();
  }, [id]);

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const response = await axios.post("http://localhost:4000/api/ai-chatbot", { query });
      console.log(response);
      setResponses((prev) => [...prev, { question: query, answer: response.data.reply }]);
      setQuery(""); // Clear the input after submission
    } catch (error) {
      console.error("Error fetching response from LLM:", error);
    }
  };

  return (
    <div className="chatbot-container">
      {building ? (
        <div className="building-details">
          <h2>{building.society_name}</h2>
          <img src={building.image} alt={building.society_name} />
          <p><strong>Email:</strong> {building.email}</p>
          <p><strong>Contact:</strong> {building.contactNumber}</p>
          <p><strong>Address:</strong> {building.address}</p>
          <p><strong>Description:</strong> {building.description}</p>
        </div>
      ) : (
        <p>Loading building details...</p>
      )}

      <div className="ai-chatbot">
        <h3>Chat with our AI Assistant!</h3>
        <form onSubmit={handleQuerySubmit} className="chat-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask something about this property..."
            className="chat-input"
          />
          <button type="submit" className="send-btn">Send</button>
        </form>

        <div className="chat-responses">
          {responses.map((res, index) => (
            <div key={index} className="chat-bubble">
              <p><strong>You:</strong> {res.question}</p>
              <p><strong>AI:</strong> {res.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage;
