// app/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Lock, Mail, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login authentication logic here
    console.log('Logging in with:', { email, password });
  };

  return (
    <main className="w-full min-h-[85vh] bg-background flex items-center justify-center px-4 md:py-32 py-24 font-body antialiased">
      <div className="w-full max-w-md bg-white border border-text/10 shadow-sm p-6 sm:p-8 rounded-none">
        {/* Header & Logo */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link href="/" className="mb-4">
            <Image
              src="/logo.png"
              width={120}
              height={120}
              alt="Atmosphere Daily"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <h1 className="text-sm sm:text-xl font-heading uppercase text-text font-bold tracking-wider">
            Account Login
          </h1>
          <p className="text-[10px] text-text/60 mt-1 uppercase tracking-wide">
            Access your Atmosphere Daily profile
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-[10px] font-heading uppercase tracking-wider text-text font-semibold"
            >
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-text/40 absolute left-3 pointer-events-none" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-9 pr-3 py-2.5 text-xs text-text bg-background/50 border border-text/20 focus:border-section-background focus:outline-none transition-colors rounded-none placeholder:text-text/40"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-[10px] font-heading uppercase tracking-wider text-text font-semibold"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[10px] text-section-background hover:text-button-hover font-bold uppercase tracking-wider transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-text/40 absolute left-3 pointer-events-none" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-9 pr-10 py-2.5 text-xs text-text bg-background/50 border border-text/20 focus:border-section-background focus:outline-none transition-colors rounded-none placeholder:text-text/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-text/40 hover:text-text transition-colors p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-button-background hover:bg-button-hover hover:text-text text-section-text font-heading text-[10px] font-bold uppercase tracking-widest py-3 transition-colors duration-200 rounded-none cursor-pointer"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="border-t border-text/10 my-6" />

        {/* Signup Redirect */}
        <div className="text-center">
          <p className="text-[10px] text-text/70">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="font-bold text-section-background hover:text-button-hover uppercase tracking-wider transition-colors ml-1"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}