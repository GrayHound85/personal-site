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
                    lg:flex-row

                    min-h-screen
                    lg:h-screen

                    w-full
                "
            >

                <aside
                    className="
                        w-full
                        lg:w-100

                        shrink-0

                        p-8

                        lg:h-screen
                        lg:z-10
                    "
                >
                    <div
                        className="
                            flex
                            justify-center

                            lg:h-full
                        "
                    >
                        {profile}
                    </div>
                </aside>


                <main
                    className="
                        w-full

                        lg:min-h-0
                        lg:flex-1

                        lg:overflow-y-auto
                        scrollbar-none

                        p-8
                        lg:pt-28
                        lg:pl-0
                        lg:pr-8

                        lg:z-20
                    "
                >
                    <div
                        className="
                            flex
                            flex-col
                            gap-6

                            lg:pr-1
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
                        lg:block

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