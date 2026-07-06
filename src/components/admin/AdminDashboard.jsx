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

      if (usersResult.status === "rejected") {
        console.warn("User profile endpoint unavailable or requires admin authentication", usersResult.reason);
      }
      if (coursesResult.status === "rejected") {
        console.warn("Courses endpoint unavailable or requires authentication", coursesResult.reason);
      }
      if (bookingsResult.status === "rejected") {
        console.warn("Bookings endpoint unavailable or requires authentication", bookingsResult.reason);
      }
      if (paymentsResult.status === "rejected") {
        console.warn("Payments endpoint unavailable or requires authentication", paymentsResult.reason);
      }

      setUsers(Array.isArray(loadedUsers) ? loadedUsers : []);
      setCanManageUsers(loadedCanManageUsers);
      setCourses(Array.isArray(loadedCourses) ? loadedCourses : []);
      setBookings(Array.isArray(loadedBookings) ? loadedBookings : []);
      setPayments(Array.isArray(loadedPayments) ? loadedPayments : []);
      setAdminStats(loadedStats);
      setLoading(false);
      if (loadedStats) {
        setError(null);
      }
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
    ? "Admin stats available, details restricted"
    : users.length
    ? "Profile-only access"
    : "No user data";
  const liveDataLabel = loading
    ? "syncing..."
    : canManageUsers
    ? `${totalUsers} users, ${totalCourses} courses`
    : adminStats?.total_users
    ? `Profile details only · ${adminStats.total_users} users known`
    : users.length
    ? `Profile only · ${users.length} profile shown`
    : `No admin profile, ${totalCourses} courses`;

  const stats = [
    {
      title: "Users",
      value: userCountDisplay,
      icon: faUsers,
      accent: "bg-sky-500/15 text-sky-300 border border-sky-500/20",
      note: userCardNote,
    },
    { title: "Courses", value: totalCourses, icon: faBookOpen, accent: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20", note: "Courses loaded from backend" },
    { title: "Bookings", value: totalBookings, icon: faCalendarCheck, accent: "bg-amber-500/15 text-amber-300 border border-amber-500/20", note: "Bookings require auth" },
    { title: "Payments", value: `$${revenueValue.toLocaleString()}`, icon: faCreditCard, accent: "bg-violet-500/15 text-violet-300 border border-violet-500/20", note: "Revenue from payment history" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleAddUser = async (userData) => {
    try {
      const response = await adminService.createUser(userData);
      const createdUser = response?.data || response;
      setUsers((prev) => [createdUser, ...prev]);
      return createdUser;
    } catch (createError) {
      console.error("Failed to create user", createError);
      throw createError;
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!userId) return;
    try {
      await adminService.deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user.id !== userId && user._id !== userId));
    } catch (deleteError) {
      console.error("Failed to delete user", deleteError);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!courseId) return;
    try {
      await adminService.deleteCourse(courseId);
      setCourses((prev) => prev.filter((course) => course.id !== courseId && course._id !== courseId));
    } catch (deleteError) {
      console.error("Failed to delete course", deleteError);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!bookingId) return;
    try {
      await adminService.cancelBooking(bookingId);
      setBookings((prev) => prev.map((booking) => {
        if (booking.id === bookingId || booking._id === bookingId) {
          return { ...booking, status: "cancelled" };
        }
        return booking;
      }));
    } catch (cancelError) {
      console.error("Failed to cancel booking", cancelError);
    }
  };

  const handleUpdateBookingStatus = async (bookingId, status) => {
    if (!bookingId || !status) return;
    try {
      const response = await adminService.updateBooking(bookingId, { status });
      const updated = response?.data || {};
      setBookings((prev) => prev.map((booking) => {
        if (booking.id === bookingId || booking._id === bookingId) {
          return { ...booking, ...updated };
        }
        return booking;
      }));
    } catch (updateError) {
      console.error("Failed to update booking status", updateError);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-10 text-center text-slate-400 shadow-xl shadow-cyan-500/5">
          Loading admin data...
        </div>
      );
    }

    if (error) {
      return (
        <div className="rounded-[2rem] border border-red-500/20 bg-slate-900/90 p-6 text-red-300 shadow-xl shadow-red-500/10">
          <p className="text-lg font-semibold">Unable to load admin data</p>
          <p className="mt-2 text-slate-400">{error}</p>
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
            <div className="rounded-[2rem] border border-cyan-500/20 bg-slate-900/90 p-6 shadow-xl shadow-cyan-500/5 transition duration-500 ease-out hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <span className="rounded-2xl bg-cyan-500/15 p-3 text-cyan-300">
                  <FontAwesomeIcon icon={faGaugeHigh} />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-white">Admin Overview</h3>
                  <p className="mt-1 text-slate-400">Monitor platform activity, users, and training operations in one place.</p>
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="md:flex">
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeItem={activeItem}
          onItemSelect={setActiveItem}
          onLogout={handleLogout}
        />

        <div className="flex-1">
          <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Admin Dashboard</p>
                <h1 className="text-xl font-semibold">Welcome Back</h1>
              </div>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="inline-flex items-center gap-2 rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-200"
              >
                <span>Menu</span>
                <span className="text-lg">?</span>
              </button>
            </div>
          </div>

          <main className="px-4 py-6 sm:px-6 md:px-8">
            <div className="mb-6 rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-cyan-500/5 transition duration-500 ease-out">
              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{activeItem === "overview" ? "Administration" : activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}</p>
                  <h2 className="mt-2 text-3xl font-semibold text-white">Manage the maritime academy operations with ease.</h2>
                </div>
                <div className="self-start rounded-3xl border border-slate-800 bg-slate-950/80 px-5 py-4 text-slate-300 shadow-inner shadow-cyan-500/5 max-w-[280px]">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Live data</p>
                  <p className="mt-2 text-lg font-semibold text-white">{liveDataLabel}</p>
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
