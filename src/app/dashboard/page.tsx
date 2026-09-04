import BackgroundLayout from "@/components/layout/BackgroundLayout";

import DashboardCard from "@/components/sections/dashboard/DashboardCard";

export default function DashboardPage() {
    return (
        <BackgroundLayout background="subtle">
            <main className="
                flex
                flex-col
                w-full
                h-full
                items-center
                p-8
              ">
                <h2 className="font-bold text-3xl text-text-secondary">Good morning</h2>
                <h1 className="font-bold text-5xl p-4">Oliver</h1>

                <div className="
                  h-full
                  w-full
                  flex
                  flex-col
                  xl:flex-row
                  gap-8
                  p-4
                ">
                  <DashboardCard
                    href="/career"
                    title="Career"
                    description="Manage your career goals and progress."
                    icon={<span>o</span>}
                  />
                  <DashboardCard
                    href="/media"
                    title="Media"
                    description="Explore media content and updates."
                    icon={<span>o</span>}
                  />
                  <DashboardCard
                    href="/finance"
                    title="Finance"
                    description="Track your financial activities."
                    icon={<span>o</span>}
                  />
                </div>
            </main>
        </BackgroundLayout>
    );
}