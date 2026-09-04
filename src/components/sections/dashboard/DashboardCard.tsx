import LinkCard from "@/components/ui/LinkCard";

type DashboardCardProps = {
    href: string;
    title: string;
    description: string;
    icon: React.ReactNode;
};


export default function DashboardCard({
    href,
    title,
    description,
    icon,
}: DashboardCardProps) {

    return (
        <LinkCard
            href={href}
            className="
                h-auto
                xl:h-full

                w-full
                flex
                flex-col
                justify-between
                gap-4
            ">
            
            <div className="flex flex-row p-2">

                <div className="flex-auto">

                    <h2
                        className="
                            text-xl
                            font-semibold
                        "
                    >
                        {title}
                    </h2>

                    <p
                        className="
                            mt-2
                            text-text-secondary
                        "
                    >
                        {description}
                    </p>

                </div>

                <div className="
                                hidden 
                                sm:flex 
                                items-center 
                                aspect-square 
                                justify-center">
                    {icon}
                </div>

            </div>

            <div className="
                            hidden
                            xl:flex

                            flex-auto 
                            items-start 
                            justify-center 
                            border-t 
                            border-white/10 p-4
                        ">

            </div>
        </LinkCard>
    );
}