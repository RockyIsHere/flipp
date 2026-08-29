"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-context";

type AuthGuardProps = {
  children: ReactNode;
  requiredRole?: "customer" | "admin";
};

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(requiredRole === "admin" ? "/admin" : "/");
      return;
    }
    if (requiredRole && profile && profile.role !== requiredRole) {
      router.replace(requiredRole === "admin" ? "/admin" : "/");
    }
  }, [user, profile, loading, requiredRole, router]);

  if (loading) {
    return (
      <div className="screen" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="text-muted" style={{ fontSize: 14 }}>Loading...</div>
      </div>
    );
  }

  if (!user) return null;
  if (requiredRole && profile && profile.role !== requiredRole) return null;

  return <>{children}</>;
}
