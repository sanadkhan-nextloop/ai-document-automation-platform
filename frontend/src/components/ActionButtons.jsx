import { Sparkles, Download, Zap, RotateCcw } from 'lucide-react'

const ActionButtons = ({ 
  file, 
  prompt, 
  isGenerating, 
  generatedPdf, 
  handleGenerate, 
  handleDownload,
  handleReset
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {generatedPdf ? (
        <>
          <button
            onClick={handleDownload}
            className="flex-1 sm:flex-none relative overflow-hidden group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-2xl font-bold transition-all duration-300 shadow-xl shadow-green-500/20 hover:shadow-2xl hover:shadow-green-500/30 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative flex items-center justify-center gap-3 px-8 py-5">
              <Download className="w-6 h-6" strokeWidth={2.5} />
              <span className="text-lg">Download PDF</span>
            </div>
          </button>
          <button
            onClick={handleReset}
            className="flex-1 sm:flex-none relative overflow-hidden group rounded-2xl px-8 py-5 font-semibold border border-cyan-500/40 text-cyan-300 bg-gradient-to-r from-gray-800/60 to-gray-900/60 hover:from-cyan-900/30 hover:to-blue-900/30 transition-all duration-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30 transform hover:-translate-y-0.5"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
              bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl" />

            <div className="relative flex items-center justify-center gap-3">
              <RotateCcw
                className="w-6 h-6 group-hover:-rotate-180 transition-transform duration-500"
                strokeWidth={2.5}
              />
              <span className="text-lg">Generate another PDF</span>
            </div>
          </button>
        </> 
      ): (
        <button
          onClick={handleGenerate}
          disabled={!file || !prompt.trim() || isGenerating}
          className={`flex-1 relative overflow-hidden group ${
            !file || !prompt.trim() || isGenerating
              ? 'bg-gray-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 hover:from-cyan-700 hover:via-blue-700 hover:to-cyan-700 shadow-xl shadow-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-1'
          } text-white rounded-2xl transition-all duration-300`}
        >
          {!(!file || !prompt.trim() || isGenerating) && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          )}
          
          <div className="relative flex items-center justify-center gap-3 px-8 py-5">
            {isGenerating ? (
              <>
                <div className="relative">
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <Zap className="absolute inset-0 m-auto w-3 h-3 text-white" />
                </div>
                <span className="font-bold text-lg">Generating Magic...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" strokeWidth={2.5} />
                <span className="font-bold text-lg">Generate with AI</span>
                <Sparkles className="w-6 h-6" strokeWidth={2.5} />
              </>
            )}
          </div>
        </button>
      )}  
    </div>
  )
}

export default ActionButtons