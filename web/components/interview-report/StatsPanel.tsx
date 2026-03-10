import React from "react";
import { motion } from "framer-motion";
import { InterviewReport } from "@/types/interview";
import ScoreRing from "./ScoreRing";
import SeverityBadge from "./SeverityBadge";
import GlassCard from "./GlassCard";

export default function StatsPanel({ report }: { report: InterviewReport }) {
    return (
        <GlassCard className="flex flex-col overflow-hidden">
            <div className="p-5 border-b border-white/10">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                    Match Score
                </p>
            </div>

            <div className="flex flex-col gap-6 p-5 overflow-y-auto flex-1 scrollbar-thin">
                {/* Score ring */}
                <div className="flex flex-col items-center">
                    {report.matchScore !== undefined ? (
                        <ScoreRing score={report.matchScore} />
                    ) : (
                        <p className="text-white/30 text-xs">No score available</p>
                    )}
                    <p className="text-white/40 text-xs text-center mt-1">
                        Resume-to-Job Match
                    </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 w-full" />

                {/* Technical Gaps */}
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-3">
                        Technical Gaps
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {(report.skillGaps?.length ?? 0) === 0 ? (
                            <p className="text-white/20 text-xs">No gaps detected 🎉</p>
                        ) : (
                            report.skillGaps.map((gap, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 group hover:border-white/20 transition-all"
                                >
                                    <span className="text-white/70 text-xs font-medium">
                                        {gap.skill}
                                    </span>
                                    <SeverityBadge severity={gap.severity} />
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 w-full" />

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-2">
                    {[
                        {
                            label: "Technical",
                            val: report.technicalQuestions?.length ?? 0,
                            icon: "⚙️",
                        },
                        {
                            label: "Behavioral",
                            val: report.behavioralQuestions?.length ?? 0,
                            icon: "🧠",
                        },
                        {
                            label: "Days",
                            val: report.preparationPlan?.length ?? 0,
                            icon: "📅",
                        },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl py-3 gap-0.5"
                        >
                            <span className="text-base">{s.icon}</span>
                            <span className="text-white font-black text-lg leading-none">
                                {s.val}
                            </span>
                            <span className="text-white/30 text-[9px] uppercase tracking-wider">
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </GlassCard>
    );
}
