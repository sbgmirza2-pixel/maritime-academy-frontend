import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { parseProgress, getEnrollmentId } from '../../utils/courseProgressUtils';

const CourseProgressCard = ({ course, onUpdateProgress, updatingCourseId }) => {
  const title = course.title || course.name || 'Untitled Course';
  const progressValue = parseProgress(course);
  const status = course.status || (progressValue >= 100 ? 'Completed' : 'In progress');
  const enrollmentId = getEnrollmentId(course);

  return (
    <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-6 shadow-sm transition duration-200 hover:bg-slate-900/50">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-base font-bold tracking-tight text-white">{title}</h4>
          {(course.instructor || course.teacher) && (
            <p className="text-xs text-slate-400 mt-0.5">Instructor: {course.instructor || course.teacher}</p>
          )}
        </div>
        <span className={`rounded-xl px-3 py-1 text-xs font-semibold tracking-tight shrink-0 self-start md:self-auto border ${
          progressValue >= 100 
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10' 
            : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/10'
        }`}>
          {status}
        </span>
      </div>

      {/* Progress Track Section */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-xs font-medium text-slate-400">
          <span>Track Metrics Progress</span>
          <span className="font-mono">{progressValue}%</span>
        </div>
        <div className="mt-2 h-3 rounded-xl bg-slate-950 overflow-hidden border border-slate-900 p-0.5">
          <div 
            className="h-full rounded-lg bg-cyan-500 transition-all duration-500 ease-out" 
            style={{ width: `${progressValue}%` }} 
          />
        </div>
      </div>

      {(course.summary || course.description) && (
        <p className="mt-4 text-xs text-slate-400 leading-normal break-words">{course.summary || course.description}</p>
      )}

      {/* Operational Actions */}
      <div className="mt-6 pt-5 border-t border-slate-900/60 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            disabled={updatingCourseId === enrollmentId || progressValue >= 100}
            onClick={() => onUpdateProgress(course, Math.min(100, progressValue + 10))}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-2 text-xs font-semibold text-cyan-400 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:bg-slate-900 disabled:border-slate-900 disabled:text-slate-600"
          >
            <FontAwesomeIcon icon={faArrowUp} className="text-[10px]" />
            <span>+10% Velocity</span>
          </button>
          
          <button
            type="button"
            disabled={updatingCourseId === enrollmentId || progressValue <= 0}
            onClick={() => onUpdateProgress(course, Math.max(0, progressValue - 10))}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-900 bg-slate-950/40 px-3.5 py-2 text-xs font-semibold text-slate-400 transition hover:border-slate-800 hover:text-white disabled:cursor-not-allowed disabled:border-slate-900 disabled:text-slate-600"
          >
            <FontAwesomeIcon icon={faArrowDown} className="text-[10px]" />
            <span>-10%</span>
          </button>
          
          <button
            type="button"
            disabled={updatingCourseId === enrollmentId || progressValue >= 100}
            onClick={() => onUpdateProgress(course, 100)}
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/10 bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:border-slate-900 disabled:text-slate-600"
          >
            <FontAwesomeIcon icon={faCheckCircle} className="text-[10px]" />
            <span>Force Complete</span>
          </button>
        </div>
        
        <span className="text-xs text-slate-500 font-mono tracking-tight sm:text-right">
          {updatingCourseId === enrollmentId ? 'Syncing core...' : 'Adjust training progress'}
        </span>
      </div>
    </div>
  );
};

export default CourseProgressCard;