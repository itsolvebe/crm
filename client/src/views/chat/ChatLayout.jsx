import React from "react";
import Messages from "./Messages";

import "./ChatLayout.css";
import Chat from "./Chat";
import ChatFiles from "./ChatFiles";

function ChatLayout() {
  return (
    <div className="flex h-screen rounded-lg bg-white font-poppins shadow-sm">
      {/* First column  */}
      <Messages />

      {/* Second Column */}
      <Chat />

      {/* Third Columns  */}
      <ChatFiles />
    </div>
  );
}

export default ChatLayout;
 