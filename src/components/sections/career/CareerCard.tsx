import LinkCard from "@/components/ui/LinkCard";

type CareerCardProps = {
    href: string;
    title: string;
    description: string;
    icon: React.ReactNode;
};

export default function CareerCard({
    href,
    title,
    description,
    icon
}: CareerCardProps) {
    return (
        <LinkCard href={href} className="h-100 w-full rounded-card_inner border-border">
            {icon}
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-text-tertiary">{description}</p>
        </LinkCard>
    )
}