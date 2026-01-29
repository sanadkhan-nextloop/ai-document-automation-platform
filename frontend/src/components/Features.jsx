import { Zap, Shield, Clock, Brain, Sparkles, TrendingUp } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-7 h-7 text-yellow-600" strokeWidth={2.5} />,
      title: 'Lightning Fast',
      description: 'AI processes your PDF in seconds, not minutes',
      gradient: 'from-yellow-500 to-orange-500',
      bg: 'bg-yellow-50'
    },
    {
      icon: <Brain className="w-7 h-7 text-purple-600" strokeWidth={2.5} />,
      title: 'Smart AI',
      description: 'Advanced language model understands context perfectly',
      gradient: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50'
    },
    {
      icon: <Shield className="w-7 h-7 text-green-600" strokeWidth={2.5} />,
      title: 'Secure & Private',
      description: 'Your documents are processed securely and privately',
      gradient: 'from-green-500 to-emerald-500',
      bg: 'bg-green-50'
    },
    {
      icon: <Clock className="w-7 h-7 text-blue-600" strokeWidth={2.5} />,
      title: 'Save Time',
      description: 'Automate hours of manual form filling work',
      gradient: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-50'
    },
    {
      icon: <Sparkles className="w-7 h-7 text-cyan-600" strokeWidth={2.5} />,
      title: 'Perfect Results',
      description: 'Get accurate, professional-quality filled forms',
      gradient: 'from-cyan-500 to-teal-500',
      bg: 'bg-cyan-50'
    },
    {
      icon: <TrendingUp className="w-7 h-7 text-indigo-600" strokeWidth={2.5} />,
      title: 'Always Improving',
      description: 'Continuously updated with latest AI capabilities',
      gradient: 'from-indigo-500 to-purple-500',
      bg: 'bg-indigo-50'
    }
  ]

  return (
    <div className="mt-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-100 mb-3">
          Why Choose SmartFill AI?
        </h2>
        <p className="text-gray-400">
          Powerful features that make PDF filling effortless
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-gray-700 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}></div>
            
            <div className="relative">
              <div className={`inline-flex items-center justify-center w-14 h-14 ${feature.bg} bg-opacity-20 rounded-xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all shadow-md border border-gray-600`}>
                {feature.icon}
              </div>
              
              <h3 className="font-bold text-gray-100 text-lg mb-2">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features