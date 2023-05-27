import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientTickets } from "features/tickets/ticketActions";
import { openModal } from "features/tickets/ticketSlice";
import { BsPlusCircleFill } from "react-icons/bs";
import Modal from "./components/Modal";
import Chat from "./Chat";
import TicketCard from "./components/TicketCard";

function TicketChats() {
  const isOpen = useSelector((state) => state.ticket.modalIsOpen);
  const { userInfo } = useSelector((state) => state.auth);
  const { ticketInfo } = useSelector((state) => state.ticket);

  const [selectedTicket, setSelectedTicket] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientTickets(userInfo._id));
  }, []);

  const handleOpen = () => {
    dispatch(openModal());
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  if (!isOpen) {
    dispatch(getClientTickets(userInfo._id));
  }

  return (
    <>
      {isOpen && <Modal />}
      <div className="flex h-screen rounded-lg bg-white font-poppins shadow-sm dark:bg-navy-800">
        {/* First column  */}
        <div className="flex w-full flex-col gap-4 border-r px-4 md:w-4/5 lg:w-1/5">
          <div className="flex items-center justify-between gap-2 border-b border-gray-200 px-2 py-6">
            <div className="flex items-center gap-3">
              <span className="font-semibold">Tickets</span>
              <span className="rounded-lg bg-[#EDF2F7] px-2 py-0.5 text-xs font-semibold">
                3
              </span>
            </div>
            <div className="cursor-pointer" onClick={handleOpen}>
              <BsPlusCircleFill
                size={22}
                className="text-blue-500 hover:text-blue-400"
              />
            </div>
          </div>
          <div>
            <input
              className="w-full rounded-lg bg-[#F3F3F3] px-6 py-3 text-xs focus:outline-none"
              placeholder="Search messages"
            />
          </div>
          <div className="hideScrollBar mt-2 flex flex-col gap-4 overflow-y-auto">
            {ticketInfo.map((ticket) => (
              <div
                key={ticket._id}
                onClick={() => handleTicketClick(ticket)}
                className={`cursor-pointer ${
                  selectedTicket === ticket ? "bg-gray-200" : ""
                }`}
              >
                <TicketCard ticket={ticket} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-grow">
          {selectedTicket ? (
            <Chat ticket={selectedTicket} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>No ticket selected</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TicketChats;
