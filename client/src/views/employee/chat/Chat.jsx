import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlinePaperClip } from "react-icons/hi";
import { RiSendPlaneFill } from "react-icons/ri";
import socket from "../../../Socket";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// import { setChatMessages } from "features/chat/chatSlice";
import { fetchChatMessages } from "features/chat/chatActions";
// import { columnsDataComplex } from "../default/variables/columnsData";
// import { addChatMessage } from "features/chat/chatSlice";
import { ThreeDots } from "react-loader-spinner";
import { FiDownload } from "react-icons/fi";
import PdfIcon from "../../../assets/files/pdf-icon.svg";
import DocIcon from "../../../assets/files/doc-icon.svg";
import GalleryIcon from "../../../assets/files/gallery-icon.svg";
import CodeIcon from "../../../assets/files/code-icon.svg";
import { openModal } from "features/tickets/ticketSlice";
import { BsPlusCircleFill } from "react-icons/bs";
import UserCard from "./components/UserCard";

function Chat({ ticket }) {
  const [userIsTyping, setUserIsTyping] = useState({
    userWhichIsTyping: Array.from(new Set()),
  });
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      senderMessage: "",
    },
  });

  console.log("TICKET CHAT: from props : : ", ticket["_id"]);

  const dispatch = useDispatch();
  console.log("Someone is typing USESTATE:::  >> ", userIsTyping);

  // Getting userInfo through useSelector
  const { userInfo } = useSelector((state) => state.auth);
  console.log("USE SELECTOR user: ", userInfo);

  // Getting data through useSelector to show on a UI
  const { chatParticipants, chatMessages } = useSelector((state) => state.chat);
  console.log("USE SELECTOR Chat <<>>>", chatMessages);
  console.log("USE SELECTOR Participants <<>>>", chatParticipants);

  const opponentUserId = chatParticipants.filter((e) => e !== userInfo["_id"]);
  // console.log("OpponentUserId: ", ...opponentUserId);

  useEffect(() => {
    console.log("USEFFECTT");
    // Send info about user who joined room
    socket.emit("joinRoom", "123");

    // Fetching and Adding data from DB to Redux Store
    dispatch(
      fetchChatMessages({
        ticketId: ticket["_id"],
      })
    );
    // dispatch(
    //   fetchChatMessages({
    //     ticketId: userInfo["_id"],
    //     receiver: "6462814d65f3f9c47e7cb2a6",
    //   })
    // );

    // Listening to the incoming message from recipient
    socket.on("newMessage", (data) => {
      console.log("Data receiving from server ..: ", data);
      // Dispatching chat data to our chatSlice to maintain state
      dispatch(
        fetchChatMessages({
          ticketId: ticket["_id"],
        })
      );
      // dispatch(
      //   fetchChatMessages({
      //     sender: userInfo["_id"],
      //     receiver: "6462814d65f3f9c47e7cb2a6",
      //   })
      // );

      // If message is received, we are sending acknowledgment message
      socket.emit("userAcknowledgeMsgReceived", { mydata: "acknowledged" });
    });

    // Listen for the userIsTyping event from the server
    socket.on("userIsTyping", (data) => {
      // Add info about user who is typing in the state
      setUserIsTyping((prevUserIsTyping) => ({
        ...prevUserIsTyping,
        userWhichIsTyping: [
          ...prevUserIsTyping.userWhichIsTyping,
          data.userWhichIsTyping,
        ],
      }));
      console.log("Someone in the room is typing bro");
    });

    // Listen for the userIsTyping event from the server
    socket.on("userIsNotTyping", (data) => {
      // Add info about user who is typing in the state
      setUserIsTyping((prevUserIsTyping) => ({
        ...prevUserIsTyping,
        userWhichIsTyping: prevUserIsTyping.userWhichIsTyping.filter(
          (elem) => elem !== data.userWhichIsTyping
        ),
      }));

      console.log("Someone in the room is typing");
    });
    // Cleanup the event listener when the component unmounts
    return () => {
      socket.off("disconnect");
    };
  }, [ticket]);

  const submitForm = (data) => {
    console.log("Input Ready: ", data);
    // If input is empty then it message cannot be sent
    if (data.senderMessage === "") {
      console.log("Sender message is empty");
      return toast.error("Can't Sent Empty Input");
    }
    console.log("Data inside submitForm client", data);
    // Send chat message
    socket.emit("sendMessage", {
      ticketId: ticket["_id"],
      sender: userInfo._id,
      // receiver: "64688d0ec3fe9678234c4916",
      content: data.senderMessage,
    });
    socket.emit("userNotTyping", {
      userWhichIsTyping: userInfo["_id"],
    });

    reset();
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      // Manually Update React Hook form value when press Enter Btn
      setValue("senderMessage", e.target.value);
      handleSubmit(submitForm)();
    }
  };

  const handleUserTyping = (e) => {
    console.log("Input: ", e.target.value);
    if (e.target.value.length === 1) {
      console.log("user is typing client .. ", e.target.value);
      socket.emit("userTyping", {
        userWhichIsTyping: userInfo["_id"],
      });
      return;
    }
    return;
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

  // Format client project deadline
  function formatDateTimeOfClientProjectDeadline(dateTimeString) {
    const dateTime = new Date(dateTimeString);

    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDateTime = dateTime.toLocaleString("en-US", options);
    return formattedDateTime;
  }

  return (
    <>
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
              <span className="text-md font-semibold">
                #{ticket._id.slice(0, 6)}
              </span>
            </div>
            <div className="flex items-center justify-start gap-2">
              {/* If user is online then show Online icon otherwise no icon */}
              {/* <img
                alt="online"
                src={require("../../../assets/status/online-ellipse.png")}
                width={10}
                height={10}
              />
              <span className="text-xs">Online</span> */}
            </div>
          </div>
        </div>
        {/* Message container  */}
        <div className="flex h-full flex-col overflow-y-auto ">
          <Toaster />
          {/* Messages */}
          <div className="flex flex-1 flex-col justify-end gap-4  p-2">
            {chatMessages?.map((element, index) => {
              return (
                <React.Fragment key={index}>
                  {element.sender === userInfo._id ? (
                    // Sender Message
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
                  ) : // Receiver Message

                  index === 0 ? (
                    <div className="flex items-center justify-start">
                      <img
                        src="https://i.postimg.cc/t1WmCp3h/frame-108-2x.png"
                        alt="Receiver"
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="ml-2 flex flex-col items-start rounded-lg bg-gray-200 p-2">
                        <span className="text-md">
                          SUBJECT: {JSON.parse(element.content).subject} <br />
                          Description: {
                            JSON.parse(element.content).description
                          }{" "}
                          <br />
                          Budget: {JSON.parse(element.content).budget} <br />
                          Deadline:{" "}
                          {formatDateTimeOfClientProjectDeadline(
                            JSON.parse(element.content).deadline
                          )}
                        </span>
                        <span className="text-sm text-gray-600">
                          {convertIntoFormattedTime(element.timestamp)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-start">
                      <img
                        src="https://i.postimg.cc/t1WmCp3h/frame-108-2x.png"
                        alt="Receiver"
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="ml-2 flex flex-col items-start rounded-lg bg-gray-200 p-2">
                        <strong className="text-md">
                          {element.sender.slice(-6)}
                        </strong>
                        <span className="text-md">{element.content}</span>
                        <span className="text-sm text-gray-600">
                          {convertIntoFormattedTime(element.timestamp)}
                        </span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
            {/* Display three dots if opponent is typing */}
            {userIsTyping.userWhichIsTyping.includes(...opponentUserId) && (
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
            <label htmlFor="file_input">
              <HiOutlinePaperClip className="hover:text-blue-500 " size={24} />
              <input type="file" id="file_input" className="hidden" />
            </label>
            <div className="mx-3 my-2 flex w-full items-center justify-around rounded-lg border-2 bg-white p-2">
              <input
                type="text"
                className="w-5/6 px-1 py-1 focus:outline-none"
                placeholder="Write message"
                {...register("senderMessage")}
                onChange={handleUserTyping}
                onKeyDown={handleOnKeyDown}
              />
              <RiSendPlaneFill
                className="text-blue-700 hover:text-blue-400"
                size={24}
                onClick={handleSubmit(submitForm)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden flex-col gap-4 px-4 md:flex md:w-2/5 lg:w-1/5">
        <div className=" flex items-center justify-center gap-2 border-b border-gray-200 py-6">
          <div className="flex items-center  justify-center">
            <span className="font-semibold">Ticket Members</span>
            {/* <div className="cursor-pointer" onClick={handleOpen}>
              <BsPlusCircleFill
                size={22}
                className="text-blue-500 hover:text-blue-400"
              />
            </div> */}
            {/* <span className="rounded-lg bg-[#EDF2F7] px-2 py-0.5 text-xs font-semibold ">
              8
            </span> */}
          </div>
        </div>

        <div className="hideScrollBar mt-2 flex flex-col  gap-4  overflow-y-auto">
          {ticket.members.map((member) => (
            <UserCard member={member} key={member._id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Chat;
