import React from "react";

export default function SkeletonBlock({ className = "" }: { className?: string }) {
    return (
        <div
            className={`animate-pulse rounded-xl bg-white/5 border border-white/5 ${className}`}
        />
    );
}
