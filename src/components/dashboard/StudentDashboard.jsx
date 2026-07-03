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
import { parseProgress, getEnrollmentId } from "../../utils/courseProgressUtils";


const sectionTitles = {
  dashboard: {
    title: "Dashboard Overview",
    subtitle: "See your course count, progress, and certificates at a glance.",
  },
  courses: {
    title: "Courses",
    subtitle: "List of enrolled courses with current completion status.",
  },
  progress: {
    title: "Progress",
    subtitle: "Exact progress for each active course.",
  },
  certificates: {
    title: "Certificates",
    subtitle: "Certificates you have earned so far.",
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

  const getEnrollmentId = (course) => course.enrollment_id || course.id || course._id || course.enrollmentId;

  const handleUpdateProgress = async (course, newProgress) => {
    const enrollmentId = getEnrollmentId(course);
    if (!enrollmentId) {
      console.error("Missing enrollment ID for course progress update", course);
      return;
    }

    setUpdatingCourseId(enrollmentId);
    try {
      const updated = await courseService.updateProgress(enrollmentId, newProgress);
      const nextCourses = courses.map((existing) => {
        const existingId = getEnrollmentId(existing);
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
    { title: "Courses", value: courses.length },
    { title: "Completed", value: courses.filter((course) => parseProgress(course) >= 100).length },
    { title: "Certificates", value: certificates.length },
    { title: "Progress", value: `${averageProgress}%` },
  ];

  const section = sectionTitles[activeItem] || sectionTitles.dashboard;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="md:flex">
        <DashboardSidebar
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
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Student Dashboard</p>
                <h1 className="text-xl font-semibold">Welcome Back</h1>
              </div>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="inline-flex items-center gap-2 rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-200"
              >
                <span>Menu</span>
                <span className="text-lg">☰</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <div
              className={`fixed inset-0 z-40 bg-slate-950/80 transition-opacity duration-300 md:hidden ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              onClick={() => setIsSidebarOpen(false)}
            />

            <main className="relative z-10 px-4 py-6 sm:px-6 md:px-8">
              <div className="mb-6 rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-cyan-500/5 transition duration-300 hover:-translate-y-0.5 hover:shadow-cyan-500/20">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="rounded-2xl bg-slate-800 p-3 text-cyan-300 shadow-inner shadow-cyan-500/10">
                      <FontAwesomeIcon icon={activeItem === 'dashboard' ? faGaugeHigh : activeItem === 'courses' ? faBookOpen : activeItem === 'progress' ? faChartLine : faCertificate} />
                    </span>
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{section.title}</p>
                      <h2 className="mt-2 text-3xl font-semibold text-white">{section.subtitle}</h2>
                    </div>
                  </div>
                </div>
              </div>

              <DashboardHeader user={user} />

              {activeItem === 'dashboard' && (
                <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
                  <div className="space-y-6">
                    <StatsCards stats={stats} />
                    <div className="rounded-[2rem] border border-cyan-500/20 bg-slate-900/90 p-6 shadow-xl shadow-cyan-500/5 transition duration-300 hover:-translate-y-0.5 hover:shadow-cyan-500/20">
                      <h3 className="text-xl font-semibold text-white">At a glance</h3>
                      <p className="mt-4 text-slate-400">You are currently enrolled in {courses.length} course{courses.length === 1 ? '' : 's'} and have earned {certificates.length} certificate{certificates.length === 1 ? '' : 's'}.</p>
                    </div>
                  </div>
                  <Certificates certificates={certificates} />
                </div>
              )}

              {activeItem === 'courses' && (
                <div className="space-y-6">
                  <div className="rounded-[2rem] border border-emerald-500/20 bg-slate-900/90 p-6 shadow-xl shadow-emerald-500/5 transition duration-300 hover:-translate-y-0.5 hover:shadow-emerald-500/20">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-3">
                        <span className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-200">
                          <FontAwesomeIcon icon={faBookOpen} />
                        </span>
                        <div>
                          <h3 className="text-2xl font-semibold text-white">Enrolled Courses</h3>
                          <p className="text-slate-400 mt-1">View your active courses and progress for each one.</p>
                        </div>
                      </div>
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">{courses.length} enrolled</span>
                    </div>
                  </div>

                  {courses.length > 0 ? (
                    <div className="grid gap-4">
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
                    <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-cyan-500/5">
                      <p className="text-slate-400">No courses enrolled yet.</p>
                    </div>
                  )}
                </div>
              )}

              {activeItem === 'progress' && (
                <div className="space-y-6">
                  <ProgressTracker progress={averageProgress} />
                  <div className="rounded-[2rem] border border-violet-500/20 bg-slate-900/90 p-6 shadow-xl shadow-violet-500/5 transition duration-300 hover:-translate-y-0.5 hover:shadow-violet-500/20">
                    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-3">
                        <span className="rounded-2xl bg-violet-500/15 p-3 text-violet-200">
                          <FontAwesomeIcon icon={faChartLine} />
                        </span>
                        <div>
                          <h3 className="text-2xl font-semibold text-white">Course Progress</h3>
                          <p className="text-slate-400 mt-1">See how each course is progressing.</p>
                        </div>
                      </div>
                      <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-200">Average {averageProgress}%</span>
                    </div>

                    {courses.length > 0 ? (
                      <div className="space-y-4">
                        {courses.map((course, index) => {
                          const title = course.title || course.name || `Course ${index + 1}`;
                          const progressValue = parseProgress(course);

                          return (
                            <div key={index} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
                              <div className="flex items-center justify-between gap-4">
                                <div>
                                  <h4 className="text-lg font-semibold text-white">{title}</h4>
                                </div>
                                <span className="text-sm text-slate-400">{progressValue}%</span>
                              </div>
                              <div className="mt-4 h-2 rounded-full bg-slate-800 overflow-hidden">
                                <div className="h-full rounded-full bg-cyan-500" style={{ width: `${progressValue}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-slate-400">No progress data because no courses are enrolled yet.</p>
                    )}
                  </div>
                </div>
              )}

              {activeItem === 'certificates' && (
                <div className="space-y-6">
                  <div className="rounded-[2rem] border border-amber-500/20 bg-slate-900/90 p-6 shadow-xl shadow-amber-500/5 transition duration-300 hover:-translate-y-0.5 hover:shadow-amber-500/20">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-3">
                        <span className="rounded-2xl bg-amber-500/15 p-3 text-amber-200">
                          <FontAwesomeIcon icon={faCertificate} />
                        </span>
                        <div>
                          <h3 className="text-2xl font-semibold text-white">Certificates</h3>
                          <p className="text-slate-400 mt-1">History of certificates you have earned.</p>
                        </div>
                      </div>
                      <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-200">{certificates.length} total</span>
                    </div>

                    {certificates.length > 0 ? (
                      <div className="mt-6 space-y-4">
                        {certificates.map((cert, index) => (
                          <div key={index} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
                            <h4 className="text-lg font-semibold text-white">{cert.title || cert.name || `Certificate ${index + 1}`}</h4>
                            <p className="text-slate-400 mt-1">{cert.issuer || cert.issued_by || 'Training Academy'}</p>
                            {cert.date ? <p className="mt-2 text-sm text-slate-500">Issued on {cert.date}</p> : null}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-6 text-slate-400">No certificates received yet.</p>
                    )}
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;