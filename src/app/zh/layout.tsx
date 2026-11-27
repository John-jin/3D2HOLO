import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function ZhLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex flex-1 px-3 md:px-5">{children}</main>
      <Footer />
    </>
  );
}
