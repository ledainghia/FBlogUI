import { useTabContentStore } from "../store/store";
import TabPopularContent from "./TabPopularContent";
import TabRecentContent from "./TabRecentContent";

export default function Hero() {
    const { isPopular, setPopular } = useTabContentStore();

    const handleTabClick = (isPopular: boolean) => {
        setPopular(isPopular);
    };

    return (
        <section id="hero">
            <div className="container-fluid">
                <div className="row gy-4">
                    <div className="col-lg-8">

                        <div className="post featured-post-lg">
                            <div className="details clearfix">
                                <a href="category.html" className="category-badge">Software Engineer</a>
                                <h2 className="post-title">
                                    <a href="blog-single.html">Tại sao nên học Java và Spring?</a>
                                </h2>
                                <ul className="meta list-inline mb-0">
                                    <li className="list-inline-item">
                                        <a href="#">Nguyen Hoang Nam</a>
                                    </li>
                                    <li className="list-inline-item">29 March 2021</li>
                                </ul>
                            </div>
                            <a href="blog-single.html">
                                <div className="thumb rounded">
                                    <div className="inner data-bg-image"
                                        style={{ backgroundImage: "url('https://res.cloudinary.com/practicaldev/image/fetch/s--LeqrCOME--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/91ovedmu4grqhjh434rq.png')" }}>
                                    </div>
                                </div>
                            </a>
                        </div>


                    </div>
                    <div className="col-lg-4 ">
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
                                        Best pick
                                    </button>
                                </li>
                            </ul>
                            {isPopular ? <TabPopularContent /> : <TabRecentContent />}
                        </div>
                    </div>

                </div>
            </div >
        </section >
    )
}
