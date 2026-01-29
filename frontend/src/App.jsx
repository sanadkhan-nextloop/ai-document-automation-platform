import { useState } from 'react'
import Header from './components/Header'
import FileUpload from './components/FileUpload'
import PromptInput from './components/PromptInput'
import AlertMessage from './components/AlertMessage'
import ActionButtons from './components/ActionButtons'
import Features from './components/Features'
// Access the API URL from .env.local
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [file, setFile] = useState(null)
  const [originalFileName, setOriginalFileName] = useState('')
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPdf, setGeneratedPdf] = useState(null)
  const [jobId, setJobId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [dragActive, setDragActive] = useState(false)

  const handleGenerate = async () => {
    if (!file || !prompt.trim()) {
      setError('Please upload a PDF and enter a prompt')
      return
    }

    setIsGenerating(true)
    setError('')
    setSuccess('')
    setJobId(null)
    
    try {
      // Step 1: Upload the PDF
      const formData = new FormData()
      formData.append('file', file)

      const uploadResponse = await fetch(API_URL+'/upload', {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload PDF')
      }

      const uploadData = await uploadResponse.json()
      const currentJobId = uploadData.jobId

      if (!currentJobId) {
        throw new Error('No jobId received from server')
      }

      setJobId(currentJobId)

      // Step 2: Generate the filled PDF
      const generateResponse = await fetch(API_URL+'/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: currentJobId,
          prompt: prompt.trim(),
        }),
      })

      if (!generateResponse.ok) {
        throw new Error('Failed to generate PDF')
      }

      const generateData = await generateResponse.json()

      if (generateData.status !== 'done') {
        throw new Error('PDF generation was not completed')
      }

      // Step 3: Set download URL
      const downloadUrl = API_URL+`/download/${currentJobId}`
      setGeneratedPdf(downloadUrl)
      setSuccess('🎉 PDF generated successfully! Click download to save your file.')
      // store filename
      setOriginalFileName(file.name)

      // Clear inputs
      setFile(null)
      setPrompt('')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setJobId(null)
      setGeneratedPdf(null)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = async () => {
    if (!generatedPdf || !jobId) return

    try {
      const response = await fetch(generatedPdf)
      
      if (!response.ok) {
        throw new Error('Failed to download PDF')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `smartfill_${originalFileName}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      setError('Failed to download PDF. Please try again.')
    }
  }

  const handleReset = () => {
    setFile(null)
    setPrompt('')
    setGeneratedPdf(null)
    setJobId(null)
    setError('')
    setSuccess('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-5xl mx-auto relative">
        <Header />

        {/* Main Card */}
        <div className="bg-gray-800/40 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-black/50 p-8 md:p-12 border-2 border-gray-700/50 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <FileUpload 
              file={file}
              setFile={setFile}
              setError={setError}
              dragActive={dragActive}
              setDragActive={setDragActive}
            />

            <PromptInput 
              prompt={prompt}
              setPrompt={setPrompt}
            />

            <AlertMessage type="error" message={error} />
            <AlertMessage type="success" message={success} />

            <ActionButtons 
              file={file}
              prompt={prompt}
              isGenerating={isGenerating}
              generatedPdf={generatedPdf}
              handleGenerate={handleGenerate}
              handleDownload={handleDownload}
              handleReset={handleReset}
            />
          </div>
        </div>

        <Features />

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            Powered by Advanced AI Technology 🚀
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default App