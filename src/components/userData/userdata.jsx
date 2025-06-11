import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function UserTag() {
  const [userFound, setUserFound] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageLink, setImageLink] = useState("");

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      const user = JSON.parse(userDetails);
      setUserFound(true);
      setName(`${user.firstName} ${user.lastName}`);
      setEmail(user.email);
      setImageLink(user.image || "https://www.w3schools.com/howto/img_avatar.png"); // fallback image
    }
  }, []);

  if (!userFound) return null;

  return (
    <div className="flex items-center gap-3 bg-blue-600 px-2 py-1 rounded-lg shadow text-white">
      <Link to="/customer" className="flex items-center gap-2">
        <img
          className="rounded-full w-10 h-10 border border-white object-cover"
          src={imageLink}
          alt="user"
        />
        <div className="flex flex-col text-sm">
          <span className="font-semibold">{name}</span>
          <span className="text-white text-xs">{email}</span>
        </div>
      </Link>

      {/* <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userDetails");
          setUserFound(false);
          window.location.href = "/login";
        }}
        className="bg-red-500 text-white text-sm px-3 py-1 rounded"
      >
        Logout
      </button> */}
    </div>
  );
}
