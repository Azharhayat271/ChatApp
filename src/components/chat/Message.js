import { format } from "timeago.js";
import { motion } from "framer-motion";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Message({ message, self }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={classNames(
        self !== message.sender ? "justify-start" : "justify-end",
        "flex"
      )}
    >
      <div>
        <div
          className={classNames(
            self !== message.sender
              ? "text-gray-700 dark:text-gray-400 bg-white border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700"
              : "bg-blue-600 dark:bg-blue-500 text-white",
            "relative max-w-xl px-4 py-2 rounded-lg shadow"
          )}
        >
          <span className="block font-normal ">{message.message}</span>
        </div>
        <span className="block text-sm text-gray-700 dark:text-gray-400">
          {format(message.createdAt)}
        </span>
      </div>
    </motion.li>
  );
}
