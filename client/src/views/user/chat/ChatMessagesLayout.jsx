import React from "react";
import ChatFiles from "./ChatFiles";
import Chat from "./Chat";

function ChatMessagesLayout({ ticket }) {
  return (
    <>
      <Chat ticket={ticket} />
      <ChatFiles ticket={ticket} />
    </>
  );
}

export default ChatMessagesLayout;
