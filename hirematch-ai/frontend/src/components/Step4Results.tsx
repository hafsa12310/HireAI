import { motion } from 'framer-motion'
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  MessageSquare,
  ArrowRight,
  RotateCcw,
  ClipboardCheck,
} from 'lucide-react'
export interface AnalysisResult {
  score?: number | string
  match_score?: number | string
  summary?: string
  matchedSkills?: unknown
  matched_skills?: unknown
  missingSkills?: unknown
  missing_skills?: unknown
  improvements?: unknown
  resume_improvements?: unknown
  interviewQuestions?: unknown
  interview_questions?: unknown
  recommendations?: unknown
  final_recommendation?: unknown
  error?: string
  [key: string]: unknown
}

interface Step4ResultsProps {
  results: AnalysisResult
  onReset: () => void
}

const normalizeScore = (value: unknown) => {
  const parsed =
    typeof value === 'number'
      ? value
      : typeof value === 'string'
        ? Number.parseFloat(value.replace('%', ''))
        : 0

  if (!Number.isFinite(parsed)) return 0

  return Math.min(100, Math.max(0, Math.round(parsed)))
}

const normalizeList = (value: unknown) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(/\n|,(?=\s*[A-Za-z0-9])/)
      .map((item) => item.replace(/^[-*•\d.)\s]+/, '').trim())
      .filter(Boolean)
  }

  if (value == null) return []

  return [String(value).trim()].filter(Boolean)
}

const getNormalizedResults = (results: AnalysisResult) => {
  const recommendationItems = normalizeList(
    results.recommendations ?? results.final_recommendation,
  )

  return {
    score: normalizeScore(results.score ?? results.match_score),
    summary: String(results.summary ?? '').trim(),
    matchedSkills: normalizeList(results.matchedSkills ?? results.matched_skills),
    missingSkills: normalizeList(results.missingSkills ?? results.missing_skills),
    improvements: normalizeList(
      results.improvements ?? results.resume_improvements,
    ),
    interviewQuestions: normalizeList(
      results.interviewQuestions ?? results.interview_questions,
    ),
    recommendations: recommendationItems,
    error: String(results.error ?? '').trim(),
  }
}

const EmptyState = ({ label }: { label: string }) => (
  <p className="text-sm text-slate-500">{label}</p>
)

export function Step4Results({ results, onReset }: Step4ResultsProps) {
  const normalized = getNormalizedResults(results)
  const getScoreColor = (score: number) => {
    if (score >= 80)
      return 'text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]'
    if (score >= 60)
      return 'text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]'
    return 'text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]'
  }
  const getScoreRing = (score: number) => {
    if (score >= 80) return 'stroke-emerald-500'
    if (score >= 60) return 'stroke-amber-500'
    return 'stroke-rose-500'
  }
  if (normalized.error) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="w-full max-w-2xl mx-auto bg-slate-900 border border-rose-500/30 rounded-2xl p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-3">
          Analysis could not be completed
        </h2>
        <p className="text-slate-300 mb-8">{normalized.error}</p>
        <button
          onClick={onReset}
          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors inline-flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="w-full max-w-5xl mx-auto space-y-8 pb-12"
    >
      {/* Header & Score Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-violet-500 to-fuchsia-500"></div>
          <h3 className="text-slate-400 font-medium mb-6">Match Score</h3>

          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                className="stroke-slate-800"
                strokeWidth="8"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                className={`${getScoreRing(normalized.score)}`}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="283"
                initial={{
                  strokeDashoffset: 283,
                }}
                animate={{
                  strokeDashoffset: 283 - (283 * normalized.score) / 100,
                }}
                transition={{
                  duration: 1.5,
                  ease: 'easeOut',
                  delay: 0.2,
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span
                className={`text-5xl font-bold ${getScoreColor(normalized.score)}`}
              >
                {normalized.score}
              </span>
              <span className="text-slate-500 text-sm mt-1">/ 100</span>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-white mb-4">
            Executive Summary
          </h3>
          <p className="text-slate-300 leading-relaxed text-lg">
            {normalized.summary ||
              'The model did not return a written summary for this analysis.'}
          </p>
        </div>
      </div>

      {/* Skills Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Matched Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {normalized.matchedSkills.length > 0 ? (
              normalized.matchedSkills.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))
            ) : (
              <EmptyState label="No matched skills were returned." />
            )}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-rose-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Missing Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {normalized.missingSkills.length > 0 ? (
              normalized.missingSkills.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))
            ) : (
              <EmptyState label="No missing skills were returned." />
            )}
          </div>
        </div>
      </div>

      {/* Actionable Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Resume Improvements
            </h3>
          </div>
          <ul className="space-y-4">
            {normalized.improvements.length > 0 ? (
              normalized.improvements.map((item: string, i: number) => (
                <li key={i} className="flex gap-3 text-slate-300">
                  <ArrowRight className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <EmptyState label="No resume improvements were returned." />
            )}
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Likely Interview Questions
            </h3>
          </div>
          <ul className="space-y-4">
            {normalized.interviewQuestions.length > 0 ? (
              normalized.interviewQuestions.map((item: string, i: number) => (
                <li key={i} className="flex gap-3 text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    {i + 1}
                  </div>
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <EmptyState label="No interview questions were returned." />
            )}
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-linear-to-br from-violet-900/40 to-slate-900 border border-violet-500/30 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
            <ClipboardCheck className="w-6 h-6 text-violet-300" />
          </div>
          <h3 className="text-xl font-semibold text-white">
            Final Recommendation
          </h3>
        </div>
        {normalized.recommendations.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {normalized.recommendations.map((item: string, i: number) => (
              <li
                key={i}
                className="bg-slate-950/50 rounded-xl p-5 border border-slate-800/50 text-slate-300"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState label="No final recommendation was returned." />
        )}
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Analyze Another Role
        </button>
      </div>
    </motion.div>
  )
}
