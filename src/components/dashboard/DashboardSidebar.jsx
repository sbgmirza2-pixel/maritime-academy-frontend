import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh, faBookOpen, faChartLine, faCertificate, faArrowRight, faSignOutAlt, faXmark } from '@fortawesome/free-solid-svg-icons';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: faGaugeHigh },
  { id: 'courses', label: 'Courses', icon: faBookOpen },
  { id: 'progress', label: 'Progress', icon: faChartLine },
  { id: 'certificates', label: 'Certificates', icon: faCertificate },
];

const DashboardSidebar = ({ isOpen, onClose, activeItem, onItemSelect, onLogout }) => {
  const navigate = useNavigate();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-slate-950 text-slate-100 shadow-xl transition-transform duration-300 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-6 md:hidden">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Training</p>
          <h2 className="text-xl font-semibold">Student Dashboard</h2>
        </div>
        <button
          aria-label="Close sidebar"
          onClick={onClose}
          className="rounded-full border border-slate-700 bg-slate-900/90 px-3 py-2 text-lg transition hover:bg-slate-800"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <div className="flex h-full flex-col justify-between px-6 py-8">
        <div>
          <div className="hidden md:block">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Training</p>
            <h2 className="mt-2 text-3xl font-semibold">Student Dashboard</h2>
          </div>

          <nav className="mt-10 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = item.id === activeItem;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onItemSelect(item.id);
                    onClose();
                  }}
                  className={`group flex w-full items-center justify-between rounded-3xl px-4 py-4 text-left transition duration-200 ${isActive ? 'bg-cyan-500/10 text-white ring-2 ring-cyan-400/60 shadow-lg shadow-cyan-500/20 scale-[1.01] border-l-4 border-cyan-400' : 'bg-slate-900/70 text-slate-200 hover:bg-slate-900/90 hover:text-white hover:-translate-y-0.5'}`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`rounded-2xl p-3 ${isActive ? 'bg-cyan-500/20 text-cyan-200' : 'bg-slate-800 text-slate-200'}`}>
                      <FontAwesomeIcon icon={item.icon} />
                    </span>
                    <span>
                      <span className={`block font-semibold ${isActive ? 'text-white' : 'text-slate-200'}`}>{item.label}</span>
                    </span>
                  </span>
                  <FontAwesomeIcon icon={faArrowRight} className={`transition ${isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-cyan-200'}`} />
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-10">
          <button
            onClick={() => {
              if (onLogout) onLogout();
              navigate('/login');
            }}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-700 bg-slate-900 px-4 py-4 text-sm font-semibold text-cyan-200 transition hover:border-cyan-400 hover:text-white"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
