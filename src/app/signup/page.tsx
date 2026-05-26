"use client";

import { AuthLayout, SongdewButton, SongdewInput } from "@/components/auth/AuthLayout";
import Link from "next/link";
import { UserPlus } from "lucide-react";

export default function SignUpPage() {
  return (
    <AuthLayout title="Create Account" subtitle="Join the premium community for music artists.">
      <div className="space-y-6">
        {/* Social Signups */}
        <div className="grid grid-cols-1 gap-3">
          <SongdewButton variant="social">
            <svg className="w-5 h-5 text-[#ffc107]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-3.27 3.28-8.11 3.28-11.41z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.16H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.84l3.66-2.75z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.16l3.66 2.75c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign up with Google
          </SongdewButton>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-black/5"></div>
          </div>
          <div className="relative flex justify-center text-[12px] uppercase tracking-widest font-bold">
            <span className="bg-white px-2 text-songdew-gray">Or register with email</span>
          </div>
        </div>

        {/* Email Signup */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <SongdewInput label="First Name" placeholder="Arjun" />
            <SongdewInput label="Last Name" placeholder="Kanungo" />
          </div>
          <SongdewInput label="Email Address" type="email" placeholder="name@example.com" />
          <SongdewInput label="Create Password" type="password" placeholder="••••••••" />
          
          <div className="pt-2">
            <SongdewButton variant="primary">
              <UserPlus className="w-4 h-4" />
              Build My Profile
            </SongdewButton>
          </div>
        </form>

        <p className="text-center text-[14px] text-songdew-gray font-body">
          Already have an account?{" "}
          <Link href="/signin" className="text-songdew-blue hover:underline font-bold">Sign In</Link>
        </p>

        <div className="text-[11px] text-center text-songdew-gray leading-relaxed px-4">
          By creating an account, you agree to our <Link href="#" className="underline">Terms of Service</Link> and have read our <Link href="#" className="underline">Privacy Policy</Link>.
        </div>
      </div>
    </AuthLayout>
  );
}
