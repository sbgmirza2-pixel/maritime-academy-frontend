import React, { useState, useEffect } from 'react';
import trainingYacht from '../../assets/02.png'; 
import { courseService } from '../../services/courseService';

const ShippingTrainings = () => {
  const [curriculumDays, setCurriculumDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseTitle, setCourseTitle] = useState("ACADEMY TRAINING PROGRAM");

  // Fallback static array
  const fallbackCurriculum = [
    { day_number: 1, title: "Maritime & Training", point_1: "THIS ENCOMPASSES TRAINING PROGRAMS FOR INDIVIDUAL", point_2: "THIS INVOLVES SPECIALIZED TRAINING FOR INDIVIDUALS WHO OPERATE SHIPS" },
    { day_number: 2, title: "Ship & Handling", point_1: "THIS REFERS TO TRAINING FOR SAILORS, COVERING SKILLS LIKE KNOT TYING, SAIL.", point_2: "CONDITIONS, DOCKING AND UNDOCKING PROCEDURES HANDLING EMERGENCIES" },
    { day_number: 3, title: "Drying and Milling", point_1: "THIS REFERS TO TRAINING FOR SAILORS, COVERING SKILLS LIKE KNOT TYING, SAIL.", point_2: "SUCH TRAINING IS ESSENTIAL FOR THOSE INVOLVED IN SAILING VESSELS LIKE YACHTS." },
    { day_number: 4, title: "Sailor & Training", point_1: "THIS INCLUDES COURSES AND DRILLS RELATED TO SAFETY PROCEDUR ONBOARD SHIPS.", point_2: "THIS FOCUSES ON TEACHING INDIVIDUALS HOW TO AND NAVIGATE SHIPS USING SHIPS." },
    { day_number: 5, title: "Maritime & Safety", point_1: "THIS INVOLVES TRAINING FOR ENGINEERS AND TECHNICIANS RESPONSIBLE.", point_2: "MACHINERY, INCLUDING ENGINES, PROPULSION SYSTEMS, ELECTRICAL SYSTEMS" }
  ];

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        setLoading(true);
        const courseData = await courseService.getCourses({ limit: 1 });
        
        if (courseData && courseData.courses && courseData.courses.length > 0) {
          const primaryCourse = courseData.courses[0];
          setCourseTitle(primaryCourse.title);

          const curriculumData = await courseService.getCurriculum(primaryCourse.id);
          
          if (curriculumData && curriculumData.length > 0) {
            setCurriculumDays(curriculumData.slice(0, 5));
          } else {
            setCurriculumDays(fallbackCurriculum);
          }
        } else {
          setCurriculumDays(fallbackCurriculum);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error connecting timeline backend elements:", error);
        setCurriculumDays(fallbackCurriculum);
        setLoading(false);
      }
    };

    fetchTimelineData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#021526] text-white py-20 px-6 md:px-16 flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-400"></div>
          <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Synchronizing Academy Timeline...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full min-h-screen lg:h-[105vh] lg:min-h-[850px] text-white pt-12 pb-12 lg:pb-0 px-6 md:px-16 bg-cover bg-center bg-no-repeat flex flex-col justify-between overflow-hidden select-none"
      style={{ backgroundImage: `url(${trainingYacht})` }}
    >
      {/* 🔴 OVERLAY CHANGED: Backdrop blur completely removed, background picture is now 100% sharp */}
      <div className="absolute inset-0 bg-[#021526]/30 z-0"></div>

      {/* Top Heading */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="text-2xl md:text-3xl font-sans font-bold tracking-widest text-white uppercase whitespace-nowrap">
              SHIPPING TRAININGS
            </h2>
            <div className="h-[2px] bg-cyan-400 w-full max-w-[280px]"></div>
          </div>
          <span className="text-[10px] font-mono bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 px-3 py-1 rounded-sm uppercase tracking-widest self-start md:self-auto">
            Live Stream: {courseTitle}
          </span>
        </div>
      </div>

      {/* ⚓ 🌊 Timeline Tracker Layout */}
      <div className="relative mt-12 lg:mt-0 lg:absolute lg:bottom-4 lg:left-0 lg:right-0 w-full lg:px-16 z-20">
        <div className="max-w-7xl mx-auto w-full relative">
          
          {/* Main Horizontal Timeline Line (Only on Desktop) */}
          <div className="absolute top-[34px] left-8 right-8 h-[1.5px] bg-slate-400/40 hidden lg:block pointer-events-none"></div>

          {/* 5 Cards Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 items-start">
            {curriculumDays.map((item, index) => (
              <div key={item.id || index} className="flex flex-col items-center group">
                
                {/* Day Label */}
                <span className="text-slate-200 font-sans font-semibold text-xs md:text-sm mb-2 text-center block group-hover:text-cyan-400 transition-colors duration-300">
                  Day {item.day_number}
                </span>

                {/* Node Dot */}
                <div className="flex justify-center items-center w-full mb-5 relative">
                  <div className="h-[14px] w-[14px] rounded-full bg-white border-[3px] border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] group-hover:bg-cyan-400 transition-all duration-300 z-30"></div>
                </div>

                {/* Description Card */}
                <div className="bg-[#04121f]/95 lg:bg-[#04121f]/85 border border-slate-800/80 p-4 rounded-sm shadow-2xl w-full min-h-[180px] lg:min-h-[230px] max-w-[320px] sm:max-w-none flex flex-col justify-start backdrop-blur-md group-hover:border-cyan-500/30 transition-all duration-300">
                  
                  {/* Card Title */}
                  <h3 className="text-sm md:text-base font-sans font-bold text-white mb-4 tracking-wide text-left group-hover:text-cyan-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  {/* Points Content mapping directly to backend properties */}
                  <div className="space-y-3 flex-1 pt-2 border-t border-slate-800/50">
                    {item.point_1 && (
                      <div className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-[5px] shrink-0"></span>
                        <p className="text-slate-400 text-[10px] font-sans font-medium leading-relaxed tracking-wide uppercase">
                          {item.point_1}
                        </p>
                      </div>
                    )}
                    {item.point_2 && (
                      <div className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-[5px] shrink-0"></span>
                        <p className="text-slate-400 text-[10px] font-sans font-medium leading-relaxed tracking-wide uppercase">
                          {item.point_2}
                        </p>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ShippingTrainings;