const ManageBookings = ({ bookings = [], onCancelBooking, onUpdateBookingStatus }) => {
  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-cyan-500/5 transition duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Manage Bookings</h2>
          <p className="text-slate-400 mt-1">Review and manage training bookings.</p>
        </div>
        <span className="rounded-full bg-amber-500/10 px-4 py-2 text-sm text-amber-200">{bookings.length} bookings</span>
      </div>

      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <div key={booking.id || booking._id || index} className="rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-5 transition duration-300 hover:-translate-y-1">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{booking.course_name || booking.training || `Booking ${index + 1}`}</h3>
                  <p className="text-slate-400">{booking.user_name || booking.customer || booking.email || 'Unknown user'}</p>
                </div>
                <span className="rounded-full bg-slate-800 px-3 py-2 text-sm text-slate-300">{booking.status || booking.state || 'Pending'}</span>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-slate-500">
                <p>Booked on: {booking.created_at || booking.date || 'N/A'}</p>
                <p>Amount: {booking.amount ? `$${booking.amount}` : booking.price ? `$${booking.price}` : 'N/A'}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => onUpdateBookingStatus?.(booking.id || booking._id, 'completed')}
                  className="rounded-2xl bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-500/20"
                >
                  Mark Completed
                </button>
                {booking.status !== 'cancelled' && (
                  <button
                    onClick={() => onCancelBooking?.(booking.id || booking._id)}
                    className="rounded-2xl bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/20"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/80 p-8 text-center text-slate-500">
          No bookings available.
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
