import { Link } from "react-router-dom";
import "./linkHome.css";
import { FaHome } from "react-icons/fa";

export const LinkHome = () => {
  return (
    <Link to={"/"}>
      <FaHome />
    </Link>
  );
};
