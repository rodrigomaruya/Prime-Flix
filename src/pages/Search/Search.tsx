import "./search.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../server/api";

interface FilmesProps {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}
export function Search() {
  const { search } = useParams();
  const [searchResults, setSearchResults] = useState<FilmesProps[]>([]);

  useEffect(() => {
    async function getSearch() {
      const result = await api(`/search/movie?query=${search}`, {
        params: {
          api_key: "8229b559098c57c11c99480f5e664170",
          language: "pt-BR",
          query: search,
        },
      });
      setSearchResults(result.data.results);
    }

    getSearch();
    return () => {
      console.log("componente desmontado");
    };
  }, [search]);

  return (
    <div className="search">
      <div className="search-logo">
        <h1>
          {searchResults.length} resultados encontrados para: {search}
        </h1>
      </div>
      <div className="lista-filmes">
        {searchResults.map((searchMovie) => {
          return (
            <article key={searchMovie.id} className="filmes">
              <strong className="title">{searchMovie.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original${searchMovie.poster_path}`}
                alt="imagem"
              />
              <Link to={`/filme/${searchMovie.id}`} className="link">
                Acessar
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
