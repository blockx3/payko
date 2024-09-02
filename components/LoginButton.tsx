"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { LogInIcon } from "lucide-react";

function LoginButton() {
  return (
    <Button
      onClick={() => {
        signIn(undefined, { callbackUrl: "/user/wallet" });
      }}
      className="text-lg"
    >
      Login <LogInIcon />
    </Button>
  );
}

export default LoginButton;
