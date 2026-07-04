const ProgressTracker = ({ progress = 0 }) => {
  const progressValue = Math.min(100, Math.max(0, progress));

  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-cyan-500/5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Progress Tracker</h2>
          <p className="text-sm text-slate-400">Current course completion status</p>
        </div>
        <span className="rounded-2xl bg-slate-800 px-3 py-2 text-sm text-cyan-300">{progressValue}%</span>
      </div>

      <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
        <div
          className="bg-cyan-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${progressValue}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-slate-400">Keep going — your training is progressing well.</p>
    </div>
  );
};

export default ProgressTracker;