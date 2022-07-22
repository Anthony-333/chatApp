import React, { useEffect, useRef, useState } from "react";
import { addMessage, getMessages } from "../../api/MessageRequest";
import { getUser } from "../../api/UserRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  //fetching data for the header of the chatbox
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  //fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  //Send Message
  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    const receiverId = chat.members.find((id) => id !== currentUser);

    setSendMessage({ ...message, receiverId });
    //send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  //always scroll to bottom
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <div className="hidden lg:col-span-2 lg:block">
        {chat ? (
          <div className="w-full">
            <div className="relative flex items-center p-3 border-b border-gray-300">
              <img
                className="object-cover w-10 h-10 rounded-full"
                src="https://res.cloudinary.com/dzhvw7vxn/image/upload/v1657571812/Icct-portal/user_2_c76pse.png"
                alt="username"
              />
              <span className="block ml-2 font-bold text-gray-600">
                {userData?.name}
              </span>
              <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
            </div>

            <div className="relative w-full overflow-y-auto h-[40rem]">
              {messages.map((message) => (
                <div
                  className="relative w-full p-2 overflow-y-auto"
                  ref={scroll}
                >
                  <ul className="space-y-2">
                    <li
                      className={
                        message.senderId === currentUser
                          ? "flex justify-end"
                          : "flex justify-start"
                      }
                    >
                      <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                        <span className="block">{message.text}</span>
                        <span className="block text-gray-400">
                          {format(message.createdAt)}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between w-full p-3 border-t border-gray-300 z-50">
              <InputEmoji value={newMessage} onChange={handleChange} />
              <button type="submit" onClick={handleSend}>
                <svg
                  className="w-5 h-5 text-blue-500 origin-center transform rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <span>Tap chat to start conversation...</span>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBox;
