import React from "react";
import Timestamp from "./Timestamp";

export interface MessageProps {
  sender: string;
  username: string;
  message: string;
  posttime: string;
}

export default function Message({ username, message, posttime }: MessageProps) {
  return (
    <div>
      <div className="messages">
        <p className="msg" id="msgID">
          {message}
        </p>
      </div>
      <Timestamp username={username} posttime={posttime} />
    </div>
  );
}
