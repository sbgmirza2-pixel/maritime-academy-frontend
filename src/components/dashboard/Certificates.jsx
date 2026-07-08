import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';

const Certificates = ({ certificates = [] }) => {
  return (
    <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-6 flex flex-col h-full shadow-sm">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Verification Ledger
          </p>
          <h2 className="text-base font-bold tracking-tight text-white mt-0.5">Certificates</h2>
          <p className="text-xs text-slate-400 mt-0.5">Certificates officially awarded to your profile.</p>
        </div>
        <span className="rounded-xl p-2.5 text-sm border flex items-center justify-center min-w-[36px] h-[36px] shrink-0 bg-amber-500/10 text-amber-400 border-amber-500/10">
          <FontAwesomeIcon icon={faCertificate} />
        </span>
      </div>

      {certificates.length > 0 ? (
        // min-w-0 restricts grid/flex slots from inflating past container walls
        <div className="space-y-4 min-w-0">
          {certificates.map((cert, index) => (
            <div key={index} className="rounded-xl border border-slate-900 bg-slate-950/40 p-4 min-w-0 transition hover:bg-slate-950/60">
              <h3 className="text-sm font-semibold text-white truncate">
                {cert.title || cert.name || `Certificate ${index + 1}`}
              </h3>
              <p className="text-xs text-slate-400 mt-1 truncate">
                {cert.issuer || cert.issued_by || 'Maritime Academy Registry'}
              </p>
              {cert.date && (
                <p className="text-[10px] font-mono text-slate-500 mt-3 tracking-tight">
                  Issued: <span className="text-slate-400">{cert.date}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-center py-8">
          <p className="text-xs text-slate-500 italic">No cryptographic verification records emitted.</p>
        </div>
      )}
    </div>
  );
};

export default Certificates;