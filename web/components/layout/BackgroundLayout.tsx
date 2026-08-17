import type { ReactNode } from "react";

import GradientBackground from "../sections/porfolio/GradientBackground";

export type BackgroundVariant =
    | "hero"
    | "subtle"
    | "minimal";

type BackgroundLayoutProps = {
    children: ReactNode;
    background?: BackgroundVariant;
};

export default function BackgroundLayout({
    children,
    background = "hero",
}: BackgroundLayoutProps) {

    return (

        <main
            className="
                relative
                isolate

                flex

                min-h-screen

                overflow-x-hidden

                bg-background
            "
        >

            <GradientBackground
                variant={background}
            />


            <div
                className="
                    relative
                    z-10

                    flex

                    min-h-screen
                    w-full
                "
            >
                {children}
            </div>

        </main>

    );
}