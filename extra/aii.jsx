import { useState } from "react";

export default function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "bot", content: data.reply },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: "bot", content: "Error connecting to server" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-20 right-5 w-80 bg-white shadow-lg rounded-lg p-3 z-[9999]">
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Chatbox</h3>
        {/* <button onClick={() => setChatOpen(false)}>Close</button> */}
      </div>

      {/* Chat Messages */}
      <div
        style={{
          height: "300px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "10px",
          background: "#f9f9f9",
          marginTop: "10px"
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              margin: "10px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "15px",
                background:
                  msg.role === "user" ? "#007bff" : "#e5e5ea",
                color: msg.role === "user" ? "#fff" : "#000",
              }}
            >
              {msg.content}
            </span>
          </div>
        ))}

        {loading && <p>Typing...</p>}
      </div>

      {/* Input Box */}
      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />

        <button
          onClick={sendMessage}
          style={{
            marginLeft: "5px",
            padding: "10px 15px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}