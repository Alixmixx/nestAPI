import React, { useEffect, useState } from "react";
import "./App.css";
import io, { Socket } from "socket.io-client";
import { MessageInput } from "./components/MessageInput";
import ChatWindow, { ChatWindowProps } from "./components/ChatWindow";
import { MessageProps } from "./components/Message";

function App() {
  const [socket, setSocket] = useState<Socket | undefined>(undefined); // Initialize socket as undefined
  const [messages, setMessages] = useState<ChatWindowProps["messages"]>([]);

  const send = (message: MessageProps) => {
    socket?.emit('message', { senderId: message.senderId, message: message.message});
  };

  useEffect(() => {
    const newSocket = io("http://localhost:8001");
    setSocket(newSocket);

    newSocket.emit('authenticate', { username: 'yourUsername'});
    // Clean up the socket on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    if (socket) {
      const messageListener = ({senderId, message} : { senderId: string; message: string }) => {
       console.log(senderId);
        const newMessage: MessageProps = {
          senderId: senderId,
          username: "username",
          message: message,
          posttime: "now",
        };

        setMessages((oldMessages) => [...oldMessages, newMessage]);
      };

      socket.on('message', messageListener);

      return () => {
        socket.off('message', messageListener);
      };
    }
  }, [socket]); // Make sure to include socket as a dependency

  console.log(messages);
  return (
    <div className="App">
      <section className="chatbox">
        <ChatWindow messages={messages} />
        <MessageInput user="Me" send={send} />
      </section>
    </div>
  );
}

export default App;
