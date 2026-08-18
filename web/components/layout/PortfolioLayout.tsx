import type { ReactNode } from "react";

import BackgroundLayout from "./BackgroundLayout";

type PortfolioLayoutProps = {
    profile: ReactNode;
    navigation: ReactNode;
    floating?: ReactNode;
    children: ReactNode;
};

export default function PortfolioLayout({
    profile,
    navigation,
    children,
    floating,
}: PortfolioLayoutProps) {

    return (
        <BackgroundLayout background="hero">
            <div
                className="
                    relative
                    flex
                    flex-col
                    md:flex-row

                    min-h-screen
                    md:h-screen

                    w-full
                "
            >

                <aside
                    className="
                        w-full
                        md:w-100

                        shrink-00

                        p-8

                        md:h-screen
                        md:z-10
                    "
                >
                    <div
                        className="
                            flex
                            justify-center

                            md:h-full
                        "
                    >
                        {profile}
                    </div>
                </aside>


                <main
                    className="
                        w-full

                        md:min-h-0
                        md:flex-1

                        md:overflow-y-auto
                        scrollbar-none

                        p-8
                        md:pt-28
                        md:pl-0
                        md:pr-8

                        md:z-20
                    "
                >
                    <div
                        className="
                            flex
                            flex-col
                            gap-6

                            md:pr-1
                        "
                    >
                        {children}
                    </div>
                </main>


                <header
                    className="
                        pointer-events-none

                        absolute
                        top-0
                        right-0
                        left-100
                        z-50

                        hidden
                        md:block

                        pr-8
                    "
                >
                    <div className="pointer-events-auto">
                        {navigation}
                    </div>
                </header>


                {floating}

            </div>
        </BackgroundLayout>
    );
}