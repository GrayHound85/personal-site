import HeroPanel from "./HeroPanel";
import Card from "@/components/ui/Card";
import SocialButton from "../../ui/SocialButton";
import CopyButton from "@/components/ui/CopyButton";
import Button from "@/components/ui/Button";

import LinkedinIcon from "@/components/icons/LinkedinIcon";
import LeetcodeIcon from "@/components/icons/LeetcodeIcon";
import GithubIcon from "@/components/icons/GithubIcon";

export default function ProfileCard(){
    return (
        <Card className="bg-gray-950/40 h-full">
            <div className="
                    flex
                    h-full
                    flex-col
                    items-center
                    pt-6
                ">

                <div className="
                        relative

                        h-50
                        w-50

                        rounded-full

                        bg-primary

                        overflow-hidden
                    ">

                    <img
                        src="/temp_headshot.png"
                        alt="Profile picture"
                        className="
                            absolute

                            bottom-0

                            h-full
                            w-full

                            object-cover
                        "
                    />
                </div>

                <div className="
                        flex
                        flex-1
                        flex-col
                        items-center
                        pt-8
                        p-2
                        w-full
                    ">
                    <h1 className="text-4xl font-bold">Oliver Norrie</h1>
                    <h2 className="
                            text-center 
                            text-text-secondary 
                            font-bold 
                            p-4
                        ">
                        BSc Computer Science <br/> University of Edinburgh
                    </h2>

                    <div className="
                            flex 
                            flex-row  
                            items-center
                            gap-6
                            p-6
                        ">

                        <SocialButton
                            href="https://github.com/GrayHound85"
                            icon={GithubIcon}
                        />
                        <SocialButton
                            href="https://www.linkedin.com/in/olivernorrie"
                            icon={LinkedinIcon}
                        />

                        <SocialButton
                            href="https://leetcode.com/u/GrayHound85"
                            icon={LeetcodeIcon}
                        />

                    </div>

                    <CopyButton text="oliver.norrie@gmail.com" />

                    <div className="md:flex-1 h-8" />

                    <Button className="w-full ">
                        Resume
                    </Button>

                </div>
            </div>
        </Card>
    );
}