import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InterviewReport, SectionId, TechnicalQuestion } from "@/types/interview";
import GlassCard from "./GlassCard";

interface Props {
    report: InterviewReport;
    sections: { id: SectionId; label: string; emoji: string }[];
    activeSection: SectionId;
    setActiveSection: (id: SectionId) => void;
    activeQuestion: number;
    setActiveQuestion: (idx: number) => void;
}

export default function LeftSidebar({
    report,
    sections,
    activeSection,
    setActiveSection,
    activeQuestion,
    setActiveQuestion,
}: Props) {
    const activeQuestions =
        activeSection === "technical"
            ? report.technicalQuestions ?? []
            : activeSection === "behavioral"
            ? report.behavioralQuestions ?? []
            : [];

    return (
        <GlassCard className="flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-white/10">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-purple-300/70 mb-1">
                    Report
                </p>
                <h2 className="text-white font-bold text-base leading-tight line-clamp-2">
                    {report.title}
                </h2>
                <p className="text-white/30 text-[11px] mt-1">
                    {new Date(report.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </p>
            </div>

            {/* Sections */}
            <nav className="flex-1 flex flex-col gap-1 p-3 overflow-y-auto scrollbar-thin">
                {sections.map((s) => {
                    const isActive = activeSection === s.id;
                    const count =
                        s.id === "technical"
                            ? report.technicalQuestions?.length ?? 0
                            : s.id === "behavioral"
                            ? report.behavioralQuestions?.length ?? 0
                            : report.preparationPlan?.length ?? 0;

                    return (
                        <button
                            key={s.id}
                            onClick={() => {
                                setActiveSection(s.id);
                                setActiveQuestion(0);
                            }}
                            className={`relative w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left text-sm font-medium transition-all duration-300 group
                            ${
                                isActive
                                    ? "bg-purple-600/20 border border-purple-500/30 text-white"
                                    : "text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent"
                            }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-glow"
                                    className="absolute inset-0 rounded-xl bg-purple-500/10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10 text-base">{s.emoji}</span>
                            <span className="relative z-10 leading-tight flex-1">
                                {s.label}
                            </span>
                            <span
                                className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-full border font-bold
                              ${
                                  isActive
                                      ? "border-purple-500/40 text-purple-300"
                                      : "border-white/10 text-white/30"
                              }`}
                            >
                                {count}
                            </span>
                        </button>
                    );
                })}

                {/* Sub-items for active section */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-1 mt-1 overflow-hidden"
                    >
                        {activeSection !== "roadmap"
                            ? activeQuestions.map((_, idx) => (
                                  <button
                                      key={idx}
                                      onClick={() => setActiveQuestion(idx)}
                                      className={`ml-4 text-left text-xs px-3 py-2 rounded-lg truncate transition-all duration-200
                                      ${
                                          activeQuestion === idx
                                              ? "bg-white/10 text-white"
                                              : "text-white/30 hover:text-white/60 hover:bg-white/5"
                                      }`}
                                  >
                                      <span className="text-purple-400/60 mr-1.5 font-mono">
                                          {String(idx + 1).padStart(2, "0")}
                                      </span>
                                      {(activeQuestions[idx] as TechnicalQuestion).question.slice(0, 40)}…
                                  </button>
                              ))
                            : report.preparationPlan.map((plan, idx) => (
                                  <button
                                      key={idx}
                                      onClick={() => setActiveQuestion(idx)}
                                      className={`ml-4 text-left text-xs px-3 py-2 rounded-lg truncate transition-all duration-200
                                      ${
                                          activeQuestion === idx
                                              ? "bg-white/10 text-white"
                                              : "text-white/30 hover:text-white/60 hover:bg-white/5"
                                      }`}
                                  >
                                      <span className="text-purple-400/60 mr-1.5 font-mono">
                                          Day {plan.day}
                                      </span>
                                      {plan.focus.slice(0, 32)}…
                                  </button>
                              ))}
                    </motion.div>
                </AnimatePresence>
            </nav>
        </GlassCard>
    );
}
