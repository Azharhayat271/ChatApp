import { LogoutIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

import { useAuth } from "../../contexts/AuthContext";
import Logout from "../accounts/Logout";
import ThemeToggler from "./ThemeToggler";

export default function Header() {
  const [modal, setModal] = useState(false);

  const { currentUser } = useAuth();

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }} // Initial animation state
        animate={{ y: 0, opacity: 1 }} // Animation when component mounts
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }} // Animation configuration
        className="px-2 sm:px-4 py-2.5 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-900 text-sm rounded border dark:text-white"
      >
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <Link to="/" className="flex">
            <span className="self-center text-lg font-semibold whitespace-nowrap text-gray-900 dark:text-white">
              Chat App
            </span>
          </Link>
          <div className="flex md:order-2">
            <ThemeToggler />

            {currentUser && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }} // Scale up on hover
                  whileTap={{ scale: 0.9 }} // Scale down on tap
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5"
                  onClick={() => setModal(true)}
                >
                  <LogoutIcon className="h-8 w-8" aria-hidden="true" />
                </motion.button>

                <Link
                  to="/profile"
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-full text-sm p-2.5"
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }} // Scale up on hover
                    whileTap={{ scale: 0.9 }} // Scale down on tap
                    className="h-8 w-8 rounded-full"
                    src={currentUser.photoURL}
                    alt=""
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.nav>
      {modal && <Logout modal={modal} setModal={setModal} />}
    </>
  );
}
