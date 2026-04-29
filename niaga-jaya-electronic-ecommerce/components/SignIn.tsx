// components/SignIn.tsx
"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const SignIn = () => {
  return (
    <div className="flex items-center">
      {/* Tampil jika user belum login */}
      <SignedOut>
        <SignInButton mode="modal">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Login
          </button>
        </SignInButton>
      </SignedOut>

      {/* Tampil jika user sudah login (Foto Profil) */}
      <SignedIn>
        <UserButton 
          afterSignOutUrl="/" 
          appearance={{
            elements: {
              avatarBox: "h-9 w-9" // Biar ukurannya pas dengan icon lainnya
            }
          }}
        />
      </SignedIn>
    </div>
  );
};

export default SignIn;