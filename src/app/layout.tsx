import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Link from "next/link";

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
        {/* m-intro at the very top */}
        <div
          className="m-intro relative z-[100] bg-[#283618] text-white font-sans tracking-normal leading-[1.36364] text-[1.375rem] p-6 h-[calc(100vh-100px)]"
        >
          <div className="m-intro__inner inview--visible md:max-w-[75%] text-[#DDA15E] md:text-[52px]" data-inview="">
            <p>A creative developer passionate about design, technology, and building beautiful digital experiences.</p>
          </div>
        </div>
        <div className="flex min-h-screen">
          <div className="flex-1">
            {/* site-menu */}
            <div className="site-menu fixed z-[50] top-0 right-0 transition-transform duration-300 tracking-normal text-[1.375rem] leading-[1] p-[20px]">
              <a href="#" className="js-nav-trigger">Menu</a>
            </div>
            {/* l-nav (slide-out nav) */}
            <nav className="l-nav fixed bottom-0 right-0 transition-all duration-500 h-[calc(100%-100px)] translate-x-[calc(100%+1px)] w-full z-[75] text-white tracking-normal leading-[1.36364] text-[1.375rem]">
              <div className="l-nav__close">
                <a href="#" className="js-nav-trigger--close">Close</a>
              </div>
              <div className="menu-primary-menu-container">
                <ul id="menu-primary-menu" className="l-nav__menu">
                  <li className="menu-item menu-item-home current-menu-item"><Link href="/">Work</Link></li>
                  <li className="menu-item"><Link href="/about">About</Link></li>
                  <li className="menu-item"><Link href="/thoughts">Thoughts</Link></li>
                  <li className="menu-item"><Link href="/contact">Contact</Link></li>
                </ul>
              </div>
            </nav>
            {/* site-main: l-header, l-main, l-sidebar as siblings */}
            <div className="site-main md:flex">
              <Header />
              <main className="l-main p-[20px]">
                {children}
              </main>
              <div className="l-sidebar">
                <div className="c-down-arrow">
                  <a href="#" className="js-scroll-down">
                    <svg viewBox="0 0 24.41 64.41" role="presentation" className="icon--icon-arrow-down">
                      <use xlinkHref="#icon-arrow-down"></use>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <footer className="site-footer flex flex-col justify-end items-start transition-all duration-300 text-white px-6 py-10 h-[calc(100vh-64px)] tracking-normal leading-[1.36364] text-[1.375rem] bg-[#283618]">
              <div>
                Have a project you&apos;d like to talk about?<br />
                <a href="mailto:glenn@example.com">Get in touch</a>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
