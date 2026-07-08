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
      className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-slate-950 text-slate-100 border-r border-slate-900 transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="flex flex-col h-full justify-between p-6">
        <div>
          {/* Header Branding Panel */}
          <div className="flex items-center justify-between border-b border-slate-900 pb-5 px-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">Training Portal</p>
              <h2 className="text-xl font-bold tracking-tight text-white mt-1">Student Hub</h2>
            </div>
            <button
              aria-label="Close sidebar"
              onClick={onClose}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-slate-400 hover:text-white transition md:hidden"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          {/* Navigation Links Mapping */}
          <nav className="mt-8 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = item.id === activeItem;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onItemSelect(item.id);
                    onClose();
                  }}
                  className={`group flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm transition duration-150 ${
                    isActive 
                      ? 'bg-cyan-500/10 border border-cyan-500/20 text-white font-semibold shadow-sm' 
                      : 'text-slate-400 hover:bg-slate-900/40 hover:text-white border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-3.5">
                    <span className={`text-base transition ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-400'}`}>
                      <FontAwesomeIcon icon={item.icon} />
                    </span>
                    <span>{item.label}</span>
                  </span>
                  <FontAwesomeIcon 
                    icon={faArrowRight} 
                    className={`text-xs transition-all ${isActive ? 'text-cyan-400 opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 text-slate-600 group-hover:opacity-100 group-hover:translate-x-0'}`} 
                  />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Operational Action Session */}
        <div className="pt-6 border-t border-slate-900">
          <button
            onClick={() => {
              if (onLogout) onLogout();
              navigate('/login');
            }}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-900 bg-slate-900/40 px-4 py-3.5 text-sm font-semibold text-slate-400 hover:text-white hover:border-slate-800 transition duration-150"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout Session</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;