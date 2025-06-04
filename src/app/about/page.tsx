import GsapImage from "@/components/GsapImage";

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="2xl:grid 2xl:grid-rows-6 2xl:grid-cols-12 2xl:gap-5  2xl:overflow-hidden 2xl:min-h-[90vh]">
        <div className="2xl:col-start-2 2xl:col-span-11 2xl:row-start-1 2xl:row-span-3">
          <p className="text-lg md:sticky md:top-24 z-10 mb-[20px]">
            Hey, I&apos;m Glenn — a software engineer who&apos;s all about making the web look good and work even better. I&apos;ve had the chance to work with brands like the Florida Panthers and Lucid Motors, creating custom solutions that actually move the needle. Outside of code, you&apos;ll find me digging through record crates, saving way too many pins on Google Maps, or playing with my pup. Let&apos;s make something cool.
          </p>
        </div>
        <div className="2xl:flex 2xl:col-start-1 2xl:col-end-14 2xl:row-start-2 2xl:row-end-7">
          <GsapImage src="/glenn-norway-2.jpeg" alt="Florida Panthers Team Shop" width={1314} height={808} />
        </div>
      </div>
    </div>
  );
}
