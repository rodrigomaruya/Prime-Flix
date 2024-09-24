import "./header.css";
import { Link } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import { FaHome } from "react-icons/fa";

function Header() {
  return (
    <header>
      <div className="container_header">
        <Link className="logo" to={"/"}>
          Prime Flix
        </Link>
        <div className="links">
          <Link to={"/favoritos"}>
            <MdFavorite />
            Favoritos
          </Link>
          <Link to={"/"}>
            <FaHome />
            Home
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
