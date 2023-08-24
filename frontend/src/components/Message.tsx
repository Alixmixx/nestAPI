import React from "react";

interface MessageProps {
  message: string;
}

export default function Message({ message }: MessageProps) {
  return (
    <div>
      <div className="messages">
        <p className="msg" id="msgID">
          {message}
        </p>
      </div>
    </div>
  );
}
