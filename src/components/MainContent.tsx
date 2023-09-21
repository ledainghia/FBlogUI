import { useTabContentStore } from "../store/store";
import TabPopularContent from "./TabPopularContent";
import TabRecentContent from "./TabRecentContent";


export default function MainContent() {
    const { isPopular, setPopular } = useTabContentStore();

    const handleTabClick = (isPopular: boolean) => {
        setPopular(isPopular);
    };
    return (
        <section className="main-content">
            <div className="container-xl">
                <div className="row gy-4">
                    <div className="col-lg-8">
                        {/* <!-- section header --> */}


                        <div className="spacer" data-height="50"></div>

                        {/* <!-- section header --> */}
                        <div className="section-header">
                            <h3 className="section-title">Latest Posts</h3>
                            <img src="images/wave.svg" className="wave" alt="wave" />
                        </div>

                        <div className="padding-30 rounded bordered">
                            <div className="row">
                                <div className="col-md-12 col-sm-6">
                                    {/* <!-- post --> */}
                                    <div className="post post-list clearfix">
                                        <div className="thumb rounded">
                                            <span className="post-format-sm">
                                                <i className="icon-picture"></i>
                                            </span>
                                            <a href="blog-single.html">
                                                <div className="inner">
                                                    <img src="images/posts/latest-sm-1.jpg" alt="post-title" />
                                                </div>
                                            </a>
                                        </div>
                                        <div className="details">
                                            <ul className="meta list-inline mb-3">
                                                <li className="list-inline-item">
                                                    <a href="#"><img src="images/other/author-sm.png" className="author" alt="author" />Katen Doe</a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="#">Trending</a>
                                                </li>
                                                <li className="list-inline-item">29 March 2021</li>
                                            </ul>
                                            <h5 className="post-title">
                                                <a href="blog-single.html">The Next 60 Things To Immediately Do About
                                                    Building</a>
                                            </h5>
                                            <p className="excerpt mb-0">
                                                A wonderful serenity has taken possession of my entire
                                                soul, like these sweet mornings
                                            </p>
                                            <div className="post-bottom clearfix d-flex align-items-center">
                                                <div className="social-share me-auto">
                                                    <button className="toggle-button icon-share"></button>
                                                    <ul className="icons list-unstyled list-inline mb-0">
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="fab fa-twitter"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="fab fa-pinterest"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="fab fa-telegram-plane"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="far fa-envelope"></i></a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="more-button float-end">
                                                    <a href="blog-single.html"><span className="icon-options"></span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12 col-sm-6">
                                    {/* <!-- post --> */}
                                    <div className="post post-list clearfix">
                                        <div className="thumb rounded">
                                            <a href="blog-single.html">
                                                <div className="inner">
                                                    <img src="images/posts/latest-sm-2.jpg" alt="post-title" />
                                                </div>
                                            </a>
                                        </div>
                                        <div className="details">
                                            <ul className="meta list-inline mb-3">
                                                <li className="list-inline-item">
                                                    <a href="#"><img src="images/other/author-sm.png" className="author" alt="author" />Katen Doe</a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="#">Lifestyle</a>
                                                </li>
                                                <li className="list-inline-item">29 March 2021</li>
                                            </ul>
                                            <h5 className="post-title">
                                                <a href="blog-single.html">Master The Art Of Nature With These 7 Tips</a>
                                            </h5>
                                            <p className="excerpt mb-0">
                                                A wonderful serenity has taken possession of my entire
                                                soul, like these sweet mornings
                                            </p>
                                            <div className="post-bottom clearfix d-flex align-items-center">
                                                <div className="social-share me-auto">
                                                    <button className="toggle-button icon-share"></button>
                                                    <ul className="icons list-unstyled list-inline mb-0">
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="fab fa-twitter"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="fab fa-pinterest"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="fab fa-telegram-plane"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="far fa-envelope"></i></a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="more-button float-end">
                                                    <a href="blog-single.html"><span className="icon-options"></span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12 col-sm-6">
                                    {/* <!-- post --> */}
                                    <div className="post post-list clearfix">
                                        <div className="thumb rounded">
                                            <span className="post-format-sm">
                                                <i className="icon-camrecorder"></i>
                                            </span>
                                            <a href="blog-single.html">
                                                <div className="inner">
                                                    <img src="images/posts/latest-sm-3.jpg" alt="post-title" />
                                                </div>
                                            </a>
                                        </div>
                                        <div className="details">
                                            <ul className="meta list-inline mb-3">
                                                <li className="list-inline-item">
                                                    <a href="#"><img src="images/other/author-sm.png" className="author" alt="author" />Katen Doe</a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="#">Fashion</a>
                                                </li>
                                                <li className="list-inline-item">29 March 2021</li>
                                            </ul>
                                            <h5 className="post-title">
                                                <a href="blog-single.html">Facts About Business That Will Help You Success</a>
                                            </h5>
                                            <p className="excerpt mb-0">
                                                A wonderful serenity has taken possession of my entire
                                                soul, like these sweet mornings
                                            </p>
                                            <div className="post-bottom clearfix d-flex align-items-center">
                                                <div className="social-share me-auto">
                                                    <button className="toggle-button icon-share"></button>
                                                    <ul className="icons list-unstyled list-inline mb-0">
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="fab fa-twitter"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="fab fa-pinterest"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="fab fa-telegram-plane"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="far fa-envelope"></i></a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="more-button float-end">
                                                    <a href="blog-single.html"><span className="icon-options"></span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12 col-sm-6">
                                    {/* <!-- post --> */}
                                    <div className="post post-list clearfix">
                                        <div className="thumb rounded">
                                            <a href="blog-single.html">
                                                <div className="inner">
                                                    <img src="images/posts/latest-sm-4.jpg" alt="post-title" />
                                                </div>
                                            </a>
                                        </div>
                                        <div className="details">
                                            <ul className="meta list-inline mb-3">
                                                <li className="list-inline-item">
                                                    <a href="#"><img src="images/other/author-sm.png" className="author" alt="author" />Katen Doe</a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="#">Politic</a>
                                                </li>
                                                <li className="list-inline-item">29 March 2021</li>
                                            </ul>
                                            <h5 className="post-title">
                                                <a href="blog-single.html">Your Light Is About To Stop Being Relevant</a>
                                            </h5>
                                            <p className="excerpt mb-0">
                                                A wonderful serenity has taken possession of my entire
                                                soul, like these sweet mornings
                                            </p>
                                            <div className="post-bottom clearfix d-flex align-items-center">
                                                <div className="social-share me-auto">
                                                    <button className="toggle-button icon-share"></button>
                                                    <ul className="icons list-unstyled list-inline mb-0">
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="fab fa-twitter"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="fab fa-pinterest"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="fab fa-telegram-plane"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#"><i className="far fa-envelope"></i></a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="more-button float-end">
                                                    <a href="blog-single.html"><span className="icon-options"></span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- load more button --> */}
                            <div className="text-center">
                                <button className="btn btn-simple">Load More</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        {/* <!-- sidebar --> */}
                        <div className="sidebar">
                            {/* <!-- widget about --> */}

                            <div className="post-tabs widget rounded bordered">

                                <ul className="nav nav-tabs nav-pills nav-fill" id="postsTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button
                                            aria-selected={isPopular}
                                            className={`nav-link ${isPopular ? 'active' : ''}`}
                                            type="button"
                                            onClick={() => handleTabClick(true)}
                                        >
                                            Popular
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            aria-selected={!isPopular}
                                            className={`nav-link ${!isPopular ? 'active' : ''}`}
                                            type="button"
                                            onClick={() => handleTabClick(false)}
                                        >
                                            Recent
                                        </button>
                                    </li>
                                </ul>
                                {isPopular ? <TabPopularContent /> : <TabRecentContent />}
                            </div>
                            <div className="widget rounded">
                                <div className="widget-about data-bg-image text-center" data-bg-image="images/map-bg.png">
                                    <img src="images/logo.svg" alt="logo" className="mb-4" />
                                    <p className="mb-4">
                                        Hello, We’re content writer who is fascinated by content
                                        fashion, celebrity and lifestyle. We helps clients bring
                                        the right content to the right people.
                                    </p>
                                    <ul className="social-icons list-unstyled list-inline mb-0">
                                        <li className="list-inline-item">
                                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#"><i className="fab fa-twitter"></i></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#"><i className="fab fa-instagram"></i></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#"><i className="fab fa-pinterest"></i></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#"><i className="fab fa-medium"></i></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#"><i className="fab fa-youtube"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>


                            {/* <!-- widget categories --> */}
                            <div className="widget rounded">
                                <div className="widget-header text-center">
                                    <h3 className="widget-title">Explore Topics</h3>
                                    <img src="images/wave.svg" className="wave" alt="wave" />
                                </div>
                                <div className="widget-content">
                                    <ul className="list">
                                        <li><a href="#">Lifestyle</a><span>(5)</span></li>
                                        <li><a href="#">Inspiration</a><span>(2)</span></li>
                                        <li><a href="#">Fashion</a><span>(4)</span></li>
                                        <li><a href="#">Politic</a><span>(1)</span></li>
                                        <li><a href="#">Trending</a><span>(7)</span></li>
                                        <li><a href="#">Culture</a><span>(3)</span></li>
                                    </ul>
                                </div>
                            </div>

                            {/* <!-- widget newsletter -->

            <!-- widget post carousel --> */}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
