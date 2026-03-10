import React from "react";
import { motion } from "framer-motion";
import { TechnicalQuestion, BehavioralQuestion } from "@/types/interview";

interface Props {
    activeQuestion: number;
    setActiveQuestion: React.Dispatch<React.SetStateAction<number>>;
    activeItem: TechnicalQuestion | BehavioralQuestion;
    totalQuestions: number;
}

export default function QuestionViewer({
    activeQuestion,
    setActiveQuestion,
    activeItem,
    totalQuestions,
}: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-5"
        >
            {/* Question */}
            <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-purple-400/60 mb-2">
                    Question {activeQuestion + 1}
                </p>
                <p className="text-white text-base font-semibold leading-relaxed">
                    {activeItem.question}
                </p>
            </div>

            {/* Intention */}
            <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-400/60 mb-2">
                    🎯 Why Interviewers Ask This
                </p>
                <p className="text-white/70 text-sm leading-relaxed">
                    {activeItem.intention}
                </p>
            </div>

            {/* Answer */}
            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400/60 mb-2">
                    ✅ Ideal Answer
                </p>
                <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line">
                    {activeItem.answer}
                </p>
            </div>

            {/* Prev / Next */}
            <div className="flex gap-3 justify-between mt-2">
                <button
                    disabled={activeQuestion === 0}
                    onClick={() => setActiveQuestion((p) => p - 1)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-white/10 text-white/50 hover:text-white hover:border-white/30 disabled:opacity-20 transition-all"
                >
                    ← Previous
                </button>
                <button
                    disabled={activeQuestion === totalQuestions - 1}
                    onClick={() => setActiveQuestion((p) => p + 1)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-purple-600/30 border border-purple-500/30 text-purple-200 hover:bg-purple-600/50 disabled:opacity-20 transition-all"
                >
                    Next →
                </button>
            </div>
        </motion.div>
    );
}
