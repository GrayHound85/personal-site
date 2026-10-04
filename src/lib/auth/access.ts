import type { AppRole } from "@/types/auth";

type AccessRule = {
  path: string;
  roles: readonly AppRole[] | "public";
  includeChildren?: boolean;
};

const ACCESS_RULES: readonly AccessRule[] = [
  { path: "/", roles: "public" },
  { path: "/login", roles: "public" },
  { path: "/projects", roles: "public", includeChildren: true },
  { path: "/media", roles: ["admin", "media"], includeChildren: true },
];

function matchesRule(rule: AccessRule, pathname: string): boolean {
  return (
    pathname === rule.path ||
    (rule.includeChildren === true &&
      rule.path !== "/" &&
      pathname.startsWith(`${rule.path}/`))
  );
}

export function canAccessPath(
  role: AppRole | undefined,
  pathname: string,
): boolean {
  const matchingRule = ACCESS_RULES.filter((rule) =>
    matchesRule(rule, pathname),
  ).sort((left, right) => right.path.length - left.path.length)[0];

  if (matchingRule?.roles === "public") {
    return true;
  }

  const allowedRoles = matchingRule?.roles ?? ["admin"];

  return role !== undefined && allowedRoles.includes(role);
}

export function getRoleHomePath(role: AppRole): string {
  return role === "media" ? "/media" : "/dashboard";
}
