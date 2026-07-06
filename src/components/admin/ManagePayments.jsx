const ManagePayments = ({ payments = [], revenue = 0 }) => {
  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-cyan-500/5 transition duration-300 hover:-translate-y-1">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Manage Payments</h2>
          <p className="text-slate-400 mt-1">Track payment history and revenue.</p>
        </div>
        <div className="rounded-full bg-violet-500/10 px-4 py-2 text-sm text-violet-200">Revenue: ${revenue.toLocaleString()}</div>
      </div>

      {payments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700 text-sm">
            <thead className="bg-slate-950 text-slate-300 uppercase tracking-[0.25em] text-xs">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {payments.map((payment, index) => (
                <tr key={payment.id || payment._id || index} className="hover:bg-slate-950/70">
                  <td className="px-4 py-4 text-slate-100">{payment.id || payment._id || payment.transaction_id || `#${index + 1}`}</td>
                  <td className="px-4 py-4 text-slate-400">${payment.amount || payment.total || payment.price || 0}</td>
                  <td className="px-4 py-4 text-cyan-200">{payment.status || payment.state || 'Completed'}</td>
                  <td className="px-4 py-4 text-slate-500">{payment.created_at || payment.date || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/80 p-8 text-center text-slate-500">
          No payment records available.
        </div>
      )}
    </div>
  );
};

export default ManagePayments;
