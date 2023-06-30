import React from "react";
import Messages from "./components/Messages";
import "./StaffChatLayout.css";
import Chat from "./components/Chat";
import ChatFiles from "./components/ChatFiles";
import Modal from "./components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getClientTickets } from "features/tickets/ticketActions";

function StaffChatLayout() {
  const isOpen = useSelector((state) => state.ticket.modalIsOpen);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // if (!isOpen) {
  //   dispatch(getClientTickets(userInfo._id));
  // }
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

export default StaffChatLayout;
