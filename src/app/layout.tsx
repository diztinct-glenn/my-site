import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SlideNav from "@/components/SlideNav";
import Intro from "@/components/Intro";
import DownArrow from "@/components/DownArrow";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import MainWrapper from "@/components/MainWrapper";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Glenn Basgaard",
  description: "Glenn Basgaard's personal site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased bg-white text-black`}>
        <ScrollToTop />
        <Intro />
        <div className="flex min-h-screen">
          <div className="flex-1">
            <SlideNav />
            {/* site-main: header, main, sidebar */}
            <div className="site-main md:flex relative">
              <Header />
              <MainWrapper>
                {children}
              </MainWrapper>
              <div className="shrink-0 md:basis-[15%] md:max-w-[200px] max-md:absolute max-md:top-0 max-md:right-0 max-md:z-50 max-md:h-16 max-md:flex max-md:items-center max-md:min-h-[80px]">
                <DownArrow />
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
