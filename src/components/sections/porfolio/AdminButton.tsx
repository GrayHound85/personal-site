"use client";

import LinkButton from "@/components/ui/LinkButton";

export default function AdminButton() {
    return (
        <LinkButton 
            href="/login" 
            className="
                fixed
                bottom-6
                right-6
                z-50

                flex
                items-center
                justify-center

                h-12
                w-12
                text-[#335f6f]

                px-0
                py-0

                rounded-full

                bg-[#000e19]
            ">
            ⚙
        </LinkButton>
    );
}