import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans-face",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const serif = Source_Serif_4({
  variable: "--font-serif-face",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Academic Planning | University of Nigeria",
  description:
    "Academic Planning Unit of the University of Nigeria — quality control, programme accreditation, and institutional data for orderly academic development.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="flex h-full max-h-[100vh] flex-col overflow-hidden">
        {children}
      </body>
    </html>
  );
}
