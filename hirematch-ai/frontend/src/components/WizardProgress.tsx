import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
interface WizardProgressProps {
  currentStep: number
}
const steps = [
  {
    num: 1,
    label: 'Upload Resume',
  },
  {
    num: 2,
    label: 'Job Description',
  },
  {
    num: 3,
    label: 'Analyzing',
  },
  {
    num: 4,
    label: 'Results',
  },
]
export function WizardProgress({ currentStep }: WizardProgressProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-800 rounded-full -z-10"></div>
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-violet-600 rounded-full -z-10"
          initial={{
            width: '0%',
          }}
          animate={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
        />

        {steps.map((step) => {
          const isCompleted = currentStep > step.num
          const isCurrent = currentStep === step.num
          return (
            <div key={step.num} className="flex flex-col items-center gap-2">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${isCompleted ? 'bg-violet-600 border-violet-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]' : isCurrent ? 'bg-slate-900 border-violet-500 text-violet-400 shadow-[0_0_10px_rgba(124,58,237,0.3)]' : 'bg-slate-900 border-slate-700 text-slate-500'}`}
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                }}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step.num}
              </motion.div>
              <span
                className={`text-xs font-medium ${isCurrent ? 'text-violet-400' : isCompleted ? 'text-slate-300' : 'text-slate-600'}`}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
