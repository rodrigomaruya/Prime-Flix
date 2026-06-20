import { useEffect, useState } from "react";
import api from "../../server/api";
import { Link } from "react-router-dom";
import "./home.css";
import { ImageTopo } from "../../components/ImageTopo/ImageTopo";
import { SearchInput } from "../../components/Search/Search-input";

interface FilmesProps {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

function Home() {
  const [movies, setMovies] = useState<FilmesProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  useEffect(() => {
    async function getMovies() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          language: "pt-BR",
          page: page,
        },
      });
      setMovies(response.data.results);
      setLoading(false);
    }
    getMovies();

    return () => {
      console.log("componente desmontado");
    };
  }, [page]);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    );
  }
  return (
    <div className="container">
      <SearchInput />
      <div className="lista-filmes">
        {movies.map((movie) => {
          return (
            <article className="filmes" key={movie.id}>
              <strong className="title">{movie.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt="imagem"
              />
              <Link to={`/filme/${movie.id}`} className="link">
                Acessar
              </Link>
              <Link
                to={`https://embedplayapi.top/embed/${movie.id}`}
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Assistir
              </Link>
            </article>
          );
        })}
      </div>
      <ImageTopo />
      <div className="button-container">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Anterior
        </button>

        <span className="button-span">Página {page}</span>

        <button onClick={() => setPage((prev) => prev + 1)}>Próxima</button>
      </div>
    </div>
  );
}

export default Home;
