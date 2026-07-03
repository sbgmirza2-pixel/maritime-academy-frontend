import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { parseProgress, getEnrollmentId } from '../../utils/courseProgressUtils';

const CourseProgressCard = ({ course, onUpdateProgress, updatingCourseId }) => {
  const title = course.title || course.name || 'Untitled Course';
  const progressValue = parseProgress(course);
  const status = course.status || (progressValue >= 100 ? 'Completed' : 'In progress');
  const enrollmentId = getEnrollmentId(course);

  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-cyan-500/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-cyan-500/10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-xl font-semibold text-white">{title}</h4>
          {course.instructor || course.teacher ? (
            <p className="text-sm text-slate-400 mt-1">Instructor: {course.instructor || course.teacher}</p>
          ) : null}
        </div>
        <span className={`rounded-full px-3 py-1 text-sm ${progressValue >= 100 ? 'bg-emerald-500/15 text-emerald-200 border border-emerald-500/20' : 'bg-cyan-500/15 text-cyan-200 border border-cyan-500/20'}`}>
          {status}
        </span>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>Progress</span>
          <span>{progressValue}%</span>
        </div>
        <div className="mt-2 h-3 rounded-full bg-slate-800 overflow-hidden">
          <div className="h-full rounded-full bg-cyan-500 transition-all duration-500" style={{ width: `${progressValue}%` }} />
        </div>
      </div>

      {course.summary || course.description ? (
        <p className="mt-4 text-sm text-slate-400">{course.summary || course.description}</p>
      ) : null}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={updatingCourseId === enrollmentId || progressValue >= 100}
            onClick={() => onUpdateProgress(course, Math.min(100, progressValue + 10))}
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            <FontAwesomeIcon icon={faArrowUp} />
            +10%
          </button>
          <button
            type="button"
            disabled={updatingCourseId === enrollmentId || progressValue <= 0}
            onClick={() => onUpdateProgress(course, Math.max(0, progressValue - 10))}
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-200 disabled:cursor-not-allowed disabled:border-slate-700 disabled:text-slate-500"
          >
            <FontAwesomeIcon icon={faArrowDown} />
            -10%
          </button>
          <button
            type="button"
            disabled={updatingCourseId === enrollmentId || progressValue >= 100}
            onClick={() => onUpdateProgress(course, 100)}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:border-emerald-400 hover:text-emerald-100 disabled:cursor-not-allowed disabled:border-slate-700 disabled:text-slate-500"
          >
            <FontAwesomeIcon icon={faCheckCircle} />
            Mark completed
          </button>
        </div>
        <span className="text-sm text-slate-400">
          {updatingCourseId === enrollmentId ? 'Updating...' : 'Adjust training progress'}
        </span>
      </div>
    </div>
  );
};

export default CourseProgressCard;
