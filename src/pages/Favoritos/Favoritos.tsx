import { useState, useEffect } from "react";
import "./favoritos.css";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

interface FilmesProps {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
}
export function Favoritos() {
  const [favoritos, setFavoritos] = useState<FilmesProps[]>([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@primeflix");
    if (minhaLista === null) {
      return console.log("favoritos vazio");
    }
    setFavoritos(JSON.parse(minhaLista) || []);
  }, []);

  const handleRemove = (id: number) => {
    const favoritosFiltrados = favoritos.filter(
      (favoritos) => favoritos.id !== id
    );
    setFavoritos(favoritosFiltrados);
    localStorage.setItem("@primeflix", JSON.stringify(favoritosFiltrados));

    toast.success("Filme removido com sucesso");
  };

  return (
    <div className="favoritos-container">
      <h1>Favoritos</h1>

      <ul>
        {favoritos.length === 0 && (
          <p style={{ color: "#fff" }}>Você não tem nenhum filme salvo :(</p>
        )}
        {favoritos.map((favoritos) => {
          return (
            <li key={favoritos.id}>
              <span>{favoritos.title}</span>
              <div>
                <Link to={`/filme/${favoritos.id}`}>Ver detalhes</Link>
              </div>
              <button type="button" onClick={() => handleRemove(favoritos.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
