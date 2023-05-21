import { useDispatch, useSelector } from "react-redux";
import { HiOutlinePaperClip } from "react-icons/hi";
import { RiSendPlaneFill } from "react-icons/ri";
import socket from "../../../Socket";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { setChatMessages } from "features/chat/chatSlice";
import { fetchChatMessages } from "features/chat/chatActions";
import { columnsDataComplex } from "../default/variables/columnsData";
import { addChatMessage } from "features/chat/chatSlice";
import { ThreeDots } from "react-loader-spinner";

function Chat() {
  const [update, setUpdate] = useState(false);
  const [room, setRoom] = useState("");
  console.log("ROOM ID: ", room);
  const [userIsTyping, setUserIsTyping] = useState({
    userWhichIsTyping: "",
    typing: false,
  });
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      senderMessage: "",
    },
  });
  const dispatch = useDispatch();

  console.log("Someone is typing::: ", userIsTyping);

  // Getting userInfo through useSelector
  const { userInfo } = useSelector((state) => state.auth);
  console.log("USE SELECTOR user: ", userInfo);

  // Getting data through useSelector to show on a UI
  const { chatMessages } = useSelector((state) => state.chat);
  console.log("USE SELECTOR Chat <<>>>", chatMessages);

  // Handle receiving new messages
  useEffect(() => {
    socket.emit("joinRoom", "123");

    dispatch(
      fetchChatMessages({
        sender: userInfo["_id"],
        receiver: "64688d0ec3fe9678234c4916",
      })
    );

    console.log("====================================");
    console.log("UseEffect 1st");
    console.log("====================================");

    // socket.on("newMessage", (data) => {
    //   console.log("Data receiving from server 2nd effect: ", data);
    //   // Dispatching chat data to our chatSlice to maintain state
    //   dispatch(
    //     fetchChatMessages({
    //       sender: userInfo["_id"],
    //       receiver: "64688d0ec3fe9678234c4916",
    //     })
    //   );
    // });

    socket.on("newMessage", (data) => {
      console.log("Data receiving from server ..: ", data);
      // Dispatching chat data to our chatSlice to maintain state
      dispatch(
        fetchChatMessages({
          sender: userInfo["_id"],
          receiver: "64688d0ec3fe9678234c4916",
        })
      );
      socket.emit("userAcknowledgeMsgReceived", { mydata: "ack" });
      // setUpdate(!update);
    });

    // Listen for the userIsTyping event from the server
    socket.on("userIsTyping", (data) => {
      setUserIsTyping(data);
      console.log("Someone in the room is typing");
      // Perform any desired actions when someone is typing in the room
    });

    return () => {
      socket.off("disconnect");
    };

    // socket.on("newMessage", (data) => {
    //   console.log("Data receiving from server: ", data);
    //   // Dispatching chat data to our chatSlice to maintain state
    //   // dispatch(addChatMessage(data));
    //   dispatch(
    //     fetchChatMessages({
    //       sender: userInfo["_id"],
    //       receiver: "64688d0ec3fe9678234c4916",
    //     })
    //   );
    // });
    // Cleanup the event listener when the component unmounts
  }, []);

  useEffect(() => {
    // const roomId = Math.random().toString(36).substr(2, 5);
    // setRoom(roomId);
    // socket.on("newMessage", (data) => {
    //   console.log("Data receiving from server 2nd effect: ", data);
    //   // Dispatching chat data to our chatSlice to maintain state
    //   // dispatch(addChatMessage(data));
    //   // dispatch(
    //   //   fetchChatMessages({
    //   //     sender: userInfo["_id"],
    //   //     receiver: "64688d0ec3fe9678234c4916",
    //   //   })
    //   // );
    // });
    // return () => {
    //   socket.off("disconnect");
    // };
  }, []);
  // console.log("updated after effect")

  const onSubmit = (data) => {
    console.log("Data inside onSubmit client", data);
    // Send chat message
    socket.emit("sendMessage", {
      sender: userInfo._id,
      receiver: "64688d0ec3fe9678234c4916",
      content: data.senderMessage,
    });
    socket.emit("userTyping", {
      userWhichIsTyping: userInfo["_id"],
      userisTyping: false,
    });
    reset();
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  const handleUserTyping = (e) => {
    console.log("user is typing client");
    socket.emit("userTyping", {
      userWhichIsTyping: userInfo["_id"],
      userisTyping: true,
    });
  };

  const convertIntoFormattedTime = (time) => {
    const timestamp = time;
    const date = new Date(timestamp);
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);

    return formattedTime;
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
          {chatMessages?.map((element, index) => {
            return (
              <>
                {element.sender === userInfo._id ? (
                  // {/* Sender Message */}
                  <div className="flex items-center justify-end gap-2">
                    <div className="flex flex-col items-end rounded-lg bg-blue-500 p-2 text-white">
                      <span className="text-md">{element.content}</span>
                      <span className="text-sm text-gray-100">
                        {convertIntoFormattedTime(element.timestamp)}
                      </span>
                    </div>
                    <img
                      src="https://i.postimg.cc/t1WmCp3h/frame-108-2x.png"
                      alt="Receiver"
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                ) : (
                  // {/* Receiver Message */}
                  <div className="flex items-center justify-start">
                    <img
                      src="https://i.postimg.cc/t1WmCp3h/frame-108-2x.png"
                      alt="Receiver"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-2 flex flex-col  items-start rounded-lg bg-gray-200 p-2">
                      <span className="text-md">{element.content}</span>
                      <span className="text-sm text-gray-600">
                        {convertIntoFormattedTime(element.timestamp)}
                      </span>
                    </div>
                  </div>
                )}
              </>
            );
          })}
          {/* Display three dots if opponent is typing */}
          {userIsTyping.userWhichIsTyping !== userInfo._id &&
            userIsTyping.typing === true && (
              <ThreeDots
                height={50}
                width={50}
                radius={10}
                color="#BEBEBE"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            )}
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
              onChange={handleUserTyping}
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
