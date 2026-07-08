const DashboardHeader = ({ user }) => {
  return (
    <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Student Profile Context
          </p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-white">
            Welcome back, {user?.name || user?.full_name || "Student"}
          </h2>
          <p className="mt-1 text-sm text-slate-400 leading-normal">
            Review your dynamic platform velocity stats, course logs, and certifications.
          </p>
        </div>
        <div className="rounded-xl border border-slate-900 bg-slate-950/60 px-4 py-2.5 text-left md:min-w-[200px]">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Security Signature</p>
          <p className="mt-0.5 text-sm font-semibold text-cyan-300/90 tracking-tight">Synchronized</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;