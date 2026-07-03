const DashboardHeader = ({ user }) => {
  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 mb-6">
      <h1 className="text-3xl font-semibold text-white">
        Welcome back, {user?.name || "Student"}
      </h1>
      <p className="text-slate-400 mt-2">
        Here is your current student overview.
      </p>
    </div>
  );
};

export default DashboardHeader;