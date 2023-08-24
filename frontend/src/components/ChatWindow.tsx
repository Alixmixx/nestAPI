import React from "react";
import { MessageBox } from "./MessageBox";

interface ChatWindowProps {
	messages: [
		{
			sender: string;
			username: string;
			message: string;
		}
	];
  }

export default function ChatWindow({messages} : ChatWindowProps) {
	return (
		<section className="chat-window">
		  {messages.map((message, index) => (
			<MessageBox sender={messages.sender} username={username} message={message}/>
      ))}
		</section>
	)
}
