import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next";
import { Toaster } from "@/components/ui/sonner";
import { ConvexClientProvider } from "@/components/providers/convex-client-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Editing Blocks – Real-Time Document Collaboration",
  description:
    "Create, edit, and collaborate on documents in real time with your team. Editing Blocks lets you write together, organize your work, and see changes live — all in one powerful workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <NuqsAdapter>
          <ThemeProvider attribute="class" defaultTheme="system">
            <NextTopLoader
              color="#6366f1"
              height={3}
              speed={200}
              showSpinner={true}
            />
            <ConvexClientProvider>
              {children}
              <Toaster />
            </ConvexClientProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
