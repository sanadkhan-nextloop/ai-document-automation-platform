import { Upload, FileText, X } from 'lucide-react'

const FileUpload = ({ file, setFile, setError, dragActive, setDragActive }) => {
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes

const handleDrop = (e) => {
  e.preventDefault()
  e.stopPropagation()
  setDragActive(false)
  
  const droppedFile = e.dataTransfer.files[0]
  if (!droppedFile) return

  if (droppedFile.type !== 'application/pdf') {
    setError('Please upload a valid PDF file')
    return
  }

  if (droppedFile.size > MAX_FILE_SIZE) {
    setError('File size exceeds 5 MB')
    return
  }

  setFile(droppedFile)
  setError('')
}

const handleFileInput = (e) => {
  const selectedFile = e.target.files[0]
  if (!selectedFile) return

  if (selectedFile.type !== 'application/pdf') {
    setError('Please upload a valid PDF file')
    return
  }

  if (selectedFile.size > MAX_FILE_SIZE) {
    setError('File size exceeds 5 MB')
    return
  }

  setFile(selectedFile)
  setError('')
}

  const removeFile = () => {
    setFile(null)
    setError('')
  }

  return (
    <div className="mb-8">
      <label className="block text-sm font-bold text-gray-200 mb-4 flex items-center gap-2">
        <Upload className="w-4 h-4 text-cyan-400" />
        Upload PDF Document
      </label>
      
      {!file ? (
        <div
          className={`relative border-3 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer overflow-hidden group ${
            dragActive 
              ? 'border-cyan-400 bg-cyan-500/10 scale-[1.02]' 
              : 'border-gray-600 hover:border-cyan-500 hover:bg-gradient-to-br hover:from-cyan-500/5 hover:to-blue-500/5'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl mb-6 shadow-lg shadow-cyan-500/20 transform group-hover:scale-110 transition-transform">
              <Upload className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
            
            <p className="text-gray-200 font-bold text-xl mb-2">
              Drop your PDF here
            </p>
            <p className="text-gray-400 mb-6">or click anywhere to browse</p>
            
            <input
              id="fileInput"
              type="file"
              accept=".pdf"
              onChange={handleFileInput}
              className="hidden"
            />
            
            <div className="flex items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-300 text-sm font-semibold px-5 py-2 rounded-full border border-cyan-500/30">
                <FileText className="w-4 h-4" />
                PDF Files Only
              </span>
              <span className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 text-sm font-semibold px-5 py-2 rounded-full border border-blue-500/30">
                📊 Max 5MB
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative border-3 border-cyan-500/50 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl p-6 shadow-lg shadow-cyan-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-4 rounded-2xl shadow-md shadow-cyan-500/20">
                <FileText className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-bold text-gray-100 text-lg">{file.name}</p>
                <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                  {(file.size / 1024).toFixed(2)} KB • Ready to process
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="text-gray-400 hover:text-red-400 transition-all p-3 hover:bg-red-500/10 rounded-xl transform hover:scale-110"
            >
              <X className="w-6 h-6" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUpload