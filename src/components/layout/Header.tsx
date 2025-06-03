'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Rocket, Menu, X, Wallet, Search, TrendingUp } from 'lucide-react'
import { useWalletStore } from '../../stores/walletStore'
import { ConnectWallet } from '../shared/ConnectWallet'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { connection } = useWalletStore()

  const navItems = [
    { href: '/', label: 'Home', icon: Rocket },
    { href: '/explore', label: 'Explore', icon: Search },
    { href: '/create', label: 'Create', icon: TrendingUp },
  ]

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-white/10">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ 
                rotate: [0, -10, 10, -5, 5, 0],
                scale: 1.1
              }}
              animate={{
                y: [0, -2, 0],
              }}
              transition={{ 
                hover: { duration: 0.6, ease: "easeInOut" },
                animate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-full blur-lg opacity-50 group-hover:opacity-80 transition-opacity animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-primary to-accent p-2 rounded-full shadow-2xl group-hover:shadow-primary/50 transition-all">
                <Rocket className="h-6 w-6 text-white transform group-hover:scale-110 transition-transform" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full opacity-0 group-hover:opacity-100"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MemeLauncher
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group"
              >
                <item.icon className="h-4 w-4 group-hover:text-primary transition-colors" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Wallet & Menu */}
          <div className="flex items-center space-x-4">
            <div className="relative z-10">
              <ConnectWallet />
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 py-4"
          >
            <nav className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              {/* Mobile Wallet Connection */}
              <div className="pt-4 border-t border-white/10">
                <ConnectWallet />
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
} 