import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="mx-auto w-full max-w-md px-4 py-20 text-center text-neutral-200">
            <h1 className="text-4xl font-bold mb-2">404 — Page not found.</h1>
            <p className="text-neutral-400 mb-6">Sorry, this page does not exist.</p>

            <Link to="/" className="inline-block px-5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition">
                Back to main
            </Link>
        </div>
    );
}
