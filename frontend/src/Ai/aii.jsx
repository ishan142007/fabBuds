import { useState } from "react";

export default function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim())
     return;

    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/chat", {
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
      
    
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">FabBot</h3>
   
      </div>

      
      <div className="h-[300px] overflow-y-auto border border-gray-300 p-3 rounded-lg bg-gray-100 mt-2">
        {/* <h6>I Am here to help you</h6> */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-2 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-2 py-2 rounded-xl text-sm ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}

        {loading && (
          <p className="text-sm text-gray-500">Typing...</p>
        )}
      </div>

      {/* Input Box */}
      <div className="flex mt-2">
        <input
          className="flex-1 p-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />

        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}