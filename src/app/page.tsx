import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* block-projects (repeat as needed) */}
      <div className="block-projects">
        <div className="row">
          <div className="columns small-12">
            <div className="c-item is-autoplay inview--visible" data-inview="">
              <figure className="c-item__media">
                <Link href="/work/project-1">
                  <div className="c-item__image">
                    <div className="intrinsic-image" style={{paddingBottom: '60%'}}>
                      <img src="https://placehold.co/600x400?text=Project+1" alt="Project 1" />
                    </div>
                  </div>
                </Link>
              </figure>
              <div className="c-item__content">
                <h2 className="c-item__title">
                  <Link href="/work/project-1">Project 1</Link>
                </h2>
                <div className="c-item__text">Short description for Project 1.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns small-12">
            <div className="c-item is-autoplay inview--visible" data-inview="">
              <figure className="c-item__media">
                <Link href="/work/project-1">
                  <div className="c-item__image">
                    <div className="intrinsic-image" style={{ paddingBottom: '60%' }}>
                      <img src="https://placehold.co/600x400?text=Project+1" alt="Project 1" />
                    </div>
                  </div>
                </Link>
              </figure>
              <div className="c-item__content">
                <h2 className="c-item__title">
                  <Link href="/work/project-1">Project 1</Link>
                </h2>
                <div className="c-item__text">Short description for Project 1.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns small-12">
            <div className="c-item is-autoplay inview--visible" data-inview="">
              <figure className="c-item__media">
                <Link href="/work/project-1">
                  <div className="c-item__image">
                    <div className="intrinsic-image" style={{ paddingBottom: '60%' }}>
                      <img src="https://placehold.co/600x400?text=Project+1" alt="Project 1" />
                    </div>
                  </div>
                </Link>
              </figure>
              <div className="c-item__content">
                <h2 className="c-item__title">
                  <Link href="/work/project-1">Project 1</Link>
                </h2>
                <div className="c-item__text">Short description for Project 1.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns small-12">
            <div className="c-item is-autoplay inview--visible" data-inview="">
              <figure className="c-item__media">
                <Link href="/work/project-1">
                  <div className="c-item__image">
                    <div className="intrinsic-image" style={{ paddingBottom: '60%' }}>
                      <img src="https://placehold.co/600x400?text=Project+1" alt="Project 1" />
                    </div>
                  </div>
                </Link>
              </figure>
              <div className="c-item__content">
                <h2 className="c-item__title">
                  <Link href="/work/project-1">Project 1</Link>
                </h2>
                <div className="c-item__text">Short description for Project 1.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns small-12">
            <div className="c-item is-autoplay inview--visible" data-inview="">
              <figure className="c-item__media">
                <Link href="/work/project-1">
                  <div className="c-item__image">
                    <div className="intrinsic-image" style={{ paddingBottom: '60%' }}>
                      <img src="https://placehold.co/600x400?text=Project+1" alt="Project 1" />
                    </div>
                  </div>
                </Link>
              </figure>
              <div className="c-item__content">
                <h2 className="c-item__title">
                  <Link href="/work/project-1">Project 1</Link>
                </h2>
                <div className="c-item__text">Short description for Project 1.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
