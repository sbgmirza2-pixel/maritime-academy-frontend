import { useState } from "react";

const ManageUsers = ({ users = [], canManageUsers = false, adminStats = null, onAddUser, onDeleteUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const openModal = () => {
    setFormData({ name: "", email: "", password: "", role: "user" });
    setError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError(null);
  };

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await onAddUser?.(formData);
      closeModal();
    } catch (submitError) {
      setError(submitError?.response?.data?.detail || submitError?.message || "Unable to add user record.");
    } finally {
      setSaving(false);
    }
  };

  const hasUsers = users.length > 0;
  const title = canManageUsers ? "Users" : hasUsers ? "My Profile" : "User Access";
  const userCountLabel = canManageUsers 
    ? `${users.length} ${users.length === 1 ? "user" : "users"}` 
    : users.length ? "Identity Loaded" : "No Identity Log";
  
  const backendTotalUsersNote = !canManageUsers && adminStats?.total_users 
    ? `Total system registry: ${adminStats.total_users} entries (restricted)` 
    : null;

  return (
    <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-6">
      {/* Component Header Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white">{title}</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {canManageUsers ? "Manage application user directory profiles." : "Only your primary identity profile parameters are available."}
          </p>
          {backendTotalUsersNote && <p className="text-[11px] text-slate-500 font-mono mt-1">{backendTotalUsersNote}</p>}
        </div>
        <div className="flex items-center gap-2.5 self-start sm:self-center">
          <span className="rounded-lg bg-cyan-500/10 px-2.5 py-1 text-[11px] font-medium text-cyan-400">{userCountLabel}</span>
          {canManageUsers && (
            <button
              onClick={openModal}
              className="rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Add User
            </button>
          )}
        </div>
      </div>

      {/* Structured Core Data Matrix */}
      <div className="overflow-x-auto rounded-xl border border-slate-900 bg-slate-950/20">
        <table className="min-w-full divide-y divide-slate-900 text-xs text-left">
          <thead className="bg-slate-950/80 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-4 py-3 font-medium">Identity Name</th>
              <th className="px-4 py-3 font-medium">Email Endpoint</th>
              <th className="px-4 py-3 font-medium">Role Privilege</th>
              <th className="px-4 py-3 font-medium">Status Scope</th>
              {canManageUsers && <th className="px-4 py-3 font-medium text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900/60 font-sans text-slate-300">
            {hasUsers ? (
              users.map((user, index) => (
                <tr key={user.id || user._id || index} className="hover:bg-slate-900/30 transition-colors duration-100">
                  <td className="px-4 py-3.5 font-medium text-white">{user.name || user.full_name || "Anonymous Operator"}</td>
                  <td className="px-4 py-3.5 text-slate-400 font-mono">{user.email || "N/A"}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-block px-1 rounded text-[10px] font-bold uppercase ${user.role === 'admin' ? 'text-violet-400 bg-violet-500/5' : 'text-cyan-400 bg-cyan-500/5'}`}>
                      {user.role || "user"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 text-[11px]">
                    {user.status || (canManageUsers ? "Synchronized" : "Local Context")}
                  </td>
                  {canManageUsers && (
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => onDeleteUser?.(user.id || user._id)}
                        className="rounded bg-red-500/10 px-2 py-1 text-[10px] font-medium text-red-400 transition hover:bg-red-500/20"
                      >
                        Purge
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={canManageUsers ? 5 : 4} className="px-4 py-8 text-center text-xs font-medium text-slate-500">
                  {canManageUsers
                    ? "No structured records returned from database catalog."
                    : "Endpoint isolation active: displaying local operational data parameters only."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Control Configuration Modal */}
      {isModalOpen && canManageUsers && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-slate-900 bg-slate-900 p-5 text-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
              <div>
                <h3 className="text-sm font-bold tracking-tight text-white">Create Database Record</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Initialize a new identity sequence inside the system.</p>
              </div>
              <button
                onClick={closeModal}
                className="rounded-md border border-slate-800 bg-slate-950/40 p-1 text-xs text-slate-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1 text-xs">
                  <span className="text-slate-400 font-medium">Operator Name</span>
                  <input
                    value={formData.name}
                    onChange={handleChange("name")}
                    required
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 text-xs outline-none focus:border-slate-700 transition"
                  />
                </div>
                <div className="space-y-1 text-xs">
                  <span className="text-slate-400 font-medium">Email Endpoint</span>
                  <input
                    value={formData.email}
                    onChange={handleChange("email")}
                    required
                    type="email"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 text-xs outline-none focus:border-slate-700 transition"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1 text-xs">
                  <span className="text-slate-400 font-medium">Access Token (Password)</span>
                  <input
                    value={formData.password}
                    onChange={handleChange("password")}
                    required
                    type="password"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 text-xs outline-none focus:border-slate-700 transition"
                  />
                </div>
                <div className="space-y-1 text-xs">
                  <span className="text-slate-400 font-medium">Privilege Rule Set</span>
                  <select
                    value={formData.role}
                    onChange={handleChange("role")}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-2 py-2 text-slate-200 text-xs outline-none focus:border-slate-700 transition"
                  >
                    <option value="user">User Role</option>
                    <option value="admin">Admin Privilege</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-500/[0.06] border border-red-500/10 p-2.5 text-[11px] text-red-400 font-mono">
                  Runtime Error: {error}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/60 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-slate-800 bg-slate-950/20 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-40"
                >
                  {saving ? "Deploying..." : "Commit User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;