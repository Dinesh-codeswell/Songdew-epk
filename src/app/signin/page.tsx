"use client";

import { AuthLayout, SongdewButton, SongdewInput } from "@/components/auth/AuthLayout";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function SignInPage() {
  return (
    <AuthLayout title="Sign In" subtitle="Log in to manage your artist profile.">
      <div className="space-y-6">
        {/* Social Logins */}
        <div className="grid grid-cols-1 gap-3">
          <SongdewButton variant="social">
            <svg className="w-5 h-5 text-[#ffc107]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-3.27 3.28-8.11 3.28-11.41z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.16H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.84l3.66-2.75z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.16l3.66 2.75c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </SongdewButton>
          <SongdewButton variant="social">
            <svg className="w-5 h-5 text-[#4267b2]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.8.714-1.8 1.766v2.31h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
            </svg>
            Sign in with Facebook
          </SongdewButton>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-black/5"></div>
          </div>
          <div className="relative flex justify-center text-[12px] uppercase tracking-widest font-bold">
            <span className="bg-white px-2 text-songdew-gray">Or continue with</span>
          </div>
        </div>

        {/* Email Login */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <SongdewInput label="Email Address" type="email" placeholder="name@example.com" />
          <SongdewInput label="Password" type="password" placeholder="••••••••" />
          
          <div className="pt-2">
            <SongdewButton variant="primary">
              <Mail className="w-4 h-4" />
              Sign in with Email
            </SongdewButton>
          </div>
        </form>

        <p className="text-center text-[14px] text-songdew-gray font-body">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-songdew-blue hover:underline font-bold">Create Account</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
