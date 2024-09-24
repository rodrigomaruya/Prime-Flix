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
  useEffect(() => {
    async function getMovies() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "8229b559098c57c11c99480f5e664170",
          language: "pt-BR",
          page: 1,
        },
      });
      setMovies(response.data.results);
      setLoading(false);
    }
    getMovies();

    return () => {
      console.log("componente desmontado");
    };
  }, []);

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
            </article>
          );
        })}
      </div>
      <ImageTopo />
    </div>
  );
}

export default Home;
