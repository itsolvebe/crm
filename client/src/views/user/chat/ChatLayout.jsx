import React from "react";
import Messages from "./Messages";

import "./ChatLayout.css";
import Chat from "./Chat";
import ChatFiles from "./ChatFiles";
import Modal from "./components/Modal";
import { useSelector } from "react-redux";

function ChatLayout() {
  const isOpen = useSelector((state) => state.modal.isOpen);
  return (
    <>
      {isOpen && <Modal />}
      <div className="flex h-screen rounded-lg bg-white font-poppins shadow-sm dark:bg-navy-800">
        {/* First column  */}
        <Messages />

        {/* Second Column */}
        <Chat />

        {/* Third Columns  */}
        <ChatFiles />
      </div>
    </>
  );
}

export default ChatLayout;
