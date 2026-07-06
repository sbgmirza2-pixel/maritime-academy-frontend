const AnalyticsCharts = ({ users = 0, courses = 0, bookings = 0, payments = [] }) => {
  const totalRevenue = payments.reduce((sum, payment) => {
    const amount = Number(payment.amount || payment.total || payment.price || 0);
    return sum + (Number.isFinite(amount) ? amount : 0);
  }, 0);

  const numericUsers = typeof users === "number" ? users : users ? 1 : 0;
  const userTrendWidth = Math.min(100, numericUsers * 16 + 20);
  const courseTrendWidth = Math.min(100, Number(courses) * 16 + 20);
  const bookingTrendWidth = Math.min(100, Number(bookings) * 12 + 10);
  const revenueTrendWidth = Math.min(100, totalRevenue > 0 ? Math.min(100, totalRevenue / 50) : 12);

  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-cyan-500/5 transition duration-300 hover:-translate-y-1 flex flex-col">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Analytics</h2>
          <p className="text-slate-400 mt-1">Recent activity summary across the platform.</p>
        </div>
        <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">Live data</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6 items-start">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4 flex flex-col justify-between min-h-[140px]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Users</p>
            <p className="mt-4 text-3xl font-semibold text-white">{users}</p>
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.28em] text-slate-500">Active user metric</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4 flex flex-col justify-between min-h-[140px]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Courses</p>
            <p className="mt-4 text-3xl font-semibold text-white">{courses}</p>
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.28em] text-slate-500">Available trainings</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4 flex flex-col justify-between min-h-[140px]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Bookings</p>
            <p className="mt-4 text-3xl font-semibold text-white">{bookings}</p>
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.28em] text-slate-500">Current reservations</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4 flex flex-col justify-between min-h-[140px]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Revenue</p>
            <p className="mt-4 text-3xl font-semibold text-white">${totalRevenue.toLocaleString()}</p>
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.28em] text-slate-500">Payment total</p>
        </div>
      </div>

      <div className="mt-auto grid gap-4 lg:grid-cols-2 items-stretch">
        <div className="h-full rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">User Activity</p>
              <p className="text-2xl font-semibold text-white">{numericUsers} profiles</p>
            </div>
            <span className="rounded-full bg-cyan-500/10 px-3 py-2 text-cyan-200">Trend</span>
          </div>
          <div className="space-y-3">
            <div className="h-2 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full rounded-full bg-cyan-400" style={{ width: `${userTrendWidth}%` }} />
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full rounded-full bg-cyan-500" style={{ width: `${Math.max(30, userTrendWidth - 10)}%` }} />
            </div>
          </div>
        </div>
        <div className="h-full rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Course Growth</p>
              <p className="text-2xl font-semibold text-white">{courses}</p>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-3 py-2 text-emerald-200">Trend</span>
          </div>
          <div className="space-y-3">
            <div className="h-2 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full rounded-full bg-emerald-400" style={{ width: `${courseTrendWidth}%` }} />
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${Math.max(30, courseTrendWidth - 15)}%` }} />
            </div>
          </div>
        </div>
        <div className="h-full rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Booking Rate</p>
              <p className="text-2xl font-semibold text-white">{bookings}</p>
            </div>
            <span className="rounded-full bg-amber-500/10 px-3 py-2 text-amber-200">Trend</span>
          </div>
          <div className="space-y-3">
            <div className="h-2 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full rounded-full bg-amber-400" style={{ width: `${bookingTrendWidth}%` }} />
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full rounded-full bg-amber-500" style={{ width: `${Math.max(25, bookingTrendWidth - 20)}%` }} />
            </div>
          </div>
        </div>
        <div className="h-full rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Revenue Trend</p>
              <p className="text-2xl font-semibold text-white">${totalRevenue.toLocaleString()}</p>
            </div>
            <span className="rounded-full bg-violet-500/10 px-3 py-2 text-violet-200">Trend</span>
          </div>
          <div className="space-y-3">
            <div className="h-2 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full rounded-full bg-violet-400" style={{ width: `${revenueTrendWidth}%` }} />
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full rounded-full bg-violet-500" style={{ width: `${Math.max(20, revenueTrendWidth - 15)}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
