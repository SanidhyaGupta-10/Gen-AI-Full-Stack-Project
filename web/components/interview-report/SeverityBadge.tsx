import React from "react";

export default function SeverityBadge({ severity }: { severity: "low" | "medium" | "high" }) {
    const map = {
        low: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        medium: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        high: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    };
    return (
        <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest border ${map[severity]}`}
        >
            {severity}
        </span>
    );
}
