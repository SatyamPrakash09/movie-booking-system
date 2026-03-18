import { useEffect, useState } from "react";
import axios from "axios";
import '../App.css'

function MovieList({ setSelectedMovie }) {

  const [movies, setMovies] = useState([]);

  useEffect(() => {

    axios.get("https://api.tvmaze.com/shows")
      .then(res => {
        setMovies(res.data.slice(0,10));
      });

  }, []);

  return (
    <div>

      <h2 className="text-2xl mt-2 mb-4 font-bold underline">Available Movies</h2>

      <div className="movie-grid grid grid-cols-5">

        {movies.map(movie => (

          <div className="movie-card flex flex-col items-center text-center bg-[#f4f1de] m-2 rounded-2xl shadow-lg shadow-[#3d405b] mb-4 " key={movie.id}>

            <img className="rounded-2xl m-2 shadow-lg shadow-[#e07a5f]" src={movie.image?.medium} />

            <div className="m-2">
              <h3 className="text-xl  font-bold">{movie.name}</h3>

              <button className="border shadow-xl bg-amber-50 px-2 py-1 rounded-lg" onClick={()=>setSelectedMovie(movie)}>
                Book Ticket
              </button>

            </div>


          </div>

        ))}

      </div>

    </div>
  );
}

export default MovieList;