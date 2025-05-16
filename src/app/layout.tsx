import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SlideNav from "@/components/SlideNav";
import Intro from "@/components/Intro";

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
            {/* site-main: l-header, l-main, l-sidebar as siblings */}
            <div className="site-main md:flex">
              <Header />
              <main className="l-main p-[20px] md:grow">
                {children}
              </main>
              <div className="l-sidebar shrink-0 md:basis-[128px]">
                <div className="c-down-arrow pt-[20px] pr-[20px] transition-opacity duration-300">
                  <a href="#" className="js-scroll-down">
                    <svg viewBox="0 0 24.41 64.41" role="presentation" className="icon--icon-arrow-down w-[24px] h-[64px]">
                      <use xlinkHref="#icon-arrow-down"></use>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <footer className="site-footer flex flex-col justify-end items-start transition-all duration-300 text-white px-6 py-10 h-[calc(100vh-64px)] tracking-normal leading-[1.36364] text-[1.375rem] bg-[#283618]">
              <p>Got a project in mind?</p>
              <a href="mailto:glenn@example.com">Let's connect</a>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
