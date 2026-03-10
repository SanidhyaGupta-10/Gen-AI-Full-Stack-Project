import React from "react";
import { motion } from "framer-motion";

export default function ScoreRing({ score }: { score: number }) {
    const radius = 40;
    const circ = 2 * Math.PI * radius;
    const offset = circ - (score / 100) * circ;

    const color =
        score >= 75 ? "#a78bfa" : score >= 50 ? "#fbbf24" : "#f87171";

    return (
        <div className="flex flex-col items-center gap-1">
            <svg width="100" height="100" className="-rotate-90">
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="fill-none stroke-white/5"
                    strokeWidth="8"
                />
                <motion.circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    initial={{ strokeDashoffset: circ }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
                />
            </svg>
            <span
                className="text-2xl font-black text-white -mt-17 mb-12"
                style={{ color }}
            >
                {score}%
            </span>
        </div>
    );
}
