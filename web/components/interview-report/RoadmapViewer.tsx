import React from "react";
import { motion } from "framer-motion";
import { PreparationPlan } from "@/types/interview";

interface Props {
    activeQuestion: number;
    setActiveQuestion: React.Dispatch<React.SetStateAction<number>>;
    roadmapItem: PreparationPlan;
    totalDays: number;
}

export default function RoadmapViewer({
    activeQuestion,
    setActiveQuestion,
    roadmapItem,
    totalDays,
}: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-5"
        >
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-600/30 border border-purple-500/30 flex items-center justify-center text-2xl font-black text-purple-300">
                    {roadmapItem.day}
                </div>
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-purple-400/60">
                        Day {roadmapItem.day}
                    </p>
                    <h3 className="text-white font-bold text-base">
                        {roadmapItem.focus}
                    </h3>
                </div>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex flex-col gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1">
                    🗒️ Tasks for Today
                </p>
                {roadmapItem.tasks.map((task, i) => (
                    <div
                        key={i}
                        className="flex items-start gap-3 group"
                    >
                        <div className="w-5 h-5 rounded-full border border-purple-500/40 flex items-center justify-center text-purple-400 text-[10px] font-bold mt-0.5 shrink-0">
                            {i + 1}
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed group-hover:text-white transition-colors">
                            {task}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex gap-3 justify-between mt-2">
                <button
                    disabled={activeQuestion === 0}
                    onClick={() => setActiveQuestion((p) => p - 1)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-white/10 text-white/50 hover:text-white hover:border-white/30 disabled:opacity-20 transition-all"
                >
                    ← Prev Day
                </button>
                <button
                    disabled={activeQuestion === totalDays - 1}
                    onClick={() => setActiveQuestion((p) => p + 1)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-purple-600/30 border border-purple-500/30 text-purple-200 hover:bg-purple-600/50 disabled:opacity-20 transition-all"
                >
                    Next Day →
                </button>
            </div>
        </motion.div>
    );
}
