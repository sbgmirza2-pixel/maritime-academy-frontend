import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGaugeHigh, faBookOpen, faChartLine, faCertificate } from "@fortawesome/free-solid-svg-icons";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StatsCards";
import ProgressTracker from "./ProgressTracker";
import Certificates from "./Certificates";
import CourseProgressCard from "./CourseProgressCard";
import { dashboardService } from "../../services/dashboardService";
import { courseService } from "../../services/courseService";
import { parseProgress } from "../../utils/courseProgressUtils";

const sectionTitles = {
  dashboard: {
    title: "HQ Operations",
    subtitle: "Dashboard Overview",
    description: "Monitor platform velocity, comprehensive track sync status, and credentials.",
  },
  courses: {
    title: "Academic Tracks",
    subtitle: "Enrolled Courses",
    description: "Review active cohorts, syllabus pathways, and direct operational logs.",
  },
  progress: {
    title: "Metrics Engine",
    subtitle: "Velocity Progress",
    description: "Detailed aggregate calculations and runtime progress trackers.",
  },
  certificates: {
    title: "Credential Ledger",
    subtitle: "Secured Certificates",
    description: "Cryptographic confirmation records, diplomas, and official verification.",
  },
};

const StudentDashboard = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [updatingCourseId, setUpdatingCourseId] = useState(null);
  const navigate = useNavigate();

  const getEnrollmentIdLocal = (course) => course.enrollment_id || course.id || course._id || course.enrollmentId;

  const handleUpdateProgress = async (course, newProgress) => {
    const enrollmentId = getEnrollmentIdLocal(course);
    if (!enrollmentId) {
      console.error("Missing enrollment ID for course progress update", course);
      return;
    }

    setUpdatingCourseId(enrollmentId);
    try {
      const updated = await courseService.updateProgress(enrollmentId, newProgress);
      const nextCourses = courses.map((existing) => {
        const existingId = getEnrollmentIdLocal(existing);
        if (existingId !== enrollmentId) return existing;
        return {
          ...existing,
          ...updated,
          progress: newProgress,
          completion: newProgress,
          status: newProgress >= 100 ? "Completed" : "In progress",
        };
      });
      setCourses(nextCourses);
    } catch (error) {
      console.error("Failed to update course progress", error);
    } finally {
      setUpdatingCourseId(null);
    }
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [profile, myEnrollments, myCertificates] = await Promise.all([
          dashboardService.getProfile(),
          courseService.getMyEnrollments(),
          courseService.getMyCertifications(),
        ]);

        setUser(profile);
        setCourses(myEnrollments || []);
        setCertificates(myCertificates || []);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      }
    };

    fetchDashboard();
  }, []);

  const averageProgress = courses.length
    ? Math.round(courses.reduce((sum, course) => sum + parseProgress(course), 0) / courses.length)
    : 0;

  const stats = [
    { title: "Courses", value: courses.length, note: "Total enrolled tracks" },
    { title: "Completed", value: courses.filter((course) => parseProgress(course) >= 100).length, note: "Completed syllabi" },
    { title: "Certificates", value: certificates.length, note: "Secured credentials" },
    { title: "Progress", value: `${averageProgress}%`, note: "Average platform velocity" },
  ];

  const section = sectionTitles[activeItem] || sectionTitles.dashboard;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 antialiased selection:bg-cyan-500/30">
      <div className="md:flex">
        <DashboardSidebar
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
            
            {/* Top Functional Operational Banner */}
            <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-6 shadow-sm">
              <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                <div className="flex items-start gap-4">
                  <span className="hidden sm:flex items-center justify-center rounded-xl bg-cyan-500/10 p-2.5 text-cyan-400 border border-cyan-500/10 shrink-0 mt-0.5">
                    <FontAwesomeIcon icon={activeItem === 'dashboard' ? faGaugeHigh : activeItem === 'courses' ? faBookOpen : activeItem === 'progress' ? faChartLine : faCertificate} className="text-sm" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">{section.title}</p>
                    <h2 className="mt-1 text-xl font-bold tracking-tight text-white">{section.subtitle}</h2>
                    <p className="mt-0.5 text-xs text-slate-400">{section.description}</p>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-900 bg-slate-950/60 px-4 py-2.5 text-left md:min-w-[200px]">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Live Metric Status</p>
                  <p className="mt-0.5 text-sm font-semibold text-cyan-300/90 tracking-tight">
                    {courses.length} Active {courses.length === 1 ? 'Track' : 'Tracks'}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Overview Card */}
            <DashboardHeader user={user} />

            {/* Content Swapping Views based on Selection */}
            {activeItem === 'dashboard' && (
              <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr] items-start">
                <div className="space-y-6 min-w-0">
                  <StatsCards stats={stats} />
                  <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-6 shadow-sm">
                    <h3 className="text-base font-bold tracking-tight text-white">At a glance</h3>
                    <p className="mt-2 text-sm text-slate-400 leading-normal">
                      You are currently deployed inside <span className="text-white font-semibold">{courses.length} training cohorts</span> and have cleared <span className="text-white font-semibold">{certificates.length} verification records</span> seamlessly.
                    </p>
                  </div>
                </div>
                <Certificates certificates={certificates} />
              </div>
            )}

            {activeItem === 'courses' && (
              <div className="space-y-6">
                {courses.length > 0 ? (
                  <div className="grid gap-6 min-w-0">
                    {courses.map((course, index) => (
                      <CourseProgressCard
                        key={index}
                        course={course}
                        onUpdateProgress={handleUpdateProgress}
                        updatingCourseId={updatingCourseId}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-12 text-center text-sm font-medium text-slate-400">
                    No active training files allocated to this user profile.
                  </div>
                )}
              </div>
            )}

            {activeItem === 'progress' && (
              <div className="space-y-6">
                <ProgressTracker progress={averageProgress} />
                
                <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-6 shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Core Subsystem Vectors</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Individual course progression breakdowns.</p>
                  </div>

                  {courses.length > 0 ? (
                    <div className="grid gap-4 min-w-0">
                      {courses.map((course, index) => {
                        const title = course.title || course.name || `Course ${index + 1}`;
                        const progressValue = parseProgress(course);

                        return (
                          <div key={index} className="rounded-xl border border-slate-900 bg-slate-950/40 p-5 min-w-0">
                            <div className="flex items-center justify-between gap-4">
                              <h4 className="text-sm font-bold text-white truncate">{title}</h4>
                              <span className="font-mono text-xs font-bold text-slate-400 shrink-0">{progressValue}%</span>
                            </div>
                            <div className="mt-3 h-2 rounded-xl bg-slate-950 border border-slate-900 overflow-hidden p-0.5">
                              <div className="h-full rounded-lg bg-cyan-500 transition-all duration-500 ease-out" style={{ width: `${progressValue}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center text-xs text-slate-500 py-6 italic">
                      No computational matrix maps found.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeItem === 'certificates' && (
              <div className="max-w-3xl mx-auto">
                <Certificates certificates={certificates} />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;