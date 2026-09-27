import React from 'react';
import { StudentProfile } from '../types';
import {
  X,
  GraduationCap,
  Star,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Briefcase,
  MessageSquare,
  Award,
  BookOpen,
  Calendar,
  Clock,
  FolderGit2,
} from 'lucide-react';

interface StudentProfileModalProps {
  student: StudentProfile | null;
  onClose: () => void;
  onMessage: (student: StudentProfile) => void;
  onOfferGig: (student: StudentProfile) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  student,
  onClose,
  onMessage,
  onOfferGig,
}) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 flex items-start justify-between gap-4 bg-neutral-50/70">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-neutral-200"
                referrerPolicy="no-referrer"
              />
              {student.isEduVerified && (
                <span
                  className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 border-2 border-white"
                  title="Verified .edu Student"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900">
                  {student.name}
                </h2>
                <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-medium">
                  Verified .edu
                </span>
              </div>

              <div className="text-sm font-semibold text-neutral-700 flex items-center gap-1.5 mt-1">
                <GraduationCap className="w-4 h-4 text-neutral-500" />
                <span>{student.university}</span>
                <span aria-hidden="true">·</span>
                <span className="text-neutral-600">{student.major}</span>
                <span aria-hidden="true">·</span>
                <span className="text-neutral-500">Class of {student.graduationYear}</span>
              </div>

              <div className="flex items-center gap-3 mt-1.5 text-xs text-neutral-500">
                <span className="flex items-center gap-1 font-semibold text-neutral-800">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span className="font-mono tabular-nums">{student.rating}</span> ({student.reviewCount} reviews)
                </span>
                <span aria-hidden="true">·</span>
                <span>{student.completedJobsCount} gigs completed</span>
                <span aria-hidden="true">·</span>
                <span>{student.location}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Headline & Bio */}
          <div>
            <h3 className="text-sm font-bold text-neutral-900 mb-1.5">{student.headline}</h3>
            <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
              {student.bio}
            </p>
          </div>

          {/* Academic Verification Credentials */}
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>Verified Academic Records</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-neutral-500 font-medium block">Honors & GPA</span>
                <span className="text-sm font-semibold text-neutral-900 mt-0.5 block">
                  {student.gpaOrHonors}
                </span>
              </div>
              <div>
                <span className="text-xs text-neutral-500 font-medium block">Availability</span>
                <span className="text-sm font-semibold text-neutral-900 mt-0.5 block">
                  {student.availability}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-neutral-200/80">
              <span className="text-xs text-neutral-500 font-medium block mb-1.5">
                Verified Collegiate Coursework
              </span>
              <div className="flex flex-wrap gap-2">
                {student.verifiedCoursework.map((course, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs bg-white border border-neutral-300 rounded-md font-medium text-neutral-800"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio & Case Studies */}
          <div>
            <h4 className="text-sm font-bold text-neutral-900 mb-3 flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-neutral-600" />
              <span>Featured Student Projects & Case Studies</span>
            </h4>

            <div className="space-y-3">
              {student.portfolio.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white border border-neutral-200 rounded-xl hover:border-neutral-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-semibold text-neutral-500 uppercase">
                        {item.category} · {item.completionDate}
                      </span>
                      <h5 className="text-sm font-bold text-neutral-900 mt-0.5">
                        {item.title}
                      </h5>
                    </div>

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 shrink-0"
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-sm font-bold text-neutral-900 mb-2">Technical & Creative Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {student.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-xs text-neutral-800 bg-neutral-100 rounded-md font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-500 block">Standard Rate</span>
            <span className="font-mono text-lg font-bold text-neutral-900 tabular-nums">
              ${student.hourlyRate}/hr
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onMessage(student);
              }}
              className="px-4 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOfferGig(student);
              }}
              className="px-5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Offer Contract</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
