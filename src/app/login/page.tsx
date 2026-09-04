"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import BackgroundLayout from "@/components/layout/BackgroundLayout";


export default function LoginPage() {

    const router = useRouter()

    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    function handleLogin() {
        const correctPassword = "7632"

        if (password === correctPassword) {
            router.push("/dashboard");
        } else {
            setError("Incorrect password")
        }
    }

    return (
        <BackgroundLayout background="hero">
            <div
                className="
                    flex
                    w-full
                    items-center
                    justify-center
                    px-6
                "
            >
                <Card
                    className="
                        w-full
                        max-w-md
                        bg-panel
                    "
                >

                    <h1
                        className="
                            text-3xl
                            font-bold
                            text-text-primary
                        "
                    >
                        Oliver's Dashboard
                    </h1>

                    <p
                        className="
                            mt-3
                            text-text-secondary
                        "
                    >
                        Enter password to access dashboard.
                    </p>

                    <form

                        onSubmit={(event) => {

                            event.preventDefault();

                            handleLogin();

                        }}

                        className="
                            mt-8
                            space-y-5
                            text-black
                        "
                    >

                        <Input

                            type="password"

                            placeholder="Password"

                            value={password}

                            onChange={(event) => {

                                setPassword(event.target.value);

                            }}

                        />



                        {
                            error && (
                                <p
                                    className="
                                        text-sm
                                        text-red-500
                                    "
                                >
                                    {error}
                                </p>

                            )
                        }



                        <Button
                            className="
                                w-full
                            "
                        >
                            Login
                        </Button>
                    </form>
                </Card>
            </div>
        </BackgroundLayout>
    );
}