import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, FileSearch, BrainCircuit, Target } from 'lucide-react'
const loadingSteps = [
  {
    icon: FileSearch,
    text: 'Extracting resume data...',
  },
  {
    icon: Target,
    text: 'Parsing job requirements...',
  },
  {
    icon: BrainCircuit,
    text: 'Running AI match analysis...',
  },
  {
    icon: Sparkles,
    text: 'Generating actionable insights...',
  },
]
export function Step3Analyzing() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  useEffect(() => {
  const stepDuration = 1500

  const interval = setInterval(() => {
    setCurrentStepIndex((prev) => {
      if (prev < loadingSteps.length - 1) {
        return prev + 1
      }

      return prev
    })
  }, stepDuration)

  return () => clearInterval(interval)
}, [])
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="w-full max-w-md mx-auto flex flex-col items-center justify-center py-12"
    >
      <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
        {/* Outer glowing ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-violet-500/30 border-t-violet-500"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        {/* Inner glowing ring */}
        <motion.div
          className="absolute inset-4 rounded-full border-4 border-emerald-500/30 border-b-emerald-500"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        {/* Center Icon */}
        <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.4)]">
          <Sparkles className="w-8 h-8 text-violet-400" />
        </div>
      </div>

      <div className="space-y-6 w-full">
        {loadingSteps.map((step, index) => {
          const Icon = step.icon
          const isActive = index === currentStepIndex
          const isPast = index < currentStepIndex
          return (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: isPast ? 0.5 : isActive ? 1 : 0.2,
                x: 0,
                scale: isActive ? 1.05 : 1,
              }}
              className="flex items-center gap-4"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${isPast ? 'bg-emerald-500/20 text-emerald-400' : isActive ? 'bg-violet-500/20 text-violet-400 shadow-[0_0_15px_rgba(124,58,237,0.3)]' : 'bg-slate-800 text-slate-600'}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`font-medium transition-colors duration-500 ${isActive ? 'text-white' : 'text-slate-400'}`}
              >
                {step.text}
              </span>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
