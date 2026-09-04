type CareerCategoryProps = {
    children: React.ReactNode;
    title: string;
};

export default function CareerCategory({
    children,
    title
}: CareerCategoryProps) {
    return (
        <div className="
                        flex 
                        flex-col 
                        flex-wrap 
                        gap-6 
                        w-full">

            <h2 className="font-bold text-4xl text-text-secondary">{title}</h2>
            <div className="
                            grid 
                            grid-cols-1
                            md:grid-cols-2
                            xl:grid-cols-3 
                            gap-6">
                {children}
            </div>
        </div>

    )
}