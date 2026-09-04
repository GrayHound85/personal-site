import BackgroundLayout from "@/components/layout/BackgroundLayout";

export default function ReadingPage() {
    return (
        <BackgroundLayout background="subtle">
            <main className="flex flex-col w-full h-full items-center p-8">
                <h2 className="font-bold text-3xl text-text-secondary">Reading</h2>
            </main>
        </BackgroundLayout>
    );
}