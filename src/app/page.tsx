import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* block-projects (repeat as needed) */}
      <div className="flex flex-col gap-[40px] xl:gap-[60px]">
        <div className="row">
          <div className="c-item is-autoplay inview--visible flex flex-col gap-[20px]" data-inview="">
            <figure className="c-item__media">
              <Link href="https://flateamshop.com/" target="_blank" className="inline-block">
                <div className="c-item__image">
                  <div className="intrinsic-image">
                    <Image src="/florida-panthers.png" alt="Florida Panthers Team Shop" width={1314 } height={808} />
                  </div>
                </div>
              </Link>
            </figure>
            <div className="c-item__content">
              <h2 className="c-item__title">
                <Link className="text-[22px] lg:text-[36px]" href="https://flateamshop.com/" target="_blank">Florida Panthers Team Shop</Link>
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="c-item is-autoplay inview--visible flex flex-col gap-[20px]" data-inview="">
            <figure className="c-item__media">
              <Link href="https://store.lucidmotors.com/" target="_blank" className="inline-block">
                <div className="c-item__image">
                  <div className="intrinsic-image">
                    <Image src="/lucid-screenshot.png" alt="Lucid Motors" width={1000} height={1227} />
                  </div>
                </div>
              </Link>
            </figure>
            <div className="c-item__content">
              <h2 className="c-item__title">
                <Link className="text-[22px] lg:text-[36px]" href="https://store.lucidmotors.com/" target="_blank">Lucid Motors</Link>
              </h2>
            </div>
          </div>
        </div>
        <div className="row flex flex-col xl:flex-row gap-[40px] xl:gap-[20px]">
          <div className="c-item is-autoplay inview--visible flex flex-col gap-[20px]" data-inview="">
            <figure className="c-item__media">
              <Link href="https://www.flyracing.com/" target="_blank" className="inline-block">
                <div className="c-item__image">
                  <div className="intrinsic-image">
                    <Image src="/fly-racing.png" alt="Fly Racing" width={799} height={819} />
                  </div>
                </div>
              </Link>
            </figure>
            <div className="c-item__content">
              <h2 className="c-item__title">
                <Link className="text-[22px] lg:text-[36px]" href="https://www.flyracing.com/" target="_blank">Fly Racing</Link>
              </h2>
            </div>
          </div>
          <div className="c-item is-autoplay inview--visible flex flex-col gap-[20px]" data-inview="">
            <figure className="c-item__media">
              <Link href="https://www.pompeii3.com/" target="_blank" className="inline-block">
                <div className="c-item__image">
                  <div className="intrinsic-image">
                    <Image src="/pompeii-3.png" alt="Pompeii 3" width={799} height={820} />
                  </div>
                </div>
              </Link>
            </figure>
            <div className="c-item__content">
              <h2 className="c-item__title">
                <Link className="text-[22px] lg:text-[36px]" href="https://www.pompeii3.com/" target="_blank">Pompeii 3</Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
