import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../server/api";
import "./filmes.css";

import { toast } from "react-toastify";
interface FilmesProps {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
}

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<FilmesProps>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMoviesDetails() {
      await api
        .get(`movie/${id}`, {
          params: {
            api_key: "8229b559098c57c11c99480f5e664170",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setDetail(response.data);
        })
        .catch(() => {
          navigate("/", { replace: true });
        });

      setLoading(false);
    }
    getMoviesDetails();

    return () => {
      console.log("componente desmontado");
    };
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando detalhes...</h2>
      </div>
    );
  }

  const handleSave = () => {
    if (detail) {
      const myList = localStorage.getItem("@primeflix");
      const myListMovies: FilmesProps[] = myList ? JSON.parse(myList) : [];
      const hasMovie = myListMovies.some(
        (filmesSalvos) => filmesSalvos.id === detail?.id
      );
      if (hasMovie) {
        toast.warning("Esse filme já foi salvo");
        return;
      }

      myListMovies.push(detail);
      localStorage.setItem("@primeflix", JSON.stringify(myListMovies));
      toast.success("Filme salvo com sucesso");
    }
  };
  return (
    <div className="container_details">
      <article className="details">
        <h1>{detail?.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/original/${detail?.backdrop_path}`}
          alt={detail?.title}
        />
        <strong className="strong">Sinopse</strong>
        <p>{detail?.overview}</p>
        <strong className="strong">
          Avaliação: {detail?.vote_average.toFixed(1)} / 10
        </strong>
        <div className="buttons">
          <button type="button" onClick={handleSave}>
            Salvar
          </button>
          <button type="button">
            <a
              target="blank"
              rel="noreferrer"
              href={`https://youtube.com/results?search_query=${detail?.title} Trailer`}
            >
              Trailer
            </a>
          </button>
        </div>
      </article>
    </div>
  );
}

export default Filme;
