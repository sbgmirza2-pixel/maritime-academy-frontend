import { useMemo } from "react";

const AnalyticsCharts = ({ users = 0, courses = 0, bookings = 0, payments = [] }) => {
  const totalRevenue = useMemo(() => {
    return payments.reduce((sum, payment) => {
      const amount = Number(payment.amount || payment.total || payment.price || 0);
      return sum + (Number.isFinite(amount) ? amount : 0);
    }, 0);
  }, [payments]);

  const numericUsers = typeof users === "number" ? users : users ? 1 : 0;
  const userTrendWidth = Math.min(100, numericUsers * 16 + 20);
  const courseTrendWidth = Math.min(100, Number(courses) * 16 + 20);
  const bookingTrendWidth = Math.min(100, Number(bookings) * 12 + 10);
  const revenueTrendWidth = Math.min(100, totalRevenue > 0 ? Math.min(100, totalRevenue / 50) : 12);

  return (
    <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-6 flex flex-col">
      {/* Header Info */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white">Analytics</h2>
          <p className="text-xs text-slate-400 mt-0.5">Recent activity summary across the platform.</p>
        </div>
        <span className="rounded-lg bg-cyan-500/10 px-2.5 py-1 text-[11px] font-medium text-cyan-400">Live data</span>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6 items-start">
        {/* Users Card */}
        <div className="rounded-xl border border-slate-900 bg-slate-950/60 p-4 flex flex-col justify-between min-h-[120px]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Users</p>
            <p className="mt-2 text-2xl font-bold tracking-tight text-white">{users}</p>
          </div>
          <p className="text-[10px] text-slate-400">Active profiles registered</p>
        </div>

        {/* Courses Card */}
        <div className="rounded-xl border border-slate-900 bg-slate-950/60 p-4 flex flex-col justify-between min-h-[120px]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Courses</p>
            <p className="mt-2 text-2xl font-bold tracking-tight text-white">{courses}</p>
          </div>
          <p className="text-[10px] text-slate-400">Available training setups</p>
        </div>

        {/* Bookings Card */}
        <div className="rounded-xl border border-slate-900 bg-slate-950/60 p-4 flex flex-col justify-between min-h-[120px]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Bookings</p>
            <p className="mt-2 text-2xl font-bold tracking-tight text-white">{bookings}</p>
          </div>
          <p className="text-[10px] text-slate-400">Active schedule requests</p>
        </div>

        {/* Revenue Card */}
        <div className="rounded-xl border border-slate-900 bg-slate-950/60 p-4 flex flex-col justify-between min-h-[120px]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Revenue</p>
            <p className="mt-2 text-2xl font-bold tracking-tight text-white">${totalRevenue.toLocaleString()}</p>
          </div>
          <p className="text-[10px] text-slate-400">Gross processed earnings</p>
        </div>
      </div>

      {/* Trend Visualizer Sub-Grid */}
      <div className="mt-auto grid gap-4 lg:grid-cols-2 items-stretch">
        {/* User Trend */}
        <div className="rounded-xl border border-slate-900 bg-slate-950/40 p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">User Growth</p>
              <p className="text-lg font-semibold text-white tracking-tight">{numericUsers} profiles</p>
            </div>
            <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium text-cyan-400">Delta</span>
          </div>
          <div className="space-y-2">
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full rounded-full bg-cyan-400" style={{ width: `${userTrendWidth}%` }} />
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full rounded-full bg-cyan-600/40" style={{ width: `${Math.max(30, userTrendWidth - 10)}%` }} />
            </div>
          </div>
        </div>

        {/* Course Growth */}
        <div className="rounded-xl border border-slate-900 bg-slate-950/40 p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Course Growth</p>
              <p className="text-lg font-semibold text-white tracking-tight">{courses} modules</p>
            </div>
            <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">Scale</span>
          </div>
          <div className="space-y-2">
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full rounded-full bg-emerald-400" style={{ width: `${courseTrendWidth}%` }} />
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full rounded-full bg-emerald-600/40" style={{ width: `${Math.max(30, courseTrendWidth - 15)}%` }} />
            </div>
          </div>
        </div>

        {/* Booking Rate */}
        <div className="rounded-xl border border-slate-900 bg-slate-950/40 p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Booking Rate</p>
              <p className="text-lg font-semibold text-white tracking-tight">{bookings} schedules</p>
            </div>
            <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-400">Activity</span>
          </div>
          <div className="space-y-2">
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full rounded-full bg-amber-400" style={{ width: `${bookingTrendWidth}%` }} />
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full rounded-full bg-amber-600/40" style={{ width: `${Math.max(25, bookingTrendWidth - 20)}%` }} />
            </div>
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="rounded-xl border border-slate-900 bg-slate-950/40 p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Revenue Trend</p>
              <p className="text-lg font-semibold text-white tracking-tight">${totalRevenue.toLocaleString()}</p>
            </div>
            <span className="rounded-md bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-400">Volume</span>
          </div>
          <div className="space-y-2">
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full rounded-full bg-violet-400" style={{ width: `${revenueTrendWidth}%` }} />
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full rounded-full bg-violet-600/40" style={{ width: `${Math.max(20, revenueTrendWidth - 15)}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;