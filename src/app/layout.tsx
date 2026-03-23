import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "מעקב דירות",
  description: "אפליקציה פשוטה לשיתוף ומעקב אחר דירות",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="he" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
