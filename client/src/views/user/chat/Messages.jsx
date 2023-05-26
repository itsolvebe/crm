import { BsPlusCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getClientTickets } from "features/tickets/ticketActions";
import { openModal } from "features/tickets/ticketSlice";
import { Link } from "react-router-dom";

const TicketCard = ({ ticket }) => {
  // Handle Ticket chat
  const handleTicketChats = () => {
    // alert("Clicked")
    console.log("Tickets Data : ", ticket);
  };
  return (
    <Link to={ticket._id}>
    <div
      className="flex gap-2 border-b p-1 pb-2 hover:bg-[#F6F6FE]"
      onClick={handleTicketChats}
    >
      <div>
        <img
          alt="person"
          src={"https://i.postimg.cc/t1WmCp3h/frame-108-2x.png"}
          width={48}
          height={48}
        />
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <span className="text-sm font-semibold">#{ticket._id.slice(0, 6)}</span>
        <div>
          <span className="text-xs text-gray-500">
            {" "}
            {ticket.deadline.slice(0, 10)}
          </span>
        </div>
      </div>
      <div className="1">
        <span className="text-xs font-semibold text-gray-500"></span>
      </div>
    </div>
    </Link>
  );
};

function Messages() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { ticketInfo } = useSelector((state) => state.ticket);

  useEffect(() => {
    dispatch(getClientTickets(userInfo._id));
  }, []);

  console.log(ticketInfo);

  const handleOpen = () => {
    dispatch(openModal());
  };

  return (
    <div className=" flex w-full flex-col gap-4 border-r px-4 md:w-4/5 lg:w-1/5">
      <div className=" flex items-center justify-between gap-2 border-b border-gray-200  px-2 py-6">
        <div className="flex items-center gap-3">
          <span className="font-semibold">Tickets</span>
          <span className="rounded-lg bg-[#EDF2F7] px-2 py-0.5 text-xs font-semibold ">
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
      <div className="hideScrollBar mt-2 flex flex-col  gap-4  overflow-y-auto">
        {ticketInfo.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}

export default Messages;
