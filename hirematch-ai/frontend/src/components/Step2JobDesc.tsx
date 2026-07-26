import { ChevronRight, ChevronLeft, Briefcase } from 'lucide-react'
import { motion } from 'framer-motion'
interface Step2JobDescProps {
  jobDescription: string
  setJobDescription: (desc: string) => void
  onNext: () => void
  onBack: () => void
}
export function Step2JobDesc({
  jobDescription,
  setJobDescription,
  onNext,
  onBack,
}: Step2JobDescProps) {
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
      exit={{
        opacity: 0,
        y: -20,
      }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">
          Paste Job Description
        </h2>
        <p className="text-slate-400">
          Copy and paste the full job description you are applying for.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="mb-6 relative">
          <div className="absolute top-4 left-4 text-slate-500">
            <Briefcase className="w-5 h-5" />
          </div>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            className="w-full h-80 bg-slate-950 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 outline-none resize-none transition-all"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={onNext}
            disabled={jobDescription.trim().length < 50}
            className="px-8 py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:hover:bg-violet-600 text-white rounded-xl font-semibold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] disabled:shadow-none"
          >
            Analyze Match
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
