import { Link } from "react-router-dom";
import "./error.css";

export function Erro() {
  return (
    <div className="not-found">
      <h1>Not Found 404</h1>
      <Link to={"/"}>Veja todos os filmes</Link>
    </div>
  );
}
