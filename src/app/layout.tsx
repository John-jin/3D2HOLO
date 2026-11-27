import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "3D 照片打印与全息图片：真实 3D 动态效果 | 3D2HOLO",
  description:
    "把你的照片，变成会动的 3D 实物照片。浏览器里免费设计，实时预览 3D 效果，然后下单定制真实的光栅照片。",
  openGraph: {
    title: "3D 照片打印与全息图片：真实 3D 动态效果 | 3D2HOLO",
    description:
      "把你的照片，变成会动的 3D 实物照片。浏览器里免费设计，实时预览 3D 效果。",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
