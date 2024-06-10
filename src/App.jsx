import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Buscador } from "./Buscador"
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4M2FiNmQ5NzRhZGM2NTYxMzQyZDlhMjFmN2NhOWY2ZSIsInN1YiI6IjY2NjYyYWM0MDgxY2UyNDI2MGU5Y2RjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dHaa5IfYA3taKSTr1p4-YOgOJuagzHYu4VxmuzAOfZ8'
    }
  };

  const [valorInput,setValorInput] = useState('')
  const [movies,setMovies] = useState([])
  const [expandedMovie, setExpandedMovie] = useState(null);

  const onChange = (evento) => {
    const valor = evento.target.value
    setValorInput(valor)
  }

  const toggleSynopsis = (movieId) => {
    if (expandedMovie === movieId) {
      setExpandedMovie(null); 
    } else {
      setExpandedMovie(movieId); 
    }
  };

  const onSubmit = async (evento)=>{
    evento.preventDefault() 
    const movies = await getMovies(valorInput)
    setMovies(movies)
  }
  //funcion asyncrona para peticion
  const getMovies = async (query)=>{
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=`
    const response = await fetch(url,options) 
    const data = await response.json()
    console.log(data)
    return data.results;
  }
  
  

  return (
    <div className="container mt-4">
      <form onSubmit={onSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            value={valorInput}
            onChange={onChange}
            className="form-control"
            placeholder="Título película"
          />
          <button type="submit" className="btn btn-primary">
            Buscar
          </button>
        </div>
      </form>
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-4 mb-4">
            <div className="card" onClick={() => toggleSynopsis(movie.id)}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{movie.release_date}</h6>
                {expandedMovie === movie.id && (
                  <p className="card-text">{movie.overview}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}

  

export default App
