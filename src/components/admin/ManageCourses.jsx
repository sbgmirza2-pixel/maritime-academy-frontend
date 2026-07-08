const ManageCourses = ({ courses = [], onDeleteCourse }) => {
  return (
    <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-6">
      {/* Component Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white">Manage Courses</h2>
          <p className="text-xs text-slate-400 mt-0.5">Live training catalog synched from registry backend.</p>
        </div>
        <span className="self-start sm:self-center rounded-lg bg-cyan-500/10 px-2.5 py-1 text-[11px] font-medium text-cyan-400">
          {courses.length} {courses.length === 1 ? 'course' : 'courses'}
        </span>
      </div>

      {/* Main Grid Catalog */}
      {courses.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {courses.map((course, index) => (
            <div 
              key={course.id || course._id || index} 
              className="rounded-xl border border-slate-900 bg-slate-950/40 p-5 flex flex-col justify-between transition duration-150 hover:border-slate-800 hover:bg-slate-950/70"
            >
              <div>
                {/* Course Metadata Meta Badges */}
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  <span className="rounded bg-slate-900 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 border border-slate-800">
                    {course.category || course.type || 'General'}
                  </span>
                  <span className="rounded bg-slate-900 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 border border-slate-800">
                    {course.duration || `${course.duration_days ?? 'N/A'} days`}
                  </span>
                </div>

                <h3 className="text-sm font-semibold tracking-tight text-white line-clamp-1">
                  {course.title || course.name || `Module Block Reference #${index + 1}`}
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-normal line-clamp-2">
                  {course.description || course.summary || 'No curriculum documentation description indexed.'}
                </p>
              </div>

              {/* Course Specification Details Block */}
              <div className="mt-4 pt-3 border-t border-slate-900/60">
                <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                  <span className="text-slate-500">Rate: <span className="text-slate-300 font-sans font-medium">${course.price ?? '0'}</span></span>
                  <span className={`px-1 rounded text-[10px] font-bold uppercase ${course.status?.toLowerCase() === 'active' ? 'text-cyan-400' : 'text-slate-500'}`}>
                    {course.status || 'Active'}
                  </span>
                </div>
                
                {course.location && (
                  <p className="mt-2 text-[11px] text-slate-500 tracking-tight">
                    Deployment: <span className="text-slate-400">{course.location}</span>
                  </p>
                )}

                {onDeleteCourse && (
                  <button
                    onClick={() => onDeleteCourse(course.id || course._id)}
                    className="mt-4 w-full rounded-lg bg-red-500/10 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
                  >
                    Purge Module
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-slate-900 bg-slate-950/20 p-8 text-center text-xs font-medium text-slate-500">
          No courses currently indexed in catalog matrix.
        </div>
      )}
    </div>
  );
};

export default ManageCourses;