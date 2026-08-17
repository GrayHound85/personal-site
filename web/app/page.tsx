

import BackgroundLayout from "@/components/layout/BackgroundLayout";
import PortfolioLayout from "@/components/layout/PortfolioLayout";

import HeroPanel from "@/components/sections/porfolio/HeroPanel";
import ProfileCard from "@/components/sections/porfolio/ProfileCard";
import NavBar from "@/components/ui/NavBar";
import AdminButton from "@/components/sections/porfolio/AdminButton";


export default function LandingPage() {

    return (
        <PortfolioLayout
            profile={
                <ProfileCard/>
            }

            navigation={
                <NavBar 
                    type="top"
                    items={[
                        {
                            label: "About",
                            targetId: "about",
                        },
                        {
                            label: "Projects",
                            targetId: "projects",
                        },
                        {
                            label: "Education",
                            targetId: "experience",
                        }
                    ]}
                />
            }

            floating={
                <AdminButton/>
            }
        >

            <HeroPanel id="about">
                About
            </HeroPanel>

            <HeroPanel id="projects">
                Projects
            </HeroPanel>

            <HeroPanel id="experience">
                Experience
            </HeroPanel>

        </PortfolioLayout>
    );
}