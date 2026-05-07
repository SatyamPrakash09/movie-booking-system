import { useEffect, useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import '../App.css'

function SeatBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie;

  const seats = Array.from({length: 20}, (_,i)=>i+1);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeat, setBookedSeat] = useState([])

  useEffect(()=>{
    if (!movie) return;
    const stored = JSON.parse(localStorage.getItem("bookings"))|| []
    
    const currentMovieBookings = stored.filter(b => b.movie === movie.name);
    const taken = currentMovieBookings.flatMap(b=>b.seats)
    setBookedSeat(taken)
  },[movie?.name])

  if (!movie) {
    return <Navigate to="/" />;
  }
  const toggleSeat = (seat) => {
    if(bookedSeat.includes(seat)) return;
    if(selectedSeats.includes(seat)){
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }

  };

  const confirmBooking = () => {
    if(selectedSeats.length === 0){
      alert("Please select atleast one seat")
      return 
    }

    const booking = {
      imageUrl:movie.image,
      movie: movie.name,
      seats: selectedSeats,
      date: new Date().toLocaleString()
    };

    const stored = JSON.parse(localStorage.getItem("bookings")) || [];

    localStorage.setItem("bookings", JSON.stringify([...stored, booking]));

    alert("Booking Confirmed!");

    navigate('/');
  };

  return (

    <div className="flex flex-col my-2 text-center min-h-screen bg-[var(--bg-primary)] transition-colors duration-300 py-6">

      <h2 className="text-2xl font-bold text-center text-[var(--text-heading)]">{movie.name}</h2>

      <div className="grid grid-cols-5 gap-2 justify-center w-[90%] sm:w-[60%] md:w-[40%] lg:w-[20%] m-auto">

        {seats.map(seat => {
          const isBooked = bookedSeat.includes(seat)
          const isSelected = selectedSeats.includes(seat)
        return(

          <button
            key={seat}
            onClick={() => toggleSeat(seat)}
            disabled={isBooked}
            className={`border rounded p-2 text-center transition-all duration-200 cursor-pointer font-medium
              ${
                isBooked
                  ? "bg-red-400 dark:bg-red-600 cursor-not-allowed text-white border-red-500"
                  : isSelected
                  ? "bg-green-500 dark:bg-green-600 text-white border-green-600"
                  : "bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-color)] hover:bg-blue-100 dark:hover:bg-blue-900/40"
              }
            `}
          >
              {seat}
          </button>

        )})}

      </div>

      <br/>

      <div className="flex flex-col gap-2 justify-center items-center">

        <button className="border border-[var(--border-color)] m-auto py-1 px-4 rounded-lg bg-[var(--accent)] text-white text-lg font-bold hover:bg-[var(--accent-hover)] cursor-pointer transition-colors duration-200" onClick={confirmBooking}>Confirm Booking</button>
        <button className="border border-[var(--border-color)] m-auto py-1 px-4 rounded-lg bg-[var(--accent)] text-white text-lg font-bold hover:bg-[var(--accent-hover)] cursor-pointer transition-colors duration-200" onClick={() => navigate(-1)}>Back</button>
      </div>

    </div>

  );
}

export default SeatBooking;