import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="font-bold text-7xl md:text-9xl mb-8">404</h1>
      <p className="text-lg md:text-2xl text-gray-700 mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="text-black underline text-lg">Go back home</Link>
    </main>
  );
}
