import React, { useEffect, useState } from "react";
import { getUser } from "../../api/UserRequest";
import { useDispatch } from "react-redux";

const Conversation = ({ data, currentUserId, online }) => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
        console.log("Second user", data);
        dispatch({ type: "SAVE_USER", data: data });
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <a className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
        <img
          className="object-cover w-10 h-10 rounded-full"
          src="https://res.cloudinary.com/dzhvw7vxn/image/upload/v1657571812/Icct-portal/user_2_c76pse.png"
          alt="username"
        />
        <div className="w-full pb-2">
          <div className="flex justify-between">
            <span className="block ml-2 font-semibold text-gray-600">
              {userData?.name}
            </span>
            {online ? (
              <span className="block ml-2 text-sm text-gray-600">
                Active &#128994;
              </span>
            ) : (
              <span className="block ml-2 text-sm text-gray-600">
                Offline &#128308;
              </span>
            )}
          </div>
        </div>
      </a>
    </>
  );
};

export default Conversation;
