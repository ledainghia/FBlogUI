import Header from "../components/Header";
import Footer from '../components/Footer';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { blog } from "../components/MainContent";

export default function BlogSingle() {
    const { idPost } = useParams<{ idPost: string }>();

    const [post, setPost] = useState<blog | null>(null);
    const [content, setContent] = useState<string | TrustedHTML>("");

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await axios.get(`https://api.fublog.tech/api/v1/auth/blogPosts/getBlogById/${idPost}`);
                setPost(response.data.data);
                setContent(response.data.data.content);
            } catch (error) {
                console.error(error);
            }
        }

        fetchPost();
    }, [idPost]);
    return (
        <>
            <Header />

            <section className="main-content mt-3">
                <div className="container-xl">


                    <div className="row gy-4 justify-content-end">
                        <div className="col-lg-1" style={{ position: "relative" }}>
                            <div className="post-actions d-flex flex-column align-items-center mx-auto " style={{ position: "fixed", top: "20vh" }}>
                                <div className="votes votes--side post-actions__vote mb-1">
                                    <button className="icon-button vote">
                                        <i aria-hidden="true" className="fa fa-caret-up"></i>
                                    </button>
                                    <div className="points text-muted" style={{
                                        display: "flex",
                                        justifyContent: "center"
                                    }}
                                    >{post?.voteCount}</div>
                                    <button className="icon-button vote">
                                        <i aria-hidden="true" className="fa fa-caret-down"></i>
                                    </button>
                                </div>
                                <div className="subscribe mb-2" >
                                    <button
                                        type="button"
                                        className="icon-button post-actions__clip el-button--default clipped"
                                        data-original-title="Bỏ bookmark bài viết này">
                                        <i className="fa fa-bookmark"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">

                            <div className="post post-single">

                                <div className="post-header">
                                    <h1 className="title mt-0 mb-3">{post?.title}</h1>
                                    <ul className="meta list-inline mb-0">
                                        <li className="list-inline-item">
                                            <a href="#"
                                            ><img
                                                    src={post?.user.picture}
                                                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                                    className="author"
                                                    alt="author"
                                                />{post?.user.fullname}</a>
                                        </li>
                                        <li className="list-inline-item"><a href="#">{post?.categoryName}</a></li>
                                        <li className="list-inline-item">{post ? new Date(post.createdDate).toLocaleDateString('vn-VN') : null}</li>
                                    </ul>
                                </div>

                                <div className="featured-image">
                                    <img src={post?.image} alt="post-title" />
                                </div>

                                <div className="post-content clearfix">
                                    <div dangerouslySetInnerHTML={{ __html: content }} />
                                </div>

                                <div className="post-bottom">
                                    <div className="row d-flex align-items-center">
                                        <div className="col-md-6 col-12 text-center text-md-start">

                                            <a href="#" className="tag">#Trending</a>
                                            <a href="#" className="tag">#Video</a>
                                            <a href="#" className="tag">#Featured</a>
                                        </div>
                                        <div className="col-md-6 col-12">

                                            <ul
                                                className="social-icons list-unstyled list-inline mb-0 float-md-end"
                                            >
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
                                    </div>
                                </div>
                            </div>

                            <div className="spacer" data-height="50"></div>

                            <div className="about-author padding-30 rounded">
                                <div className="thumb">
                                    <img src="images/other/avatar-about.png" alt="FuBlog Doe" />
                                </div>
                                <div className="details">
                                    <h4 className="name"><a href="#">FuBlog Doe</a></h4>
                                    <p>
                                        Hello, I’m a content writer who is fascinated by content
                                        fashion, celebrity and lifestyle. She helps clients bring
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

                            <div className="spacer" data-height="50"></div>


                            <div className="section-header">
                                <h3 className="section-title">Comments (3)</h3>
                                <img src="images/wave.svg" className="wave" alt="wave" />
                            </div>

                            <div className="comments bordered padding-30 rounded">
                                <ul className="comments">

                                    <li className="comment rounded">
                                        <div className="thumb">
                                            <img src="images/other/comment-1.png" alt="John Doe" />
                                        </div>
                                        <div className="details">
                                            <h4 className="name"><a href="#">John Doe</a></h4>
                                            <span className="date">Jan 08, 2021 14:41 pm</span>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                Etiam vitae odio ut tortor fringilla cursus sed quis
                                                odio.
                                            </p>
                                            <a href="#" className="btn btn-default btn-sm">Reply</a>
                                        </div>
                                    </li>

                                    <li className="comment child rounded">
                                        <div className="thumb">
                                            <img src="images/other/comment-2.png" alt="John Doe" />
                                        </div>
                                        <div className="details">
                                            <h4 className="name"><a href="#">Helen Doe</a></h4>
                                            <span className="date">Jan 08, 2021 14:41 pm</span>
                                            <p>
                                                Maecenas tempus, tellus eget condimentum rhoncus, sem
                                                quam semper libero, sit amet adipiscing sem neque sed
                                                ipsum.
                                            </p>
                                            <a href="#" className="btn btn-default btn-sm">Reply</a>
                                        </div>
                                    </li>

                                    <li className="comment rounded">
                                        <div className="thumb">
                                            <img src="images/other/comment-3.png" alt="John Doe" />
                                        </div>
                                        <div className="details">
                                            <h4 className="name"><a href="#">Anna Doe</a></h4>
                                            <span className="date">Jan 08, 2021 14:41 pm</span>
                                            <p>
                                                Cras ultricies mi eu turpis hendrerit fringilla.
                                                Vestibulum ante ipsum primis in faucibus orci luctus et
                                                ultrices posuere cubilia.
                                            </p>
                                            <a href="#" className="btn btn-default btn-sm">Reply</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="spacer" data-height="50"></div>

                            <div className="section-header">
                                <h3 className="section-title">Leave Comment</h3>
                                <img src="images/wave.svg" className="wave" alt="wave" />
                            </div>

                            <div className="comment-form rounded bordered padding-30">
                                <form id="comment-form" className="comment-form" method="post">
                                    <div className="messages"></div>

                                    <div className="row">
                                        <div className="column col-md-12">

                                            <div className="form-group">
                                                <textarea
                                                    name="InputComment"
                                                    id="InputComment"
                                                    className="form-control"
                                                    rows={4}
                                                    placeholder="Your comment here..."
                                                    required={true}
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="column col-md-6">

                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="InputEmail"
                                                    name="InputEmail"
                                                    placeholder="Email address"
                                                    required={true}
                                                />
                                            </div>
                                        </div>

                                        <div className="column col-md-6">

                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="InputWeb"
                                                    id="InputWeb"
                                                    placeholder="Website"
                                                    required={true}
                                                />
                                            </div>
                                        </div>

                                        <div className="column col-md-12">

                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="InputName"
                                                    name="InputName"
                                                    placeholder="Your name"
                                                    required={true}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        name="submit"
                                        id="submit"
                                        value="Submit"
                                        className="btn btn-default"
                                    >
                                        Submit</button>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-4">

                            <div className="sidebar">

                                <div className="widget rounded">
                                    <div className="widget-header text-center">
                                        <h3 className="widget-title">Mục lục</h3>
                                        <img src="images/wave.svg" className="wave" alt="wave" />
                                    </div>
                                    <div className="widget-content">
                                        <ul className="list">
                                            <li>
                                                <ul className="sublist">
                                                    Heading 1
                                                    <li>sub heading 1</li>
                                                    <li>sub heading 2</li>
                                                    <li>sub heading 3</li>
                                                    <li>sub heading 4</li>
                                                </ul>
                                                <ul className="sublist">
                                                    Heading 2
                                                    <li>sub heading 1</li>
                                                    <li>sub heading 2</li>
                                                    <li>sub heading 3</li>
                                                    <li>sub heading 4</li>
                                                </ul>
                                                <ul className="sublist">
                                                    Heading 3
                                                    <li>sub heading 1</li>
                                                    <li>sub heading 2</li>
                                                    <li>sub heading 3</li>
                                                    <li>sub heading 4</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>


                                <div className="widget rounded">
                                    <div className="widget-header text-center">
                                        <h3 className="widget-title">Popular Posts</h3>
                                        <img src="images/wave.svg" className="wave" alt="wave" />
                                    </div>
                                    <div className="widget-content">

                                        <div className="post post-list-sm circle">
                                            <div className="thumb circle">
                                                <span className="number">1</span>
                                                <a href="blog-single.html">
                                                    <div className="inner">
                                                        <img
                                                            src="images/posts/tabs-1.jpg"
                                                            alt="post-title"
                                                        />
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="details clearfix">
                                                <h6 className="post-title my-0">
                                                    <a href="blog-single.html">Your choice. Your world</a>
                                                </h6>
                                                <ul className="meta list-inline mt-1 mb-0">
                                                    <li className="list-inline-item">29 March 2021</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="post post-list-sm circle">
                                            <div className="thumb circle">
                                                <span className="number">2</span>
                                                <a href="blog-single.html">
                                                    <div className="inner">
                                                        <img
                                                            src="images/posts/tabs-2.jpg"
                                                            alt="post-title"
                                                        />
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="details clearfix">
                                                <h6 className="post-title my-0">
                                                    <a href="blog-single.html"
                                                    >An Incredibly Easy Method That Works For All</a>
                                                </h6>
                                                <ul className="meta list-inline mt-1 mb-0">
                                                    <li className="list-inline-item">29 March 2021</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="post post-list-sm circle">
                                            <div className="thumb circle">
                                                <span className="number">3</span>
                                                <a href="blog-single.html">
                                                    <div className="inner">
                                                        <img
                                                            src="images/posts/tabs-3.jpg"
                                                            alt="post-title"
                                                        />
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="details clearfix">
                                                <h6 className="post-title my-0">
                                                    <a href="blog-single.html"
                                                    >10 Ways To Immediately Start Selling Furniture</a>
                                                </h6>
                                                <ul className="meta list-inline mt-1 mb-0">
                                                    <li className="list-inline-item">29 March 2021</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>


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




                                <div className="widget rounded">
                                    <div className="widget-header text-center">
                                        <h3 className="widget-title">Celebration</h3>
                                        <img src="images/wave.svg" className="wave" alt="wave" />
                                    </div>
                                    <div className="widget-content">
                                        <div className="post-carousel-widget">

                                            <div className="post post-carousel">
                                                <div className="thumb rounded">
                                                    <a
                                                        href="category.html"
                                                        className="category-badge position-absolute"
                                                    >How to</a>
                                                    <a href="blog-single.html">
                                                        <div className="inner">
                                                            <img
                                                                src="images/widgets/widget-carousel-1.jpg"
                                                                alt="post-title"
                                                            />
                                                        </div>
                                                    </a>
                                                </div>
                                                <h5 className="post-title mb-0 mt-4">
                                                    <a href="blog-single.html"
                                                    >5 Easy Ways You Can Turn Future Into Success</a>
                                                </h5>
                                                <ul className="meta list-inline mt-2 mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#">FuBlog Doe</a>
                                                    </li>
                                                    <li className="list-inline-item">29 March 2021</li>
                                                </ul>
                                            </div>

                                            <div className="post post-carousel">
                                                <div className="thumb rounded">
                                                    <a
                                                        href="category.html"
                                                        className="category-badge position-absolute"
                                                    >Trending</a>
                                                    <a href="blog-single.html">
                                                        <div className="inner">
                                                            <img
                                                                src="images/widgets/widget-carousel-2.jpg"
                                                                alt="post-title"
                                                            />
                                                        </div>
                                                    </a>
                                                </div>
                                                <h5 className="post-title mb-0 mt-4">
                                                    <a href="blog-single.html"
                                                    >Master The Art Of Nature With These 7 Tips</a>
                                                </h5>
                                                <ul className="meta list-inline mt-2 mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#">FuBlog Doe</a>
                                                    </li>
                                                    <li className="list-inline-item">29 March 2021</li>
                                                </ul>
                                            </div>

                                            <div className="post post-carousel">
                                                <div className="thumb rounded">
                                                    <a
                                                        href="category.html"
                                                        className="category-badge position-absolute"
                                                    >How to</a>
                                                    <a href="blog-single.html">
                                                        <div className="inner">
                                                            <img
                                                                src="images/widgets/widget-carousel-1.jpg"
                                                                alt="post-title"
                                                            />
                                                        </div>
                                                    </a>
                                                </div>
                                                <h5 className="post-title mb-0 mt-4">
                                                    <a href="blog-single.html"
                                                    >5 Easy Ways You Can Turn Future Into Success</a>
                                                </h5>
                                                <ul className="meta list-inline mt-2 mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#">FuBlog Doe</a>
                                                    </li>
                                                    <li className="list-inline-item">29 March 2021</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="slick-arrows-bot">
                                            <button
                                                type="button"
                                                data-role="none"
                                                className="carousel-botNav-prev slick-custom-buttons"
                                                aria-label="Previous"
                                            >
                                                <i className="icon-arrow-left"></i>
                                            </button>
                                            <button
                                                type="button"
                                                data-role="none"
                                                className="carousel-botNav-next slick-custom-buttons"
                                                aria-label="Next"
                                            >
                                                <i className="icon-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>




                                <div className="widget rounded">
                                    <div className="widget-header text-center">
                                        <h3 className="widget-title">Tag Clouds</h3>
                                        <img src="images/wave.svg" className="wave" alt="wave" />
                                    </div>
                                    <div className="widget-content">
                                        <a href="#" className="tag">#Trending</a>
                                        <a href="#" className="tag">#Video</a>
                                        <a href="#" className="tag">#Featured</a>
                                        <a href="#" className="tag">#Gallery</a>
                                        <a href="#" className="tag">#Celebrities</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
