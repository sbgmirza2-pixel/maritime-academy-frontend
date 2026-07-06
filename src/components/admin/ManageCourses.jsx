const ManageCourses = ({ courses = [], onDeleteCourse }) => {
  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-cyan-500/5 transition duration-300 hover:-translate-y-1">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Manage Courses</h2>
          <p className="text-slate-400 mt-1">Live course catalog from the backend.</p>
        </div>
        <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">{courses.length} courses</span>
      </div>

      {courses.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {courses.map((course, index) => (
            <div key={course.id || course._id || index} className="rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400">
              <h3 className="text-lg font-semibold text-white">{course.title || course.name || `Course ${index + 1}`}</h3>
              <p className="mt-3 text-slate-400 line-clamp-3">{course.description || course.summary || 'No description available.'}</p>
              <div className="mt-4 grid gap-2 text-sm text-slate-400 sm:flex sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1">{course.category || course.type || 'General'}</span>
                  <span className="rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1">{course.duration || `${course.duration_days ?? 'N/A'} days`}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1">${course.price ?? 'N/A'}</span>
                  <span className="rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1">{course.status || 'Unknown'}</span>
                </div>
              </div>
              {course.location && (
                <p className="mt-3 text-sm text-slate-500">Location: {course.location}</p>
              )}
              {onDeleteCourse && (
                <button
                  onClick={() => onDeleteCourse(course.id || course._id)}
                  className="mt-4 rounded-2xl bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/20"
                >
                  Delete Course
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/80 p-8 text-center text-slate-500">
          No courses available from the backend.
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
