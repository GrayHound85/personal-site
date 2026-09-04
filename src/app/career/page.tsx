import BackgroundLayout from "@/components/layout/BackgroundLayout";

import Card from "@/components/ui/Card";
import CareerCard from "@/components/sections/career/CareerCard";
import CareerCategory from "@/components/sections/career/CareerCategory";

import DividerLine from "@/components/ui/DividerLine";

export default function CareerPage() {
    return (
        <BackgroundLayout background="subtle">
            <main className="
                            flex 
                            flex-col 
                            gap-6 
                            w-full 
                            min-h-screen
                            items-start 
                            p-8">
                <CareerCategory title="Career">
                    <CareerCard 
                        href="/career/opportunities"
                        title="Opportunities"
                        description="Check out our current job openings."
                        icon={<span>💼</span>}
                    />
                    <CareerCard 
                        href="/career/companies"
                        title="Companies"
                        description="Check out our current job openings."
                        icon={<span>💼</span>}
                    />
                    <CareerCard 
                        href="/career/networking"
                        title="Networking"
                        description="Check out our current job openings."
                        icon={<span>💼</span>}
                    />
                </CareerCategory>

                <DividerLine />

                <CareerCategory title="Learning">
                    <CareerCard 
                        href="/career/resources"
                        title="Resources"
                        description="Check out our current job openings."
                        icon={<span>💼</span>}
                    />
                    <CareerCard 
                        href="/career/roadmaps"
                        title="Roadmaps"
                        description="Check out our current job openings."
                        icon={<span>💼</span>}
                    />
                    <CareerCard 
                        href="/career/reading"
                        title="Reading"
                        description="Check out our current job openings."
                        icon={<span>💼</span>}
                    />
                    <CareerCard 
                        href="/career/skills"
                        title="Skills"
                        description="Check out our current job openings."
                        icon={<span>💼</span>}
                    />
                    <CareerCard 
                        href="/career/certification"
                        title="Certifications"
                        description="Check out our current job openings."
                        icon={<span>💼</span>}
                    />
                    
                </CareerCategory>

                <DividerLine />

                <CareerCategory title="Work">
                    <CareerCard 
                        href="/career/projects"
                        title="Projects"
                        description="Check out our current job openings."
                        icon={<span>💼</span>}
                    />
                    <CareerCard 
                        href="/career/tasks"
                        title="Tasks"
                        description="Check out our current job openings."
                        icon={<span>💼</span>}
                    />
                    <CareerCard 
                        href="/career/review"
                        title="Review"
                        description="Check out our current job openings."
                        icon={<span>💼</span>}
                    />
                </CareerCategory>
            </main>
        </BackgroundLayout>
    );
}