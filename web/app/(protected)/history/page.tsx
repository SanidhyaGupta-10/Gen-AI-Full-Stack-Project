"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useGetAllInterviewReports } from "@/hooks/useInterviewReport";
import {
  FileText,
  ArrowRight,
  CalendarDays,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react";

/* ── tiny helpers ─────────────────────────────────────────── */

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function scoreColor(score?: number) {
  if (!score) return "text-white/40";
  if (score >= 80) return "text-emerald-400";
  if (score >= 50) return "text-amber-400";
  return "text-rose-400";
}

function scoreGradient(score?: number) {
  if (!score) return "from-white/10 to-white/5";
  if (score >= 80) return "from-emerald-500/20 to-emerald-500/5";
  if (score >= 50) return "from-amber-500/20 to-amber-500/5";
  return "from-rose-500/20 to-rose-500/5";
}

/* ── page ─────────────────────────────────────────────────── */

export default function HistoryPage() {
  const { reports, loading, error } = useGetAllInterviewReports();

  return (
    <main className="min-h-screen pt-28 pb-16 px-4">
      {/* subtle grid */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* ── Header ── */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-linear-to-br from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20">
              <Clock size={22} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white">
              Interview{" "}
              <span className="bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                History
              </span>
            </h1>
          </div>
          <p className="text-white/40 text-sm max-w-lg">
            Browse every interview report you&apos;ve generated. Click any card
            to view the full analysis.
          </p>
        </motion.div>

        {/* ── Stats Bar ── */}
        {!loading && !error && reports.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8"
          >
            {/* total */}
            <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <FileText size={18} className="text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-black text-white">
                  {reports.length}
                </p>
                <p className="text-[11px] text-white/40 uppercase tracking-wider font-semibold">
                  Reports
                </p>
              </div>
            </div>

            {/* avg score */}
            <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <TrendingUp size={18} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-black text-white">
                  {Math.round(
                    reports.reduce(
                      (acc, r) => acc + (r.matchScore ?? 0),
                      0
                    ) / reports.length
                  )}
                  %
                </p>
                <p className="text-[11px] text-white/40 uppercase tracking-wider font-semibold">
                  Avg Match
                </p>
              </div>
            </div>

            {/* latest */}
            <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-4 flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <CalendarDays size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white truncate">
                  {formatDate(reports[0]?.createdAt)}
                </p>
                <p className="text-[11px] text-white/40 uppercase tracking-wider font-semibold">
                  Latest
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <svg
              className="animate-spin h-8 w-8 text-purple-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            <p className="text-white/40 text-sm">Loading your reports…</p>
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-rose-400 text-sm text-center py-16"
          >
            ⚠️ {error}
          </motion.p>
        )}

        {/* ── Empty State ── */}
        {!loading && !error && reports.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-32 gap-4"
          >
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <Sparkles size={32} className="text-purple-400" />
            </div>
            <p className="text-white/50 text-sm text-center max-w-xs">
              No interview reports yet. Head to the{" "}
              <Link href="/" className="text-purple-400 hover:underline">
                Dashboard
              </Link>{" "}
              and generate your first one!
            </p>
          </motion.div>
        )}

        {/* ── Reports List ── */}
        {!loading && !error && reports.length > 0 && (
          <motion.div
            className="flex flex-col gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
          >
            {reports.map((report) => (
              <motion.div
                key={report._id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link href={`/interview/${report._id}`}>
                  <div
                    className={`group relative rounded-2xl bg-linear-to-r ${scoreGradient(
                      report.matchScore
                    )} border border-white/10 backdrop-blur-xl p-5 flex items-center justify-between hover:border-white/20 transition-all cursor-pointer`}
                  >
                    {/* left */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="shrink-0 p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <FileText size={18} className="text-purple-400" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-white font-bold text-sm truncate group-hover:text-purple-300 transition-colors">
                          {report.title}
                        </h3>
                        <p className="text-white/30 text-xs mt-0.5 flex items-center gap-1.5">
                          <CalendarDays size={12} />
                          {formatDate(report.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* right */}
                    <div className="flex items-center gap-5 shrink-0">
                      {report.matchScore != null && (
                        <div className="text-right">
                          <p
                            className={`text-lg font-black ${scoreColor(
                              report.matchScore
                            )}`}
                          >
                            {report.matchScore}%
                          </p>
                          <p className="text-[10px] text-white/30 uppercase tracking-wider font-semibold">
                            Match
                          </p>
                        </div>
                      )}
                      <ArrowRight
                        size={16}
                        className="text-white/20 group-hover:text-purple-400 group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
