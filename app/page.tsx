'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect } from 'react'
import { Rocket, Sparkles, Users, DollarSign, TrendingUp, Zap, ArrowRight, Star, Flame, Crown } from 'lucide-react'
import { useMemeStore } from '../src/stores/memeStore'

export default function HomePage() {
  const { fetchCoins } = useMemeStore()

  useEffect(() => {
    fetchCoins()
  }, [fetchCoins])

  const stats = [
    { label: 'Coins Launched', value: '2,420', icon: Rocket, color: 'text-primary' },
    { label: 'Total Holders', value: '69.4K', icon: Users, color: 'text-accent' },
    { label: 'Market Cap', value: '$1.2M', icon: DollarSign, color: 'text-success' },
    { label: 'Viral Score', value: '9000+', icon: Zap, color: 'text-yellow-400' },
  ]

  const features = [
    {
      icon: Sparkles,
      title: 'Meme Templates',
      description: 'Viral templates ready to use',
      color: 'from-primary to-orange-400'
    },
    {
      icon: Zap,
      title: 'Instant Launch',
      description: 'Deploy in under 60 seconds',
      color: 'from-secondary to-purple-400'
    },
    {
      icon: Users,
      title: 'Social Boost',
      description: 'Built-in viral mechanics',
      color: 'from-accent to-blue-400'
    },
    {
      icon: Crown,
      title: 'Stellar Power',
      description: 'Fast & eco-friendly',
      color: 'from-success to-green-400'
    }
  ]

  return (
    <div className="relative overflow-hidden min-h-screen bg-black flex flex-col">
      {/* Hero Section - Full Screen */}
      <section className="flex-1 flex items-center justify-center px-4 py-20 bg-black relative min-h-screen">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-gray-900/50"></div>
        
        <div className="container mx-auto text-center relative z-10">
          {/* Floating Emojis - Reduced */}
          <div className="absolute inset-0 pointer-events-none">
            {['🚀', '💎', '🔥', '⚡'].map((emoji, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl opacity-20"
                initial={{ y: 100, opacity: 0 }}
                animate={{ 
                  y: [100, -20, -40, -20, 100],
                  opacity: [0, 0.3, 0.5, 0.3, 0],
                  x: Math.sin(i) * 50
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${20 + (i * 20)}%`,
                  top: `${30 + Math.sin(i) * 20}%`
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              <div className="inline-flex items-center bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/40 rounded-full px-6 py-3 mb-6 backdrop-blur-sm">
                <Star className="h-5 w-5 text-yellow-400 mr-2 animate-pulse" />
                <span className="text-white font-bold text-lg">Launch Your Viral Meme Coin Today!</span>
                <Star className="h-5 w-5 text-yellow-400 ml-2 animate-pulse" />
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Create Viral
              </span>
              <br />
              <span className="text-white font-meme">
                MEME COINS! 🚀
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Launch your meme coin on <span className="text-accent font-bold">Stellar blockchain</span> in seconds. 
              No coding required! 💎🙌
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <Link href="/create">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 107, 53, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold text-lg rounded-2xl px-8 py-4 shadow-2xl transition-all flex items-center space-x-2 border-2 border-primary/30"
                >
                  <Rocket className="h-6 w-6" />
                  <span>Launch Your Coin</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>

              <Link href="/explore">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black/50 border-2 border-accent/60 hover:border-accent hover:bg-accent/10 text-white rounded-2xl px-8 py-4 font-bold text-lg transition-all backdrop-blur-sm"
                >
                  Explore Coins
                </motion.button>
              </Link>
            </motion.div>

            {/* Features Grid - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="group"
                >
                  <div className="bg-black/80 border-2 border-white/20 rounded-xl p-6 hover:border-primary/40 transition-all duration-300 text-center">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} p-3 mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats - More Visible */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="bg-black border-2 border-white/30 hover:border-primary/60 rounded-xl p-4 text-center transition-all duration-300 hover:bg-black/90"
                >
                  <div className="flex justify-center mb-3">
                    <div className={`p-3 rounded-full border-2 ${
                      stat.color === 'text-primary' ? 'border-primary/40 bg-primary/10' :
                      stat.color === 'text-accent' ? 'border-accent/40 bg-accent/10' :
                      stat.color === 'text-success' ? 'border-success/40 bg-success/10' :
                      'border-yellow-400/40 bg-yellow-400/10'
                    }`}>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-400 mb-4">
                Join <span className="text-primary font-bold">2.4K+</span> creators already making bank! 
              </p>
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-sm text-gray-400">Trusted by memers worldwide</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

