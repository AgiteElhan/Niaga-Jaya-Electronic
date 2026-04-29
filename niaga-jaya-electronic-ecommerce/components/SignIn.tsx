"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

const SignIn = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="flex items-center">
      {!isSignedIn ? (
        <SignInButton mode="modal">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Login
          </button>
        </SignInButton>
      ) : (
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-9 w-9",
            },
          }}
        />
      )}
    </div>
  );
};

export default SignIn;
