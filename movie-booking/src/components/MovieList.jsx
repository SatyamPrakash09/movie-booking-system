import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Skeleton } from 'boneyard-js/react'

import { Pagination, Stack } from "@mui/material";
import '../App.css'

const GRID_CLASSES = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4";

function LoadingSpinner({ size = 48 }) {
  return (
    <div className="flex justify-center items-center w-full" style={{ minHeight: size + 20 }}>
      <svg
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="25" cy="25" r="20" stroke="var(--bg-skeleton)" strokeWidth="5" />
        <path
          d="M25 5 A20 20 0 0 1 45 25"
          stroke="var(--accent)"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

const FIXTURE_MOVIES = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Movie Title ${i + 1}`,
  image: { medium: "" },
  url: "#",
}));

function MovieList() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")
  const [isloading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const[totalPage, setTotalPage] = useState(0)
  const handlePageChange = (e, value)=>{
    setPage(value)
  }

  useEffect(() => {
    setIsLoading(true);
    const start = (page - 1) * 20;
    axios.get(`https://api.tvmaze.com/shows?page=${page}`)
      .then(res => {
        setTotalPage(Math.ceil(res.data.length / 20));
        setMovies(res.data.slice(start, start + 20));
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [page]);

  const handleSearch = () =>{
    if(searchQuery.trim() === ""){
      const start = (page - 1) * 20;
      axios.get(`https://api.tvmaze.com/shows?page=${page}`)
        .then(res => {
          setTotalPage(Math.ceil(res.data.length / 20));
          setMovies(res.data.slice(start, start + 20));
        });
      return
    }
    setIsLoading(true);
    axios.get(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchQuery)}`)
      .then(res =>{
        const result = res.data.map(item=>item.show)
        setMovies(result)
        setIsLoading(false)
      })
      .catch(()=>setIsLoading(false))
    
  }

  const handleKeyDown = (e) =>{
    if(e.key === "Enter") handleSearch()
  }

  const handleWatch = (movie)=>{
    const stored = JSON.parse(localStorage.getItem("watchHistory")) || [];
    const isAlreadyPresent = stored.some(
      (item) => item.movie === movie.name
    );
    
    if(!isAlreadyPresent){
      const currentMovieDetail = {
        imageUrl:movie.image,
        movie: movie.name,
        date: new Date().toLocaleString()
      };
      localStorage.setItem("watchHistory", JSON.stringify([ currentMovieDetail,...stored,].slice(0,20)));
    }

  }

  const displayMovies = isloading ? FIXTURE_MOVIES : movies;

  return (
    <div className="pt-5 bg-[var(--bg-primary)] transition-colors duration-300 min-h-screen flex flex-col">


      <div className="flex justify-center mb-4 px-4">
        <div className="flex w-full max-w-md gap-2">
          <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">
              🔍
              </span>
              <input 
              type="text" 
              placeholder="Search movies or shows"
              value={searchQuery}
              onKeyDown={handleKeyDown}
              onChange={(e)=>setSearchQuery(e.target.value)}
              className="w-full pl-10 py-2 pr-4 rounded-xl border-2 border-[var(--border-color)]
              bg-[var(--bg-input)] text-[var(--text-primary)]
              shadow-md focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30
              placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 
              "
              />
          </div>
          <button
          onClick={handleSearch}
          className="px-4 py-2 bg-[var(--accent)] text-white
          rounded-xl font-semibold shadow-md hover:bg-[var(--accent-hover)] active:scale-95 cursor-pointer transition-all duration-200
          ">
            Search
          </button>
        </div>
      </div>


      <div className="flex-1">

      {!isloading && movies.length === 0 && searchQuery ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-red-500 dark:text-red-400 text-3xl font-semibold text-center">
            Result Not Found
          </p>
        </div>
      ) : (

      <Skeleton 
        name="movies-card" 
        animate="shimmer"
        color="var(--bg-skeleton)"
        darkColor="#1f2937" 
        loading={isloading} 
        transition={true}
        stagger={true}
        fixture={
          <div className={`movie-grid ${GRID_CLASSES}`}>
            {FIXTURE_MOVIES.map(movie => (
              <div className="movie-card flex flex-col items-center text-center bg-[var(--bg-card)] m-2 rounded-2xl shadow-lg shadow-[var(--shadow-card)] mb-4 transition-colors duration-300" key={movie.id}>

                <div className="rounded-2xl m-2 w-full aspect-[210/295] bg-[var(--bg-skeleton)] flex items-center justify-center">
                  <LoadingSpinner size={36} />
                </div>
                <div className="m-2">
                  <h3 className="text-xl font-bold text-[var(--text-heading)]">{movie.name}</h3>
                  <button className="border border-[var(--border-color)] shadow-xl bg-[var(--bg-card)] text-[var(--text-primary)] px-2 py-1 rounded-lg m-1">
                    Book Ticket
                  </button>
                  <button className="border border-[var(--border-color)] shadow-xl bg-[var(--bg-card)] text-[var(--text-primary)] px-2 py-1 rounded-lg m-1">
                    Watch
                  </button>
                </div>
              </div>
            ))}
          </div>
        }
        fallback={
          <div className={`movie-grid ${GRID_CLASSES}`}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center text-center bg-[var(--bg-card)]/50 m-2 rounded-2xl shadow-lg mb-4">

                <div className="rounded-2xl m-2 w-full aspect-[210/295] bg-[var(--bg-skeleton)] flex items-center justify-center">
                  <LoadingSpinner size={36} />
                </div>
                <div className="m-2 w-full flex flex-col items-center gap-2">
                  <div className="h-6 w-3/4 bg-[var(--bg-skeleton)] rounded animate-pulse" />
                  <div className="h-8 w-24 bg-[var(--bg-skeleton)] rounded-lg animate-pulse" />
                  <div className="h-8 w-16 bg-[var(--bg-skeleton)] rounded-lg animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        }
      >
        <div className={`movie-grid ${GRID_CLASSES}`}>
          {displayMovies.map(movie => (
            <div className="movie-card flex flex-col items-center text-center bg-[var(--bg-card)] rounded-2xl shadow-lg shadow-[var(--shadow-card)] mb-4 transition-colors duration-300" key={movie.id}>

              <div className="w-full aspect-[210/295] rounded-2xl m-2 overflow-hidden bg-[var(--bg-skeleton)]">
                <img 
                  className="w-full h-full object-cover rounded-2xl shadow-lg shadow-[var(--shadow-img)]" 
                  src={movie.image?.medium} 
                  alt={movie.name}
                  width={210}
                  height={295}
                  loading="lazy"
                />
              </div>
              <div className="m-2">
                <h3 className="text-xl font-bold text-[var(--text-heading)]">{movie.name}</h3>
                <button className="border border-[var(--border-color)] shadow-xl bg-[var(--bg-card)] text-[var(--text-primary)] px-2 py-1 rounded-lg m-1 hover:bg-[var(--accent)]/20 cursor-pointer transition-colors duration-200" 
                onClick={() => navigate('/booking', { state: { movie } })}
                >
                  Book Ticket
                </button>
                <button className="border border-[var(--border-color)] shadow-xl bg-[var(--bg-card)] text-[var(--text-primary)] px-2 py-1 rounded-lg m-1 hover:bg-[var(--accent)]/20 cursor-pointer transition-colors duration-200" 
              onClick={()=>handleWatch(movie)}
              >
                <a href={`${movie?.url}`} className="text-[var(--text-primary)]">Watch</a>
              </button>
              </div>
            </div>
          ))}
        </div>
      </Skeleton>
      )}
      </div>
      <div className="flex justify-center items-center py-3 bg-[var(--bg-pagination)] transition-colors duration-300">
        <Stack spacing={2}>
          <Pagination 
            count={totalPage} 
            onChange={handlePageChange} 
            shape="rounded" 
            page={page} 
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'var(--text-primary)',
              }
            }}
          />
        </Stack>
      </div>

    </div>
  );
} 

export default MovieList;