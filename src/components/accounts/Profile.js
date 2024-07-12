import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { generateAvatar } from "../../utils/GenerateAvatar";
import illustration from "../../assests/profile.gif"; // Add your illustration file here

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState();
  const [loading, setLoading] = useState(false);
  const { currentUser, updateUserProfile, setError } = useAuth();

  useEffect(() => {
    const fetchData = () => {
      const res = generateAvatar();
      setAvatars(res.slice(0, 4)); // Display only the first 4 avatars
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (selectedAvatar === undefined) {
      return setError("Please select an avatar");
    }
    try {
      setError("");
      setLoading(true);
      const user = currentUser;
      const profile = {
        displayName: username,
        photoURL: avatars[selectedAvatar],
      };
      await updateUserProfile(user, profile);
      navigate("/");
    } catch (e) {
      setError("Failed to update profile");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white rounded-lg shadow-lg p-8"
      >
        <div className="text-center">
          <motion.img
            src={illustration}
            alt="Illustration"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto h-40 w-40"
          />
          <h2 className="mt-4 text-3xl text-center tracking-tight font-light text-gray-800">
            Pick an avatar
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div className="flex flex-wrap -m-1 md:-m-2 justify-center">
            {avatars.map((avatar, index) => (
              <motion.div
                key={index}
                className="flex flex-wrap w-1/2 p-1 md:p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  alt="gallery"
                  className={classNames(
                    index === selectedAvatar
                      ? "border-4 border-blue-700 dark:border-blue-700"
                      : "cursor-pointer hover:border-4 hover:border-blue-700",
                    "block object-cover object-center w-36 h-36 rounded-full"
                  )}
                  src={avatar}
                  onClick={() => setSelectedAvatar(index)}
                />
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-md shadow-sm -space-y-px"
          >
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md focus:z-10 sm:text-sm"
              placeholder="Enter a Display Name"
              defaultValue={currentUser.displayName && currentUser.displayName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              {loading ? "Updating..." : "Update Profile"}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
