import { HiOutlinePaperClip } from "react-icons/hi";
import { RiSendPlaneFill } from "react-icons/ri";


function Chat() {
  return (
    <div className="hideScrollBar hidden w-3/5  flex-col  gap-4 overflow-auto border-r px-4 md:hidden lg:block">
      <div className="sticky top-0  flex items-center justify-start gap-2 border-b border-gray-200 bg-white px-2 py-6">
        <div>
          <img
            alt="person"
            src="https://i.postimg.cc/t1WmCp3h/frame-108-2x.png"
            width={38}
            height={38}
          />
        </div>
        <div>
          <div>
            <span className="text-md font-semibold">Elmer Laverty</span>
          </div>
          <div className="flex items-center justify-start gap-2">
            {/* If user is online then show Online icon otherwise no icon */}
            <img
            alt="online"
              src={require("../../assets/status/online-ellipse.png")}
              width={10}
              height={10}
            />
            <span className="text-xs">Online</span>
          </div>
        </div>
      </div>
      {/* Message container  */}
      <div className="flex h-full flex-col overflow-y-auto ">
        {/* Messages */}
        <div className="flex-1"> COntent</div>
        {/* Bottom Input container */}
        <div className="flex items-center justify-around gap-2  px-4">
          <label for="file_input">
            <HiOutlinePaperClip className="hover:text-blue-500 " size={24} />
            <input type="file" id="file_input" className="hidden" />
          </label>
          <div className="mx-3 my-2 flex w-full items-center justify-around rounded-lg border-2 bg-white p-2">
            <input
              type="text"
              className="w-5/6 px-1 py-1 focus:outline-none"
              placeholder="Write message"
            />
            <RiSendPlaneFill
              className="text-blue-700 hover:text-blue-400"
              size={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
