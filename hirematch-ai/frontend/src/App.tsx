import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { WizardProgress } from './components/WizardProgress.js'
import { Step1Resume } from './components/Step1Resume'
import { Step2JobDesc } from './components/Step2JobDesc'
import { Step3Analyzing } from './components/Step3Analyzing'
import { Step4Results } from './components/Step4Results'
import type { AnalysisResult } from './components/Step4Results'
import { useScreenInit } from './useScreenInit'
export function App() {
  const screenInit = useScreenInit()
  const [step, setStep] = useState(screenInit.step ?? 1)
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState('')
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  )
  const [selectedModel] = useState('granite')
  const handleReset = () => {
    setStep(1)
    setFile(null)
    setJobDescription('')
  }
  const analyzeResume = async () => {
  if (!file || !jobDescription) return

  setStep(3)

  const formData = new FormData()
  formData.append('resume', file)
  formData.append('job_description', jobDescription)
  formData.append('model', selectedModel)

  try {
    const response = await fetch('http://127.0.0.1:5000/analyze', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    setAnalysisResult(data)
    setStep(4)
  } catch (error) {
    console.error('Analysis failed:', error)
  }
}
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleReset}
          >
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)]">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              HireAI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              History
            </button>
            <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Settings
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        {step !== 4 && <WizardProgress currentStep={step} />}

        <div className="mt-8">
          {step === 1 && (
            <Step1Resume
              file={file}
              setFile={setFile}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <Step2JobDesc
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              onNext={analyzeResume}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && <Step3Analyzing />}
          {step === 4 && (
            analysisResult && (
              <Step4Results results={analysisResult} onReset={handleReset} />
            )
          )}
        </div>
      </main>
    </div>
  )
}
