const TicketCard = ({ ticket }) => {
  return (
    <div className="flex gap-2 border-b p-1 pb-2 hover:bg-[#F6F6FE]">
      <div>
        <img
          alt="person"
          className="rounded-full"
          src={"https://i.postimg.cc/t1WmCp3h/frame-108-2x.png"}
          width={48}
          height={48}
        />
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <span className="text-sm font-semibold">#{ticket._id.slice(-6)}</span>
        <div>
          <span className="text-xs text-gray-500">
            {ticket.deadline.slice(0, 10)}
          </span>
        </div>
      </div>
      <div className="1">
        <span className="text-xs font-semibold text-gray-500"></span>
      </div>
    </div>
  );
};

export default TicketCard;
