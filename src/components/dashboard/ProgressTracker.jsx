const ProgressTracker = ({ progress = 0 }) => {
  const progressValue = Math.min(100, Math.max(0, progress));

  return (
    <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Progress Tracker</h2>
          <p className="text-xs text-slate-500 mt-0.5">Aggregate metric calculation curve across active records.</p>
        </div>
        <span className="rounded-lg bg-cyan-500/10 px-3 py-1 font-mono text-xs font-bold text-cyan-400 border border-cyan-500/10">
          {progressValue}% Completed
        </span>
      </div>

      {/* Smooth Standard Linear Track Bar */}
      <div className="w-full bg-slate-950 rounded-xl h-3.5 border border-slate-900 overflow-hidden p-0.5">
        <div
          className="bg-cyan-500 h-full rounded-lg transition-all duration-500 ease-out"
          style={{ width: `${progressValue}%` }}
        />
      </div>

      <p className="mt-4 text-xs text-slate-400 italic">
        Operational track nominal — training path is rendering target metrics accurately.
      </p>
    </div>
  );
};

export default ProgressTracker;