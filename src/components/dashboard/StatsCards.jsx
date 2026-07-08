import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faCheckCircle, faCertificate, faGaugeHigh } from '@fortawesome/free-solid-svg-icons';

const StatsCards = ({ stats }) => {
  const configMap = {
    "courses": { icon: faBookOpen, style: "bg-sky-500/10 text-sky-400 border-sky-500/10" },
    "completed": { icon: faCheckCircle, style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/10" },
    "certificates": { icon: faCertificate, style: "bg-amber-500/10 text-amber-400 border-amber-500/10" },
    "progress": { icon: faGaugeHigh, style: "bg-violet-500/10 text-violet-400 border-violet-500/10" }
  };

  const defaultStats = [
    { title: 'Courses', value: 0, note: "Total academy tracks" },
    { title: 'Completed', value: 0, note: "Fully finalized items" },
    { title: 'Certificates', value: 0, note: "Earned documentation" },
    { title: 'Progress', value: '0%', note: "Current velocity rate" },
  ];

  const dataset = stats && stats.length ? stats : defaultStats;

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {dataset.map((item, index) => {
        const key = item.title?.toLowerCase() || "";
        const meta = configMap[key] || { icon: faBookOpen, style: "bg-slate-900 text-slate-400 border-slate-800" };

        return (
          <div
            key={index}
            // min-w-0 ensures grid item doesn't overflow parent
            className="rounded-2xl border border-slate-900 bg-slate-900/40 p-6 flex flex-col justify-between transition-all duration-200 hover:bg-slate-900/50 shadow-sm min-w-0"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 truncate">
                  {item.title}
                </h3>
                {/* shrink-0 stops icon container from crushing under low widths */}
                <span className={`rounded-xl p-2.5 text-sm border flex items-center justify-center min-w-[36px] h-[36px] shrink-0 ${item.accent || meta.style}`}>
                  <FontAwesomeIcon icon={item.icon || meta.icon} />
                </span>
              </div>
              <p className="text-2xl font-bold font-mono tracking-tight text-white mt-4 truncate">
                {item.value}
              </p>
            </div>
            
            {(item.note || defaultStats[index]?.note) && (
              <p className="mt-4 text-xs text-slate-500 tracking-normal leading-normal break-words line-clamp-2">
                {item.note || defaultStats[index]?.note}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;