import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Page not found - Editing Blocks",
  description:
    "Sorry, the page you're looking for doesn't exist or has been moved.",
};

const NotFoundPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background text-foreground px-4 text-center animate-fade-in">
      <div className="text-7xl mb-4">😕</div>
      <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
      <p className="text-lg text-muted-foreground mb-6 max-w-md">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground hover:opacity-90 transition"
      >
        <ArrowLeft size={20} />
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
