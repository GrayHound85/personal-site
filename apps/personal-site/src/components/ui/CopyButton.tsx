"use client";

import { useState } from "react";
import TickIcon from "../icons/TickIcon";
import CopyIcon from "../icons/CopyIcon";

type CopyButtonProps = {
    text: string;
};

export default function CopyButton({
    text,
}: CopyButtonProps) {

    const [copied, setCopied] = useState(false);

    async function handleCopy() {

        try {

            await navigator.clipboard.writeText(text);

            setCopied(true);

            setTimeout(() => {

                setCopied(false);

            }, 2000);

        } catch (error) {

            console.error(error);

        }

    }

    return (

        <button

            onClick={handleCopy}

            className="
                flex
                items-center
                justify-between
                gap-4

                rounded-button

                border
                border-white/10

                bg-black/20
                backdrop-blur-xl

                px-4
                py-2

                transition-all
                duration-200

                hover:border-primary
                hover:bg-black/30
            "

        >

            <span
                className="
                    font-bold
                    text-text-secondary
                "
            >
                {text}
            </span>


            {

                copied

                    ? <TickIcon className="
                            h-5
                            w-5
                            shrink-0
                            text-primary
                        "/>

                    : <CopyIcon className="
                            h-5
                            w-5
                            shrink-0
                            text-text-secondary
                        "/>

            }

        </button>

    );

}