import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGaugeHigh,
  faUsers,
  faBookOpen,
  faCalendarCheck,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import AdminSidebar from "./AdminSidebar";
import StatsCards from "../dashboard/StatsCards";
import AnalyticsCharts from "./AnalyticsCharts";
import ManageUsers from "./ManageUsers";
import ManageCourses from "./ManageCourses";
import ManageBookings from "./ManageBookings";
import ManagePayments from "./ManagePayments";
import { adminService } from "../../services/adminService";

const AdminDashboard = () => {
  const [activeItem, setActiveItem] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [adminStats, setAdminStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [canManageUsers, setCanManageUsers] = useState(false);
  const [courses, setCourses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAdminData = async () => {
      setLoading(true);
      setError(null);

      const [statsResult, usersResult, coursesResult, bookingsResult, paymentsResult] = await Promise.allSettled([
        adminService.getAdminStats(),
        adminService.getUsers(),
        adminService.getCourses(),
        adminService.getBookings(),
        adminService.getPayments(),
      ]);

      const loadedStats = statsResult.status === "fulfilled" ? statsResult.value : null;
      const loadedUsers = usersResult.status === "fulfilled" ? usersResult.value?.users || [] : [];
      const loadedCourses = coursesResult.status === "fulfilled" ? coursesResult.value?.data || coursesResult.value : [];
      const loadedBookings = bookingsResult.status === "fulfilled" ? bookingsResult.value?.data || bookingsResult.value : [];
      const loadedPayments = paymentsResult.status === "fulfilled" ? paymentsResult.value?.data || paymentsResult.value : [];
      const loadedCanManageUsers = usersResult.status === "fulfilled" ? Boolean(usersResult.value?.listSupported) : false;

      if (
        usersResult.status === "rejected" &&
        coursesResult.status === "rejected" &&
        bookingsResult.status === "rejected" &&
        paymentsResult.status === "rejected"
      ) {
        const firstError = usersResult.reason || coursesResult.reason || bookingsResult.reason || paymentsResult.reason;
        console.error("Admin data load failed", firstError);
        setError(firstError?.response?.data?.detail || firstError?.message || "Failed to load admin data");
      }

      setUsers(Array.isArray(loadedUsers) ? loadedUsers : []);
      setCanManageUsers(loadedCanManageUsers);
      setCourses(Array.isArray(loadedCourses) ? loadedCourses : []);
      setBookings(Array.isArray(loadedBookings) ? loadedBookings : []);
      setPayments(Array.isArray(loadedPayments) ? loadedPayments : []);
      setAdminStats(loadedStats);
      setLoading(false);
    };

    loadAdminData();
  }, []);

  const totalRevenue = useMemo(() => {
    return payments.reduce((sum, payment) => {
      const amount = Number(payment.amount || payment.total || payment.price || 0);
      return sum + (Number.isFinite(amount) ? amount : 0);
    }, 0);
  }, [payments]);

  const totalUsers = adminStats?.total_users ?? users.length;
  const totalCourses = adminStats?.total_courses ?? courses.length;
  const totalBookings = adminStats?.total_bookings ?? bookings.length;
  const revenueValue = adminStats?.total_payments ? Number(adminStats.total_payments) : totalRevenue;
  const userCountDisplay = canManageUsers ? totalUsers : adminStats?.total_users ?? users.length;
  
  const userCardNote = canManageUsers
    ? "Complete backend user list"
    : adminStats?.total_users
    ? "Stats available, restricted access"
    : "Profile-only mode";

  const liveDataLabel = loading
    ? "syncing..."
    : canManageUsers
    ? `${totalUsers} users, ${totalCourses} courses`
    : `Restricted · ${totalUsers} total users`;

  const stats = [
    { title: "Users", value: userCountDisplay, icon: faUsers, accent: "bg-sky-500/10 text-sky-400 border border-sky-500/10", note: userCardNote },
    { title: "Courses", value: totalCourses, icon: faBookOpen, accent: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/10", note: "Total academy tracks" },
    { title: "Bookings", value: totalBookings, icon: faCalendarCheck, accent: "bg-amber-500/10 text-amber-400 border border-amber-500/10", note: "Pending approval checks" },
    { title: "Payments", value: `$${revenueValue.toLocaleString()}`, icon: faCreditCard, accent: "bg-violet-500/10 text-violet-400 border border-violet-500/10", note: "Processed earnings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleAddUser = async (userData) => {
    const response = await adminService.createUser(userData);
    const createdUser = response?.data || response;
    setUsers((prev) => [createdUser, ...prev]);
    return createdUser;
  };

  const handleDeleteUser = async (userId) => {
    if (!userId) return;
    await adminService.deleteUser(userId);
    setUsers((prev) => prev.filter((u) => u.id !== userId && u._id !== userId));
  };

  const handleDeleteCourse = async (courseId) => {
    if (!courseId) return;
    await adminService.deleteCourse(courseId);
    setCourses((prev) => prev.filter((c) => c.id !== courseId && c._id !== courseId));
  };

  const handleCancelBooking = async (bookingId) => {
    if (!bookingId) return;
    await adminService.cancelBooking(bookingId);
    setBookings((prev) => prev.map((b) => (b.id === bookingId || b._id === bookingId ? { ...b, status: "cancelled" } : b)));
  };

  const handleUpdateBookingStatus = async (bookingId, status) => {
    if (!bookingId || !status) return;
    const response = await adminService.updateBooking(bookingId, { status });
    const updated = response?.data || {};
    setBookings((prev) => prev.map((b) => (b.id === bookingId || b._id === bookingId ? { ...b, ...updated } : b)));
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-12 text-center text-sm font-medium tracking-wide text-slate-400">
          Syncing secure admin ledger...
        </div>
      );
    }

    if (error) {
      return (
        <div className="rounded-2xl border border-red-500/10 bg-slate-900/60 p-6 text-red-400 shadow-lg shadow-red-500/[0.02]">
          <p className="text-sm font-semibold tracking-tight">Configuration Mismatch</p>
          <p className="mt-1 text-xs text-slate-500 font-mono">{error}</p>
        </div>
      );
    }

    switch (activeItem) {
      case "users":
        return <ManageUsers users={users} canManageUsers={canManageUsers} adminStats={adminStats} onAddUser={handleAddUser} onDeleteUser={handleDeleteUser} />;
      case "courses":
        return <ManageCourses courses={courses} onDeleteCourse={handleDeleteCourse} />;
      case "bookings":
        return <ManageBookings bookings={bookings} onCancelBooking={handleCancelBooking} onUpdateBookingStatus={handleUpdateBookingStatus} />;
      case "payments":
        return <ManagePayments payments={payments} revenue={totalRevenue} />;
      case "overview":
      default:
        return (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-5">
              <div className="flex items-start gap-3.5">
                <span className="flex items-center justify-center rounded-xl bg-cyan-500/10 p-2.5 text-cyan-400">
                  <FontAwesomeIcon icon={faGaugeHigh} className="text-sm" />
                </span>
                <div>
                  <h3 className="text-base font-medium text-white tracking-tight">Admin Overview</h3>
                  <p className="mt-0.5 text-xs text-slate-400 leading-normal">Monitor comprehensive platform activity, core student cohorts, and operations.</p>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <StatsCards stats={stats} />
              <AnalyticsCharts users={users.length} courses={courses.length} bookings={bookings.length} payments={payments} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 antialiased selection:bg-cyan-500/30">
      <div className="md:flex">
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeItem={activeItem}
          onItemSelect={setActiveItem}
          onLogout={handleLogout}
        />

        <div className="flex-1 min-w-0">
          {/* Mobile Top App Bar */}
          <div className="md:hidden border-b border-slate-900 bg-slate-950/80 backdrop-blur px-5 py-3.5 sticky top-0 z-40">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-cyan-400">System Gateway</p>
                <h1 className="text-base font-semibold tracking-tight text-white">Console</h1>
              </div>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700"
              >
                Menu
              </button>
            </div>
          </div>

          {/* Main Context Container */}
          <main className="p-4 sm:p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
            {/* Top Operational Banner */}
            <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-6 shadow-sm">
              <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                    {activeItem === "overview" ? "HQ OPERATIONS" : activeItem.toUpperCase()}
                  </p>
                  <h2 className="mt-1 text-xl font-bold tracking-tight text-white">
                    Maritime Academy System Control
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-400">Perform direct matrix updates, records management, and audit tracking.</p>
                </div>
                <div className="rounded-xl border border-slate-900 bg-slate-950/60 px-4 py-2.5 text-left md:min-w-[200px]">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Live Status</p>
                  <p className="mt-0.5 text-sm font-semibold text-cyan-300/90 tracking-tight">{liveDataLabel}</p>
                </div>
              </div>
            </div>

            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;