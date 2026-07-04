export const parseProgress = (course) => {
  if (!course) return 0;
  if (typeof course.progress === 'number') return course.progress;
  if (typeof course.progress === 'string') {
    const parsed = Number(course.progress.replace('%', '').trim());
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  if (typeof course.completion === 'number') return course.completion;
  if (course.status?.toLowerCase?.() === 'completed') return 100;
  return 0;
};

export const getEnrollmentId = (course) => course.enrollment_id || course.id || course._id || course.enrollmentId;
