import Card from "@/components/ui/Card";
import BackgroundLayout from "@/components/layout/BackgroundLayout";
import LoginForm from "./LoginForm";

type LoginPageProps = {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl } = await searchParams;
  const redirectTo = Array.isArray(callbackUrl) ? callbackUrl[0] : callbackUrl;

  return (
    <BackgroundLayout background="plain">
      <div
        className="
                    flex
                    w-full
                    items-center
                    justify-center
                    translate-y-[-8vh]
                    md:translate-y-0
                    px-6
                "
      >
        <Card
          className="
                        w-full
                        max-w-md
                        bg-gray-950/40
                        border-none
                    "
        >
          <h1
            className="
                            text-3xl
                            font-bold
                            text-text-primary
                        "
          >
            Oliver&apos;s Dashboard
          </h1>

          <p
            className="
                            mt-3
                            text-text-secondary
                        "
          >
            Enter password to access dashboard.
          </p>

          <LoginForm redirectTo={redirectTo} />
        </Card>
      </div>
    </BackgroundLayout>
  );
}
