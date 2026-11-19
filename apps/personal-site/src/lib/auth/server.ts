import "server-only";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { canAccessPath, getRoleHomePath } from "./access";

export async function requirePathAccess(pathname: string): Promise<void> {
  const session = await auth();
  const role = session?.user.role;

  if (!role) {
    redirect(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
  }

  if (!canAccessPath(role, pathname)) {
    redirect(getRoleHomePath(role));
  }
}
