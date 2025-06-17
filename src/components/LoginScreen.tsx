import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (password: string,username:string) => void;
  error?: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, error }) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    console.log(password,username);
    e.preventDefault();
    onLogin(password,username);
  };

  return (
    <div className="min-h-screen bg-deep-teal flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-kiwi-green/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-intelligence-blue/10 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-kiwi-green/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-intelligence-blue/8 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Moving dots pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%2336B37E%22 fill-opacity=%220.05%22%3E%3Cpath d=%22m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 animate-pulse"></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-gradient-to-r from-kiwi-green/5 to-intelligence-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-l from-intelligence-blue/8 to-kiwi-green/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-montserrat font-bold text-deep-teal mb-3 leading-tight">
              Content<span className="text-kiwi-green">Q</span>
            </h1>
            <p className="text-sm font-nunito text-charcoal-grey mb-6">powered by KiwiQ AI</p>
            
            <h2 className="text-2xl font-montserrat font-semibold text-deep-teal mb-2 leading-tight">Welcome</h2>
            <p className="text-charcoal-grey font-nunito leading-normal">Access your strategic content and insights</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
           
           <div>
            <label htmlFor="username" className="block text-sm font-nunito font-medium text-charcoal-grey mb-3">
              LinkedIn Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full h-14 px-4 border border-soft-sage rounded-xl bg-white text-charcoal-grey placeholder-charcoal-grey/60 focus:ring-2 focus:ring-kiwi-green focus:border-transparent transition-all duration-200 text-base font-nunito"
              required
            />
          </div>


            <div>
              <label htmlFor="password" className="block text-sm font-nunito font-medium text-charcoal-grey mb-3">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full h-14 px-4 pr-12 border border-soft-sage rounded-xl bg-white text-charcoal-grey placeholder-charcoal-grey/60 focus:ring-2 focus:ring-kiwi-green focus:border-transparent transition-all duration-200 text-base font-nunito"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-charcoal-grey/60 hover:text-charcoal-grey transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-charcoal-grey/60 hover:text-charcoal-grey transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-700 text-sm font-nunito">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-kiwi-green hover:bg-kiwi-green/90 text-white font-nunito font-semibold py-4 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-kiwi-green focus:ring-offset-2 focus:ring-offset-transparent shadow-lg text-base"
            >
              View Documents
            </button>
          </form>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-kiwi-green rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm">⚡</span>
              </div>
              <h3 className="text-white font-montserrat font-semibold">AI-Powered</h3>
            </div>
            <p className="text-white/80 text-sm font-nunito leading-normal">Leveraging AI for efficient sales processes</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-intelligence-blue rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm">🎯</span>
              </div>
              <h3 className="text-white font-montserrat font-semibold">GTM Focus</h3>
            </div>
            <p className="text-white/80 text-sm font-nunito leading-normal">Strategic go-to-market insights</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-kiwi-seed-brown rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm">⚙️</span>
              </div>
              <h3 className="text-white font-montserrat font-semibold">Tech Stack</h3>
            </div>
            <p className="text-white/80 text-sm font-nunito leading-normal">Modern sales technology solutions</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-kiwi-green rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm">📈</span>
              </div>
              <h3 className="text-white font-montserrat font-semibold">Scale Fast</h3>
            </div>
            <p className="text-white/80 text-sm font-nunito leading-normal">Proven systems for rapid growth</p>
          </div>
        </div>
      </div>
    </div>
  );
};