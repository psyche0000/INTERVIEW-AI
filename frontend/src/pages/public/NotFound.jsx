import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white px-6">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-8xl font-bold tracking-tight text-blue-600">
          404
        </p>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
          Page not found
        </h1>

        <p className="mt-4 text-base leading-7 text-gray-600">
          The page you are looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Home
          </Link>

          <Link
            to="/features"
            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Explore Features
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;