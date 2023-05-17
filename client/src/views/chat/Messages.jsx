import { BsPlusCircleFill } from "react-icons/bs";

function Messages() {
  return (
    <div className=" flex w-full flex-col gap-4 border-r px-4 md:w-4/5 lg:w-1/5">
      <div className=" flex items-center justify-between gap-2 border-b border-gray-200  px-2 py-6">
        <div className="flex items-center gap-3">
          <span className="font-semibold">Messages</span>
          <span className="rounded-lg bg-[#EDF2F7] px-2 py-0.5 text-xs font-semibold ">
            3
          </span>
        </div>
        <div>
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
        <div className="flex gap-2 border-b p-1 pb-2 hover:bg-[#F6F6FE]">
          <div>
            <img
              alt="person"
              src={"https://i.postimg.cc/t1WmCp3h/frame-108-2x.png"}
              width={48}
              height={48}
            />
          </div>
          <div className="flex flex-1 flex-col justify-center">
            <span className="text-sm font-semibold">Elmer Laverty</span>
            <div>
              {/* Messages */}
              <span className="text-xs text-gray-500">Haha okay</span>
            </div>
          </div>
          <div className="1">
            <span className="text-xs font-semibold text-gray-500">12m</span>
          </div>
        </div>
        <div className="flex gap-2 border-b p-1 pb-2  hover:bg-[#F6F6FE]">
          <div>
            <img
              alt="person"
              src={"https://i.postimg.cc/t1WmCp3h/frame-108-2x.png"}
              width={48}
              height={48}
            />
          </div>
          <div className="flex flex-1 flex-col justify-center">
            <span className="text-sm font-semibold">Elmer Laverty</span>
            <div>
              {/* Messages */}
              <span className="text-xs text-gray-500">Haha okay</span>
            </div>
          </div>
          <div className="1">
            <span className="text-xs font-semibold text-gray-500">12m</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
