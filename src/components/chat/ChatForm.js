import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import Picker from "emoji-picker-react";

export default function ChatForm(props) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [showEmojiPicker]);

  const handleEmojiClick = (event, emojiObject) => {
    let newMessage = message + emojiObject.emoji;
    setMessage(newMessage);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    props.handleFormSubmit(message);
    setMessage("");
  };

  return (
    <motion.div ref={scrollRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <AnimatePresence>
        {showEmojiPicker && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 left-4 bg-white dark:bg-gray-900 p-2 rounded-lg shadow-lg z-10"
          >
            <Picker onEmojiClick={handleEmojiClick} />
          </motion.div>
        )}
      </AnimatePresence>
      <form onSubmit={handleFormSubmit} className="relative">
        <div className="flex items-center justify-between w-full p-3 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-lg shadow-md">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              setShowEmojiPicker(!showEmojiPicker);
            }}
            className="focus:outline-none"
          >
            <EmojiHappyIcon className="h-7 w-7 text-blue-600 dark:text-blue-500" aria-hidden="true" />
          </motion.button>

          <motion.input
            type="text"
            placeholder="Write a message"
            className="block w-full py-2 pl-4 mx-3 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 50 }}
          />

          <motion.button type="submit" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="focus:outline-none">
            <PaperAirplaneIcon className="h-6 w-6 text-blue-600 dark:text-blue-500 rotate-[90deg]" aria-hidden="true" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
