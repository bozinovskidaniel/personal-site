import "@/app/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Metadata } from "next";
import { Inter } from "next/font/google";
import { FunctionComponent, PropsWithChildren } from "react";

import { ViewTransitionListener } from "@/components/view-transitions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://bozinovskidaniel.com"),
  title: "Daniel Bozinovski",
  description:
    "Daniel Bozinovski is a software engineer at nib. Full-stack engineering, AI integrations, and selected projects.",
  alternates: { canonical: "/" },
  icons: {
    icon: { url: "/mountain-mark.svg", type: "image/svg+xml" },
  },
  openGraph: {
    title: "Daniel Bozinovski",
    description:
      "Software engineer at nib. Full-stack engineering, AI integrations, and selected projects.",
    url: "https://bozinovskidaniel.com",
  },
};

const RootLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body className={inter.className}>
      <ViewTransitionListener />
      {children}
    </body>
  </html>
);

export default RootLayout;
