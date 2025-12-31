import React from 'react';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreditsModal: React.FC<CreditsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const credits = [
    {
      category: "AI & Intelligence",
      items: [
        {
          name: "Google Gemini AI",
          description: "Powering intelligent insights and narrative generation",
          url: "https://ai.google.dev/",
          logo: "🤖",
          color: "#4285F4"
        }
      ]
    },
    {
      category: "Data & APIs",
      items: [
        {
          name: "GitHub API",
          description: "Comprehensive developer data and repository insights",
          url: "https://docs.github.com/en/rest",
          logo: "🐙",
          color: "#39d353"
        }
      ]
    },
    {
      category: "Infrastructure & Deployment",
      items: [
        {
          name: "Netlify",
          description: "Serverless functions and seamless deployment platform",
          url: "https://netlify.com",
          logo: "🌐",
          color: "#00C7B7"
        }
      ]
    },
    {
      category: "Frontend Technologies",
      items: [
        {
          name: "React",
          description: "Modern UI framework for interactive experiences",
          url: "https://react.dev",
          logo: "⚛️",
          color: "#61DAFB"
        },
        {
          name: "Tailwind CSS",
          description: "Utility-first CSS framework for rapid styling",
          url: "https://tailwindcss.com",
          logo: "🎨",
          color: "#06B6D4"
        },
        {
          name: "Vite",
          description: "Lightning-fast build tool and development server",
          url: "https://vitejs.dev",
          logo: "⚡",
          color: "#646CFF"
        }
      ]
    },
    {
      category: "Development Tools",
      items: [
        {
          name: "TypeScript",
          description: "Type-safe JavaScript for robust development",
          url: "https://typescriptlang.org",
          logo: "📘",
          color: "#3178C6"
        },
        {
          name: "html-to-image",
          description: "High-quality image export functionality",
          url: "https://github.com/bubkoo/html-to-image",
          logo: "📸",
          color: "#FF6B6B"
        }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-[#0d1117] border border-[#30363d] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#0d1117] border-b border-[#30363d] p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-black text-white">Credits & Acknowledgments</h2>
            <p className="text-[#8b949e] text-sm mt-1">Gratitude to the technologies and services that make DevWrapped possible</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#8b949e] hover:text-white transition-colors p-2 hover:bg-[#21262d] rounded-lg"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {credits.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-lg font-display font-bold text-[#f0f6fc] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#39d353] rounded-full"></span>
                {category.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((item, itemIndex) => (
                  <a
                    key={itemIndex}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 bg-[#161b22] border border-[#30363d] rounded-xl hover:border-[#58a6ff]/50 hover:bg-[#0d1117] transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="text-2xl p-2 rounded-lg flex-shrink-0"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        {item.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-mono font-bold text-white group-hover:text-[#58a6ff] transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-[#8b949e] text-sm mt-1 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-[#58a6ff] opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Visit</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Special Thanks */}
          <div className="border-t border-[#30363d] pt-8">
            <h3 className="text-lg font-display font-bold text-[#f0f6fc] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#bc8cff] rounded-full"></span>
              Special Thanks
            </h3>
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
              <p className="text-[#8b949e] leading-relaxed">
                DevWrapped 2025 exists because of the incredible open-source ecosystem and the generous APIs provided by these organizations. 
                Each technology contributes to creating a seamless, intelligent, and beautiful experience for developers worldwide.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#39d353]/10 text-[#39d353] rounded-full text-xs font-mono">Open Source</span>
                <span className="px-3 py-1 bg-[#58a6ff]/10 text-[#58a6ff] rounded-full text-xs font-mono">Developer First</span>
                <span className="px-3 py-1 bg-[#bc8cff]/10 text-[#bc8cff] rounded-full text-xs font-mono">Community Driven</span>
              </div>
            </div>
          </div>

          {/* Support the Project */}
          <div className="border-t border-[#30363d] pt-8">
            <h3 className="text-lg font-display font-bold text-[#f0f6fc] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
              Support DevWrapped 2025
            </h3>
            <div className="bg-gradient-to-r from-pink-500/5 to-red-500/5 border border-pink-500/20 rounded-xl p-6">
              <p className="text-[#8b949e] leading-relaxed mb-4">
                DevWrapped 2025 is completely free and open source. If you find it valuable, consider supporting its development 
                to help cover infrastructure costs and enable new features.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://github.com/sponsors/Dev-Somesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-400 hover:to-red-400 text-white font-bold rounded-lg transition-all group"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m8 14.25.345.666a.75.75 0 0 1-.69 0l-.008-.004-.018-.01a7.152 7.152 0 0 1-.31-.17 22.055 22.055 0 0 1-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.066 22.066 0 0 1-3.744 2.584l-.018.01-.006.003h-.002ZM4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.58 20.58 0 0 0 8 13.393a20.58 20.58 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.749.749 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5Z"></path>
                  </svg>
                  <span>Sponsor on GitHub</span>
                </a>
                <a
                  href="https://github.com/Dev-Somesh/Dev-Wrapped"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] hover:text-white border border-[#30363d] hover:border-[#39d353] font-bold rounded-lg transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                  </svg>
                  <span>Star on GitHub</span>
                </a>
              </div>
              <div className="mt-4 text-xs text-[#8b949e]">
                <p>💰 Sponsors help cover: AI API costs, hosting, domain, and development tools</p>
                <p>🚀 All development is transparent and community-driven</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#30363d] p-6 text-center">
          <p className="text-[#484f58] text-xs font-mono">
            Built with ❤️ and gratitude • DevWrapped 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreditsModal;