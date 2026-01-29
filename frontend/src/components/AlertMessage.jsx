import { AlertCircle, CheckCircle } from 'lucide-react'

const AlertMessage = ({ type, message }) => {
  if (!message) return null

  const styles = {
    error: {
      bg: 'bg-gradient-to-r from-red-900/40 to-rose-900/40',
      border: 'border-red-500/50',
      icon: <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" strokeWidth={2.5} />,
      text: 'text-red-300',
      badge: 'bg-red-500'
    },
    success: {
      bg: 'bg-gradient-to-r from-green-900/40 to-emerald-900/40',
      border: 'border-green-500/50',
      icon: <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" strokeWidth={2.5} />,
      text: 'text-green-300',
      badge: 'bg-green-500'
    }
  }

  const style = styles[type]

  return (
    <div className={`mb-6 ${style.bg} border-2 ${style.border} rounded-2xl p-5 flex items-start gap-4 shadow-md animate-in fade-in slide-in-from-top-2 duration-300`}>
      <div className="relative">
        <div className={`absolute inset-0 ${style.badge} blur-md opacity-30`}></div>
        {style.icon}
      </div>
      <div className="flex-1">
        <p className={`${style.text} font-semibold text-base leading-relaxed`}>
          {message}
        </p>
      </div>
    </div>
  )
}

export default AlertMessage