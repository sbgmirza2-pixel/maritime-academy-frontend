import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';

const Certificates = ({ certificates = [] }) => {
  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-cyan-500/5">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Certificates</h2>
          <p className="text-sm text-slate-400">Certificates awarded to you.</p>
        </div>
        <span className="rounded-2xl bg-slate-800 p-3 text-cyan-300">
          <FontAwesomeIcon icon={faCertificate} />
        </span>
      </div>

      {certificates.length > 0 ? (
        <div className="space-y-4">
          {certificates.map((cert, index) => (
            <div key={index} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
              <h3 className="font-semibold text-white">{cert.title || cert.name || `Certificate ${index + 1}`}</h3>
              <p className="text-sm text-slate-400">{cert.issuer || cert.issued_by || 'Training Academy'}</p>
              {cert.date && <p className="text-xs text-slate-500 mt-2">Issued: {cert.date}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-400">No certificates available.</p>
      )}
    </div>
  );
};

export default Certificates;