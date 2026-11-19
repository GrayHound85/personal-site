import type { Metadata } from "next";
import Link from "next/link";

import PortfolioLayout from "@c/layout/PortfolioLayout";
import ProfileCard from "@c/sections/porfolio/ProfileCard";
import PathNav from "@c/ui/PathNav";
import RepoPanel from "@c/ui/RepoPanel";
import LockIcon from "@c/icons/LockIcon";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false },
};

type LoginPageProps = {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl } = await searchParams;
  const redirectTo = Array.isArray(callbackUrl) ? callbackUrl[0] : callbackUrl;

  return (
    <PortfolioLayout
      profile={<ProfileCard />}
      hideProfileOnMobile
      navigation={
        <PathNav
          type="top"
          segments={[{ label: "home", href: "/" }, { label: "login" }]}
        />
      }
    >
      {/*
        From md up the panel runs down to the bottom of the profile card:
        the main column starts 7rem down and the card ends 2rem from the
        bottom, so 100vh - 9rem. The body then splits into two halves with a
        divider between them, each centred vertically.
      */}
      <RepoPanel
        title="login"
        icon={LockIcon}
        className="flex flex-col md:min-h-[calc(100vh-9rem)]"
        bodyClassName="grid flex-1 content-center gap-10 lg:grid-cols-2 lg:content-stretch lg:gap-0"
      >
        <div className="flex flex-col justify-center lg:pr-12">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              Private workspace
            </h1>
            <p className="mt-3 max-w-xl leading-relaxed text-text-secondary">
              This part of the site is just for me. Looking for my work?{" "}
              <Link
                href="/"
                className="text-primary underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                Head back home
              </Link>
              .
            </p>

            {/* Where the proxy was sending you before it asked for a login */}
            {redirectTo && (
              <p className="mt-6 font-mono text-xs text-text-secondary">
                → continues to {redirectTo}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center lg:border-l lg:border-white/10 lg:pl-12">
          <div className="w-full max-w-md lg:mx-auto">
            <LoginForm redirectTo={redirectTo} />
          </div>
        </div>
      </RepoPanel>
    </PortfolioLayout>
  );
}
