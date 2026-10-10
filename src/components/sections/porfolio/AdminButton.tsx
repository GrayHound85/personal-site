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
                text-action
                

                px-0
                py-0

                rounded-full

                bg-action
                bg-opacity-10
              
            "
    >
      ⚙
    </LinkButton>
  );
}
