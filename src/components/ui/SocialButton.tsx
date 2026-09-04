import type { ComponentType, SVGProps } from "react";


type SocialButtonProps = {
    href: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    invert?: boolean;
};


export default function SocialButton({
    href,
    icon: Icon,
    invert = false,
}: SocialButtonProps) {

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"

            className="
                flex
                h-12
                w-12
                items-center
                justify-center

                rounded-button

                bg-primary
                hover:bg-primary-hover

                transition
                hover:scale-105
                shrink-0
            "
        >

            <Icon
                className={`
                    h-7
                    w-7

                    ${
                        invert
                        ? "text-primary"
                        : "text-white"
                    }
                `}
            />

        </a>
    );
}