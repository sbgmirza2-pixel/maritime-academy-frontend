const ManageBookings = ({ bookings = [], onCancelBooking, onUpdateBookingStatus }) => {
  return (
    <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-6">
      {/* Component Header */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white">Manage Bookings</h2>
          <p className="text-xs text-slate-400 mt-0.5">Review and manage platform roster bookings.</p>
        </div>
        <span className="rounded-lg bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-400">
          {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}
        </span>
      </div>

      {/* Main Roster List */}
      {bookings.length > 0 ? (
        <div className="space-y-3">
          {bookings.map((booking, index) => {
            const status = (booking.status || booking.state || 'pending').toLowerCase();
            
            // Contextual status layout configs
            const statusStyles = 
              status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
              status === 'cancelled' ? 'bg-red-500/10 text-red-400' :
              'bg-slate-900 text-slate-400';

            return (
              <div 
                key={booking.id || booking._id || index} 
                className="rounded-xl border border-slate-900 bg-slate-950/40 p-4 transition duration-150 hover:bg-slate-950/70"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight text-white">
                      {booking.course_name || booking.training || `Booking Reference #${index + 1}`}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {booking.user_name || booking.customer || booking.email || 'Anonymous Operator'}
                    </p>
                  </div>
                  <span className={`self-start sm:self-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded ${statusStyles}`}>
                    {status}
                  </span>
                </div>

                {/* Technical Meta Row */}
                <div className="mt-3.5 pt-3.5 border-t border-slate-900/60 grid gap-2 sm:grid-cols-2 text-xs font-mono text-slate-500">
                  <p>Timestamp: <span className="text-slate-400">{booking.created_at || booking.date || 'N/A'}</span></p>
                  <p>Transaction: <span className="text-slate-400">{booking.amount ? `$${booking.amount}` : booking.price ? `$${booking.price}` : 'N/A'}</span></p>
                </div>

                {/* Operations Control Actions */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {status !== 'completed' && status !== 'cancelled' && (
                    <button
                      onClick={() => onUpdateBookingStatus?.(booking.id || booking._id, 'completed')}
                      className="rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 transition hover:bg-emerald-500/20"
                    >
                      Commit Complete
                    </button>
                  )}
                  {status !== 'cancelled' && (
                    <button
                      onClick={() => onCancelBooking?.(booking.id || booking._id)}
                      className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
                    >
                      Void Booking
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-slate-900 bg-slate-950/20 p-8 text-center text-xs font-medium text-slate-500">
          No bookings indexed in registry.
        </div>
      )}
    </div>
  );
};

export default ManageBookings;