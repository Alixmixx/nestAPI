import { useEffect, useState } from "react";
import "./App.css";
import io, { Socket } from "socket.io-client";
import { MessageInput } from "./components/MessageInput";
import { Messages } from "./components/Messages";
import ChatWindow, { ChatWindowProps } from "./components/ChatWindow";
import { MessageProps } from "./components/Message";

function App() {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<ChatWindowProps["messages"]>([]);

  const send = (value: string) => {
    socket?.emit("message", value);
  };

  useEffect(() => {
    const newSocket = io("http://localhost:8001");
    setSocket(newSocket);
  }, [setSocket]);

  const messageListener = (value: string) => {
    const newMessage: MessageProps = {
      sender: "user",
      username: "username",
      message: value,
      posttime: "now",
    };

    setMessages((oldMessages) => [...oldMessages, newMessage]);
  };

  useEffect(() => {
    socket?.on("message", messageListener);
    return () => {
      socket?.off("message", messageListener);
    };
  }, [messageListener]);

  return (
    <>
      <body>
        <section className="chatbox">
          <ChatWindow messages={messages} />
          <MessageInput send={send} />
        </section>
      </body>
    </>
  );
}

export default App;
