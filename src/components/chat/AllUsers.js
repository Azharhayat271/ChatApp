import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createChatRoom } from "../../services/ChatService";
import Contact from "./Contact";
import UserLayout from "../layouts/UserLayout";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AllUsers({
  users,
  chatRooms,
  setChatRooms,
  onlineUsersId,
  currentUser,
  changeChat,
}) {
  const [selectedChat, setSelectedChat] = useState();
  const [nonContacts, setNonContacts] = useState([]);
  const [contactIds, setContactIds] = useState([]);

  useEffect(() => {
    const Ids = chatRooms.map((chatRoom) => {
      return chatRoom.members.find((member) => member !== currentUser.uid);
    });
    setContactIds(Ids);
  }, [chatRooms, currentUser.uid]);

  useEffect(() => {
    setNonContacts(
      users.filter(
        (f) => f.uid !== currentUser.uid && !contactIds.includes(f.uid)
      )
    );
  }, [contactIds, users, currentUser.uid]);

  const changeCurrentChat = (index, chat) => {
    setSelectedChat(index);
    changeChat(chat);
  };

  const handleNewChatRoom = async (user) => {
    const members = {
      senderId: currentUser.uid,
      receiverId: user.uid,
    };
    const res = await createChatRoom(members);
    setChatRooms((prev) => [...prev, res]);
    changeChat(res);
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="overflow-auto h-[30rem] p-4"
        >
          <h2 className="my-2 mb-4 text-gray-900 dark:text-white text-lg font-semibold border-b pb-2">
            Chats
          </h2>
          <li>
            {chatRooms.map((chatRoom, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={classNames(
                  index === selectedChat
                    ? "bg-gray-200 dark:bg-gray-700 border-l-4 border-blue-500"
                    : "transition duration-150 ease-in-out cursor-pointer bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700",
                  "flex items-center px-3 py-2 text-sm shadow-sm rounded-lg mb-2"
                )}
                onClick={() => changeCurrentChat(index, chatRoom)}
              >
                <Contact
                  chatRoom={chatRoom}
                  onlineUsersId={onlineUsersId}
                  currentUser={currentUser}
                />
              </motion.div>
            ))}
          </li>
          <h2 className="my-4 text-gray-900 dark:text-white text-lg font-semibold border-b pb-2">
            Other Users
          </h2>
          <li>
            {nonContacts.map((nonContact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center px-3 py-2 text-sm bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer shadow-sm rounded-lg mb-2"
                onClick={() => handleNewChatRoom(nonContact)}
              >
                <UserLayout user={nonContact} onlineUsersId={onlineUsersId} />
              </motion.div>
            ))}
          </li>
        </motion.ul>
      </div>
    </div>
  );
}
