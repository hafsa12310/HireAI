import React, { useState, useRef } from 'react'
import { UploadCloud, FileText, X, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
interface Step1ResumeProps {
  file: File | null
  setFile: (file: File | null) => void
  onNext: () => void
}
export function Step1Resume({ file, setFile, onNext }: Step1ResumeProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = () => {
    setIsDragging(false)
  }
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0])
    }
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
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
      exit={{
        opacity: 0,
        y: -20,
      }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">
          Upload your Resume
        </h2>
        <p className="text-slate-400">
          We'll analyze your experience against the job requirements.
        </p>
      </div>

      {!file ? (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${isDragging ? 'border-violet-500 bg-violet-500/10' : 'border-slate-700 bg-slate-900/50 hover:bg-slate-800/50 hover:border-slate-600'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
          />
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <UploadCloud className="w-8 h-8 text-violet-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-200 mb-2">
            Click or drag file to this area to upload
          </h3>
          <p className="text-slate-500 text-sm mb-6">
            Support for a single PDF, DOCX, or TXT file. Max 5MB.
          </p>

          <button className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors border border-slate-700">
            Browse Files
          </button>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-8 p-4 bg-slate-950 rounded-xl border border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <p className="text-slate-200 font-medium truncate max-w-75">
                  {file.name}
                </p>
                <p className="text-slate-500 text-sm">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={() => setFile(null)}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-colors"
              title="Remove file"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onNext}
              className="px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-semibold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]"
            >
              Continue to Job Description
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}
