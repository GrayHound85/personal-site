"use client";

import LinkButton from "@/components/ui/LinkButton";

export default function AdminButton() {
  return (
    <LinkButton
      href="/login"
      className="
                fixed
                top-3
                right-3
                md:right-6
                md:top-auto
                md:bottom-6
                z-50

                flex
                items-center
                justify-center

                h-12
                w-12
                text-[#5cb9c8]
                md:text-[#335f6f]

                px-0
                py-0

                rounded-full

                md:bg-[#000e19]
                bg-[#056D7C]
            "
    >
      ⚙
    </LinkButton>
  );
}
