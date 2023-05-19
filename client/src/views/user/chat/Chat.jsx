import { useDispatch, useSelector } from "react-redux";
import { HiOutlinePaperClip } from "react-icons/hi";
import { RiSendPlaneFill } from "react-icons/ri";
import socket from "../../../Socket";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

function Chat() {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  
  const {userInfo} = useSelector((state) => state.auth);
  console.log("USE SELECTOR: ", userInfo)


  // Handle receiving new messages
  useEffect(() => {
    socket.on("newMessage", (data) => {
      console.log("Data receiving from server: ", data);
    });
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    // Send chat message
    socket.emit("sendMessage", { sender: userInfo._id, message: data.senderMessage });
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(onSubmit)(); 
    }
  };


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
              src={require("../../../assets/status/online-ellipse.png")}
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
        <div className="flex flex-1 flex-col justify-end gap-4  p-2">
          {/* Sender Message */}
          <div className="flex items-center justify-end gap-2">
            <div className="flex flex-col items-end rounded-lg bg-blue-500 p-2 text-white">
              <span className="text-md">Hi, this is the sender's message</span>
              <span className="text-sm text-gray-100">12:54PM</span>
            </div>
            <img
              src="https://i.postimg.cc/t1WmCp3h/frame-108-2x.png"
              alt="Receiver"
              className="h-10 w-10 rounded-full"
            />
          </div>

          {/* Receiver Message */}
          <div className="flex items-center justify-start">
            <img
              src="https://i.postimg.cc/t1WmCp3h/frame-108-2x.png"
              alt="Receiver"
              className="h-10 w-10 rounded-full"
            />
            <div className="ml-2 flex flex-col  items-start rounded-lg bg-gray-200 p-2">
              <span className="text-md">This is the receiver's message</span>
              <span className="text-sm text-gray-600">12:54PM</span>
            </div>
          </div>
        </div>

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
              onKeyDown={handleOnKeyDown}
              {...register("senderMessage")}
            />
            <RiSendPlaneFill
              className="text-blue-700 hover:text-blue-400"
              size={24}
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
