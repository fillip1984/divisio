import { FaCircleNotch, FaExclamationTriangle } from "react-icons/fa";

export default function LoadingAndRetry({
  isLoading,
  isError,
  retry,
}: {
  isLoading: boolean;
  isError: boolean;
  retry: () => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-center">
      {isLoading && <FaCircleNotch className="animate-spin text-9xl" />}

      {isError && (
        <div className="rounded-lg bg-foreground p-2">
          <h2 className="flex items-center justify-center gap-2 text-danger uppercase">
            <FaExclamationTriangle /> error
          </h2>
          <div className="mt-8">
            <p>An occurred has occurred, would you like to try?</p>
            <button
              type="button"
              onClick={retry}
              className="mt-1 w-full rounded bg-primary px-4 py-2 text-3xl"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
