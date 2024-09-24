import axios from "axios";
//BaseURL= https://api.themoviedb.org/3

// URL da API=/movie/now_playing?api_key=8229b559098c57c11c99480f5e664170&language=pt-BR
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default api;
