'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Rocket, Github, Twitter, MessageCircle, Heart } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: MessageCircle, href: '#', label: 'Discord' },
  ]

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Create Coin', href: '/create' },
        { label: 'Explore', href: '/explore' },
        { label: 'Templates', href: '/templates' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'API', href: '#' },
        { label: 'Support', href: '#' },
      ]
    },
    {
      title: 'Community',
      links: [
        { label: 'Discord', href: '#' },
        { label: 'Twitter', href: '#' },
        { label: 'Blog', href: '#' },
      ]
    }
  ]

  return (
    <footer className="bg-black border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Rocket className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MemeLauncher
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              The ultimate platform to create and launch viral meme coins on the Stellar blockchain. 
              Make your memes moon! 🚀
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 bg-gradient-card border border-white/10 rounded-lg hover:border-primary/40 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} MemeLauncher. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>for the meme community</span>
          </div>
        </div>

        {/* Stellar Badge */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-2 bg-gradient-card border border-white/10 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">Powered by Stellar & Soroban</span>
          </div>
        </div>
      </div>
    </footer>
  )
} 