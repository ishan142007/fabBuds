import { useState } from "react";

export default function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const API_KEY = "YOUR_API_KEY";

    const sendMessage = async () => {
        if (!input) return;

        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        setInput("");

        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + API_KEY
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: newMessages
            })
        });

        const data = await res.json();

        setMessages([
            ...newMessages,
            { role: "assistant", content: data.choices[0].message.content }
        ]);
    };

    return (
        <div style={{
            background: "#f5f5f5",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div style={{
                width: "400px",
                height: "600px",
                background: "#fff",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)"
            }}>
                <div style={{
                    padding: "15px",
                    borderBottom: "1px solid #ddd",
                    textAlign: "center",
                    fontWeight: "bold"
                }}>
                    FabBots AI
                </div>

                <div style={{
                    flex: 1,
                    padding: "10px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    {messages.map((msg, i) => (
                        <div key={i} style={{
                            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                            background: msg.role === "user" ? "#e3f2fd" : "#eee",
                            padding: "10px",
                            borderRadius: "8px",
                            margin: "5px 0",
                            maxWidth: "80%"
                        }}>
                            {msg.content}
                        </div>
                    ))}
                </div>

                <div style={{ display: "flex", borderTop: "1px solid #ddd" }}>
                    <input
                        style={{ flex: 1, padding: "10px", border: "none", outline: "none" }}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button
                        style={{
                            padding: "10px 15px",
                            border: "none",
                            background: "#2196f3",
                            color: "#fff",
                            cursor: "pointer"
                        }}
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}