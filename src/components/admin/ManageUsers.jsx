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
      setError(submitError?.response?.data?.detail || submitError?.message || "Unable to add user.");
    } finally {
      setSaving(false);
    }
  };

  const hasUsers = users.length > 0;
  const title = canManageUsers ? "Users" : hasUsers ? "My Profile" : "User Access";
  const userCountLabel = canManageUsers ? `${users.length} ${users.length === 1 ? "user" : "users"}` : users.length ? "Profile only" : "No profile data";
  const backendTotalUsersNote = !canManageUsers && adminStats?.total_users ? `Total backend users: ${adminStats.total_users} (details restricted)` : null;

  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-cyan-500/5 transition duration-300 hover:-translate-y-1">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <p className="text-slate-400 mt-1">{canManageUsers ? "Manage users from the backend database." : "Only your profile details are available from this session."}</p>
          {backendTotalUsersNote && <p className="text-slate-500 mt-1 text-sm">{backendTotalUsersNote}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">{userCountLabel}</span>
          {canManageUsers && (
            <button
              onClick={openModal}
              className="rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Add User
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700 text-sm">
          <thead className="bg-slate-950 text-slate-300 uppercase tracking-[0.25em] text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Status</th>
              {canManageUsers && <th className="px-4 py-3 text-left">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {hasUsers ? (
              users.map((user, index) => (
                <tr key={user.id || user._id || index} className="hover:bg-slate-950/70">
                  <td className="px-4 py-4 text-slate-100">{user.name || user.full_name || "Unnamed"}</td>
                  <td className="px-4 py-4 text-slate-400">{user.email || "N/A"}</td>
                  <td className="px-4 py-4 text-cyan-200">{user.role || "user"}</td>
                  <td className="px-4 py-4 text-slate-400">{user.status || (canManageUsers ? "Database user" : "Profile loaded")}</td>
                  {canManageUsers && (
                    <td className="px-4 py-4">
                      <button
                        onClick={() => onDeleteUser?.(user.id || user._id)}
                        className="rounded-2xl bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/20"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={canManageUsers ? "5" : "4"} className="px-4 py-6 text-center text-slate-500">
                  {canManageUsers
                    ? "No users found in the backend database."
                    : "User list endpoint is not available, so only profile data is displayed."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && canManageUsers && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-xl rounded-[2rem] border border-slate-800 bg-slate-900 p-6 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-white">Add User</h3>
                <p className="text-slate-400">Create a new backend user record if supported.</p>
              </div>
              <button
                onClick={closeModal}
                className="rounded-full border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-300 transition hover:bg-slate-800"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-300">
                  <span>Name</span>
                  <input
                    value={formData.name}
                    onChange={handleChange("name")}
                    required
                    className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-300">
                  <span>Email</span>
                  <input
                    value={formData.email}
                    onChange={handleChange("email")}
                    required
                    type="email"
                    className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-300">
                  <span>Password</span>
                  <input
                    value={formData.password}
                    onChange={handleChange("password")}
                    required
                    type="password"
                    className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-300">
                  <span>Role</span>
                  <select
                    value={formData.role}
                    onChange={handleChange("role")}
                    className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </label>
              </div>

              {error && (
                <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
                  {error}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Adding..." : "Add User"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-3xl border border-slate-700 bg-slate-950 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-white"
                >
                  Cancel
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
