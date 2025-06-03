import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#7209B7',
        accent: '#00D9FF',
        success: '#32D74B',
        background: {
          from: '#1a1a2e',
          to: '#16213e'
        }
      },
      fontFamily: {
        'comic': ['Comic Sans MS', 'cursive'],
        'meme': ['Impact', 'Arial Black', 'sans-serif']
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-fast': 'pulse 1s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite'
      },
      keyframes: {
        glow: {
          '0%': { 
            boxShadow: '0 0 5px #FF6B35, 0 0 10px #FF6B35, 0 0 15px #FF6B35'
          },
          '100%': { 
            boxShadow: '0 0 10px #FF6B35, 0 0 20px #FF6B35, 0 0 30px #FF6B35'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      backgroundImage: {
        'gradient-meme': 'linear-gradient(135deg, #000000 0%, #111111 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(255,107,53,0.1) 0%, rgba(114,9,183,0.1) 100%)',
        'gradient-button': 'linear-gradient(135deg, #FF6B35 0%, #7209B7 100%)'
      }
    },
  },
  plugins: [],
};
export default config; 