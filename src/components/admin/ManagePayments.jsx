const ManagePayments = ({ payments = [], revenue = 0 }) => {
  return (
    <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-6">
      {/* Component Header Block */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white">Manage Payments</h2>
          <p className="text-xs text-slate-400 mt-0.5">Track financial transactions and aggregate revenue logs.</p>
        </div>
        <div className="self-start sm:self-center rounded-lg bg-violet-500/10 px-2.5 py-1 text-[11px] font-mono font-medium text-violet-400">
          Rev: ${revenue.toLocaleString()}
        </div>
      </div>

      {/* Structured Ledger Table */}
      {payments.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-slate-900 bg-slate-950/20">
          <table className="min-w-full divide-y divide-slate-900 text-xs text-left">
            <thead className="bg-slate-950/80 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3 font-medium">Txn ID</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/60 font-sans text-slate-300">
              {payments.map((payment, index) => {
                const status = (payment.status || payment.state || 'completed').toLowerCase();
                
                // Status badge context matching
                const statusColor = 
                  status === 'completed' || status === 'succeeded' ? 'text-emerald-400 bg-emerald-500/5' :
                  status === 'failed' || status === 'reversed' ? 'text-red-400 bg-red-500/5' :
                  'text-amber-400 bg-amber-500/5';

                return (
                  <tr key={payment.id || payment._id || index} className="hover:bg-slate-900/30 transition-colors duration-100">
                    <td className="px-4 py-3.5 font-mono text-slate-400 max-w-[140px] truncate">
                      {payment.id || payment._id || payment.transaction_id || `#TXN-${index + 1}`}
                    </td>
                    <td className="px-4 py-3.5 font-medium text-white">
                      ${Number(payment.amount || payment.total || payment.price || 0).toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusColor}`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-slate-500">
                      {payment.created_at || payment.date || 'N/A'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-900 bg-slate-950/20 p-8 text-center text-xs font-medium text-slate-500">
          No transactional records available in matrix archive.
        </div>
      )}
    </div>
  );
};

export default ManagePayments;