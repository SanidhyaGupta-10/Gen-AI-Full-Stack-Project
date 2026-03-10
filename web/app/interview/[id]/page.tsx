"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { SectionId, TechnicalQuestion, BehavioralQuestion } from "@/types/interview";
import { useInterviewReport } from "@/hooks/useInterviewReport";

import GlassCard from "@/components/interview-report/GlassCard";
import SkeletonBlock from "@/components/interview-report/SkeletonBlock";
import LeftSidebar from "@/components/interview-report/LeftSidebar";
import QuestionViewer from "@/components/interview-report/QuestionViewer";
import RoadmapViewer from "@/components/interview-report/RoadmapViewer";
import StatsPanel from "@/components/interview-report/StatsPanel";

export default function InterviewReportPage() {
    const params = useParams();
    const id = params?.id as string;

    const { report, loading, error } = useInterviewReport(id);

    const [activeSection, setActiveSection] = useState<SectionId>("technical");
    const [activeQuestion, setActiveQuestion] = useState<number>(0);

    const sections: { id: SectionId; label: string; emoji: string }[] = [
        { id: "technical", label: "Technical Questions", emoji: "⚙️" },
        { id: "behavioral", label: "Behavioural Questions", emoji: "🧠" },
        { id: "roadmap", label: "Roadmap", emoji: "🗺️" },
    ];

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center p-6">
                <div className="w-full max-w-7xl grid grid-cols-[220px_1fr_240px] gap-4 h-[80vh]">
                    <SkeletonBlock className="h-full" />
                    <SkeletonBlock className="h-full" />
                    <SkeletonBlock className="h-full" />
                </div>
            </main>
        );
    }

    if (error || !report) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <GlassCard className="p-10 text-center max-w-md">
                    <div className="text-5xl mb-4">😕</div>
                    <h2 className="text-white text-xl font-bold mb-2">
                        Report Not Found
                    </h2>
                    <p className="text-white/40 text-sm">{error}</p>
                </GlassCard>
            </main>
        );
    }

    const activeQuestions =
        activeSection === "technical"
            ? report.technicalQuestions ?? []
            : activeSection === "behavioral"
                ? report.behavioralQuestions ?? []
                : [];

    const activeItem =
        activeSection !== "roadmap"
            ? (activeQuestions as (TechnicalQuestion | BehavioralQuestion)[])[activeQuestion]
            : null;

    const roadmapItem =
        activeSection === "roadmap"
            ? (report.preparationPlan ?? [])[activeQuestion]
            : null;

    return (
        <main className="min-h-screen flex flex-col px-4 pt-24 pb-8 relative">
            {/* ── Grid Layout ─────────────────────────────────────── */}
            <motion.div
                className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[230px_1fr_260px] gap-4 h-auto lg:h-[78vh]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* ══════════════════════════════════════════════════
            LEFT COLUMN — Navigation
        ══════════════════════════════════════════════════ */}
                <LeftSidebar
                    report={report}
                    sections={sections}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    activeQuestion={activeQuestion}
                    setActiveQuestion={setActiveQuestion}
                />

                {/* ══════════════════════════════════════════════════
            MIDDLE COLUMN — Main Content
        ══════════════════════════════════════════════════ */}
                <GlassCard className="flex flex-col overflow-hidden">
                    <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
                        <span className="text-xl">
                            {sections.find((s) => s.id === activeSection)?.emoji}
                        </span>
                        <h1 className="text-white font-bold text-lg">
                            {sections.find((s) => s.id === activeSection)?.label}
                        </h1>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        <AnimatePresence mode="wait">
                            {/* ── Question / Answer view ── */}
                            {activeSection !== "roadmap" && activeItem && (
                                <QuestionViewer
                                    key={`${activeSection}-${activeQuestion}`}
                                    activeQuestion={activeQuestion}
                                    setActiveQuestion={setActiveQuestion}
                                    activeItem={activeItem}
                                    totalQuestions={activeQuestions.length}
                                />
                            )}

                            {/* ── Roadmap view ── */}
                            {activeSection === "roadmap" && roadmapItem && (
                                <RoadmapViewer
                                    key={`roadmap-${activeQuestion}`}
                                    activeQuestion={activeQuestion}
                                    setActiveQuestion={setActiveQuestion}
                                    roadmapItem={roadmapItem}
                                    totalDays={report.preparationPlan?.length ?? 0}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </GlassCard>

                {/* ══════════════════════════════════════════════════
            RIGHT COLUMN — Stats Panel
        ══════════════════════════════════════════════════ */}
                <StatsPanel report={report} />
            </motion.div>
        </main>
    );
}
