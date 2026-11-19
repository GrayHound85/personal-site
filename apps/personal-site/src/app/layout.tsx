import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://olivernorrie.com"),

  title: {
    default: "Oliver Norrie | Computer Science Student",
    template: "%s | Oliver Norrie",
  },

  description:
    "Oliver Norrie is a Computer Science student at the University of Edinburgh, developing software projects across web development, systems engineering, and self-hosted infrastructure.",

  applicationName: "Oliver Norrie Personal Site",

  authors: [
    {
      name: "Oliver Norrie",
      url: "https://olivernorrie.com",
    },
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "https://olivernorrie.com",
    siteName: "Oliver Norrie",
    title: "Oliver Norrie | Computer Science Student",
    description:
      "Computer Science student at the University of Edinburgh, building software projects in web development, systems engineering, and self-hosted infrastructure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
