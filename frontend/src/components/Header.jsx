import { Bot, Sparkles } from 'lucide-react'

const Header = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 blur-xl opacity-70 animate-pulse"></div>
          <Bot className="relative w-14 h-14 text-cyan-400" strokeWidth={2} />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
          SmartFill AI
        </h1>
      </div>
      <p className="text-gray-300 text-lg max-w-2xl mx-auto flex items-center justify-center gap-2">
        <Sparkles className="w-5 h-5 text-cyan-400" />
        Transform your PDFs with intelligent AI-powered form filling
        <Sparkles className="w-5 h-5 text-cyan-400" />
      </p>
      <div className="mt-6 flex items-center justify-center gap-4 text-sm flex-wrap">
        <div className="flex items-center gap-2 bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-gray-300 font-medium">AI Online</span>
        </div>
        <div className="flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
          <span className="text-gray-300 font-medium">⚡ Lightning Fast</span>
        </div>
      </div>
    </div>
  )
}

export default Header