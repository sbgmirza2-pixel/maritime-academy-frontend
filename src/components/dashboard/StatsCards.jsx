import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faCheckCircle, faCertificate, faGaugeHigh } from '@fortawesome/free-solid-svg-icons';

const StatsCards = ({ stats }) => {
  const defaultStats = [
    { title: 'Courses', value: 0, icon: faBookOpen, accent: 'bg-sky-500/15 text-sky-300 border border-sky-500/20' },
    { title: 'Completed', value: 0, icon: faCheckCircle, accent: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20' },
    { title: 'Certificates', value: 0, icon: faCertificate, accent: 'bg-amber-500/15 text-amber-300 border border-amber-500/20' },
    { title: 'Progress', value: '0%', icon: faGaugeHigh, accent: 'bg-violet-500/15 text-violet-300 border border-violet-500/20' },
  ];

  const data = stats || defaultStats;

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-cyan-500/5 transition duration-300 hover:-translate-y-1 hover:shadow-cyan-500/20"
        >
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-sm uppercase tracking-[0.3em] text-slate-400">{item.title}</h3>
            <span className={`rounded-2xl p-3 ${item.accent}`}>
              <FontAwesomeIcon icon={item.icon} />
            </span>
          </div>
          <p className="text-3xl font-semibold text-white mt-5">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;