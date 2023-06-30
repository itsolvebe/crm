const UserCard = ({ member }) => {
  console.log("member: ", member);
  return (
    <div className="flex gap-2 border-b p-1 pb-2 hover:bg-[#F6F6FE]">
      <div>
        <img
          alt="person"
          src={"https://i.postimg.cc/t1WmCp3h/frame-108-2x.png"}
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <span className="text-sm font-semibold">
          {member.firstName.length > 6
            ? `${member.firstName.slice(0, 6)}...`
            : member.firstName}
        </span>
        <div>
          <span className="text-xs text-gray-500">
            {member.designation ? member.designation : "Designation"}
          </span>
        </div>
      </div>
      <div className="1">
        <span className="text-xs font-semibold text-green-600">Online</span>
      </div>
    </div>
  );
};

export default UserCard;
