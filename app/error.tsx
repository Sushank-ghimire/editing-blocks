"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

const GlobalErrorBoundary = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <motion.div
      className="min-h-screen w-screen flex justify-center items-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col items-center text-center gap-6 max-w-md">
        <motion.div
          className="bg-red-100 dark:bg-red-900 p-4 rounded-full"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <AlertTriangleIcon className="md:size-10 size-8 text-red-500" />
        </motion.div>

        <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400">
          Something went wrong
        </h2>

        <p className="text-sm text-muted-foreground">
          {error.message || "Unexpected error occurred. Please try again."}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full justify-center">
          <Button onClick={reset} className="w-full sm:w-auto cursor-pointer">
            Try Again
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="ghost" className="w-full cursor-pointer sm:w-auto">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default GlobalErrorBoundary;
