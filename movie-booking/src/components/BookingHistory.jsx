import { useEffect, useState } from "react";
import '../App.css'

// Responsive grid classes
const GRID_CLASSES = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 p-4";

function BookingHistory(){

  const [bookings, setBookings] = useState([]);

  useEffect(()=>{
    // Read directly from localStorage — no artificial delay needed
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  },[])

  return(

    <div className="flex-1 min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">

      <h2 className="text-lg font-bold underline text-center pt-4 text-[var(--text-heading)]">Booking History</h2>

      <div className={GRID_CLASSES}>

        {bookings.length === 0 ? (
          <div className="col-span-full text-center py-12 text-[var(--text-muted)]">
            <p className="text-xl font-semibold">No bookings yet</p>
            <p className="text-sm mt-1">Your booking history will appear here.</p>
          </div>
        ) : (
          bookings.map((b,i)=>(  
            
            <div key={i} className="flex flex-col justify-around items-center bg-[var(--bg-card)] p-4 rounded-2xl border border-[var(--border-color)] transition-colors duration-300">
              {/* aspect-ratio container prevents CLS when image loads */}
              <div className="w-[120px] aspect-[3/4] rounded-xl overflow-hidden bg-[var(--bg-skeleton)]">
                <img 
                  src={b.imageUrl?.medium} 
                  alt={b.movie} 
                  className="w-full h-full object-cover rounded-xl"
                  width={120}
                  height={160}
                  loading="lazy"
                />
              </div>
              <p className="font-bold text-xl underline mb-2 text-[var(--text-heading)]"> {b.movie}</p>
              <p className="text-[var(--text-primary)]"><b>Seats:</b> {b.seats.join(", ")}</p>
              <p className="text-sm text-[var(--text-muted)]"><b>Date:</b> {b.date}</p>

            </div>

          ))
        )}

      </div>
    </div>

  )

}

export default BookingHistory