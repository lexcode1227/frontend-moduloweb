import { useRouteError } from "react-router-dom";

export default function NotFoundPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-4xl">Oops!</h1>
      <p className="text-sm">Sorry, an unexpected error has occurred.</p>
      <p className="text-sm">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}