import { MessageSquare, Wand2 } from 'lucide-react'

const PromptInput = ({ prompt, setPrompt }) => {
  return (
    <div className="mb-8">
      <label className="block text-sm font-bold text-gray-200 mb-4 flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-cyan-400" />
        Describe What You Want to Fill
      </label>
      
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: Fill this job application form for a Senior Software Engineer position with 5 years of React experience, located in San Francisco..."
          className="w-full px-6 py-4 bg-gray-800/50 border-3 border-gray-600 rounded-2xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 outline-none transition-all resize-none text-gray-100 placeholder-gray-500 shadow-sm hover:border-cyan-600"
          rows="5"
        />
        
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-cyan-400" />
          <span className="text-xs text-gray-400 font-medium">
            {prompt.length} characters
          </span>
        </div>
      </div>
      
      <div className="mt-3 flex items-start gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-4 border border-cyan-500/20">
        <div className="text-cyan-400 text-xl">💡</div>
        <div>
          <p className="text-sm text-gray-300 font-medium">Pro Tip:</p>
          <p className="text-xs text-gray-400 mt-1">
            Be specific about details like job title, experience, location, and skills for best results
          </p>
        </div>
      </div>
    </div>
  )
}

export default PromptInput