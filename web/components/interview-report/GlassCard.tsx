import React from "react";

export default function GlassCard({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`rounded-2xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-lg shadow-black/30 ${className}`}
        >
            {children}
        </div>
    );
}
