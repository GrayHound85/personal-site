// import { url } from "inspector/promises";
import { NextResponse } from "next/server";
import { Resource } from "@/types/resources";

export async function GET() {

    const object : Resource[] = [{
        id: 1,
        title: "NeetCode",
        url: "https://neetcode.io",
    },
    {
        id: 2,
        title: "Roadmap.sh",
        url: "https://roadmap.sh",
    },
    {
        id: 3,
        title: "The Odin Project",
        url: "https://www.theodinproject.com",
    }]
    return NextResponse.json(object);
}