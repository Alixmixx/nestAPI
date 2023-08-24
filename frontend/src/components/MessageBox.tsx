import React from "react";
import Message from "./Message";

interface MessageBoxProps {
  sender: string;
  username: string;
  message: string;
}

export function MessageBox({ sender, username, message }: MessageBoxProps) {
  // user
  return (
    <div>
      <article
        className={
          sender === username
            ? "msg-container msg-self"
            : "msg-container msg-remote"
        }
        id="msg-0"
      >
        <div className="msg-box">
          <img
            className="user-img"
            id={username}
            src="https://ih1.redbubble.net/image.1329995133.5500/st,small,507x507-pad,600x600,f8f8f8.jpg"
          />
          <div className="flr">
            <Message message={message} />
          </div>
        </div>
      </article>
    </div>
  );
}
