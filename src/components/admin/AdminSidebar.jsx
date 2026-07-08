import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGaugeHigh,
  faUsers,
  faBookOpen,
  faCalendarCheck,
  faCreditCard,
  faArrowRight,
  faSignOutAlt,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: faGaugeHigh },
  { id: 'users', label: 'Users', icon: faUsers },
  { id: 'courses', label: 'Courses', icon: faBookOpen },
  { id: 'bookings', label: 'Bookings', icon: faCalendarCheck },
  { id: 'payments', label: 'Payments', icon: faCreditCard },
];

const AdminSidebar = ({ isOpen, onClose, activeItem, onItemSelect, onLogout }) => {
  const navigate = useNavigate();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-slate-950 text-slate-200 border-r border-slate-900 shadow-2xl transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      {/* Mobile Top Branding */}
      <div className="flex items-center justify-between border-b border-slate-900 px-5 py-5 md:hidden">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">System Control</p>
          <h2 className="text-base font-bold tracking-tight text-white">HQ Panel</h2>
        </div>
        <button
          aria-label="Close sidebar"
          onClick={onClose}
          className="rounded-lg border border-slate-800 bg-slate-900/40 p-2 text-slate-400 hover:text-white transition"
        >
          <FontAwesomeIcon icon={faXmark} className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex h-[calc(100vh-1px)] flex-col justify-between px-4 py-6 sticky top-0">
        <div>
          {/* Desktop Branding */}
          <div className="hidden md:block px-2 pb-2">
            <p className="text-[9px] font-bold uppercase tracking-widest text-cyan-500">Navigation</p>
            <h2 className="mt-0.5 text-lg font-bold tracking-tight text-white">Main Registry</h2>
          </div>

          {/* Nav Items */}
          <nav className="mt-6 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = item.id === activeItem;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onItemSelect(item.id);
                    onClose();
                  }}
                  className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all duration-150 ${
                    isActive 
                      ? 'bg-cyan-500/[0.07] text-cyan-400 border-l-2 border-cyan-500 font-medium' 
                      : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`flex items-center justify-center p-2 rounded-lg text-xs ${isActive ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-900 text-slate-500 group-hover:text-slate-300'}`}>
                      <FontAwesomeIcon icon={item.icon} className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-sm tracking-tight">{item.label}</span>
                  </span>
                  <FontAwesomeIcon 
                    icon={faArrowRight} 
                    className={`w-2.5 h-2.5 opacity-0 -translate-x-1 transition-all duration-150 ${isActive ? 'opacity-100 translate-x-0 text-cyan-400' : 'group-hover:opacity-40 group-hover:translate-x-0'}`} 
                  />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-slate-900 px-2">
          <button
            onClick={() => {
              if (onLogout) onLogout();
              navigate('/login');
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-900 bg-slate-900/20 px-4 py-2.5 text-xs font-medium text-slate-400 hover:bg-red-500/[0.06] hover:border-red-500/20 hover:text-red-400 transition"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="w-3 h-3" />
            Exit Dashboard
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;