import BackgroundLayout from "../layout/BackgroundLayout";

type ConnectionErrorProps = {
  title: string;
  message: string;
  onRetry: () => void;
};

export default function ConnectionError({
  title,
  message,
  onRetry,
}: ConnectionErrorProps) {
  return (
    <BackgroundLayout>
      <main className="flex h-3/4 items-center justify-center px-6 w-full">
        <div className="flex max-w-lg flex-col items-center gap-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
            <span className="text-2xl">!</span>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-text-primary">
              {title}
            </h1>

            <p className="text-text-secondary">{message}</p>
          </div>

          <button
            type="button"
            onClick={onRetry}
            className="
            rounded-button
            bg-action
            px-6
            py-3
            font-medium
            text-white
            transition-colors
            hover:bg-primary-hover
          "
          >
            Try again
          </button>
        </div>
      </main>
    </BackgroundLayout>
  );
}
