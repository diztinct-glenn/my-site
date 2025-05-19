import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SlideNav from "@/components/SlideNav";
import Intro from "@/components/Intro";
import DownArrow from "@/components/DownArrow";

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
        <Intro />
        <div className="flex min-h-screen">
          <div className="flex-1">
            <SlideNav />
            {/* site-main: header, main, sidebar */}
            <div className="site-main md:flex relative">
              <Header />
              <main className="p-[20px] pb-[40px] md:py-[100px] md:grow">
                {children}
              </main>
              <div className="shrink-0 md:basis-[15%] md:max-w-[200px] max-md:absolute max-md:top-0 max-md:right-0 max-md:z-50 max-md:h-16 max-md:flex max-md:items-center max-md:min-h-[80px]">
                <DownArrow />
              </div>
            </div>
            <footer className="flex flex-col justify-end items-start transition-all duration-300 text-white px-6 py-10 h-[calc(100vh-80px)] tracking-normal leading-[1.36364] text-[1.375rem] bg-[#283618]">
              <p className="text-[#DDA15E] text-[30px] md:text-[52px]">Got a project in mind?</p>
              <a className="text-[#DDA15E] text-[30px] md:text-[52px] underline hover:no-underline"  href="mailto:gbasgaard@gmail.com">Let&apos;s connect</a>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
