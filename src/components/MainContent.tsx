import axios from "axios";
import { useState, useEffect } from "react";

interface userLogin {
    user: string,
    email: string,
    role: [],
    fullName: string,
    picture: string,

}
interface blog {
    typePost: string,
    title: string,
    content: string,
    createdDate: string,
    modifiedDate: Date,
    approvedBy: number,
    status: boolean,
    isApproved: boolean,
    image: string,
    views: number,
    votes: number,
    postComments: [],
    postTags: [],
    id: number,
    user: userLogin,
}

export default function MainContent() {
    let allBlogPosts: blog[] | null = null;
    const [posts, setPosts] = useState<blog[] | null>(null);
    useEffect(() => {
        axios.get("https://api.fublog.tech/api/v1/auth/blogPosts/getAllBlog/1/7")
            .then((response) => {
                allBlogPosts = response.data;
                if (allBlogPosts) {
                    allBlogPosts.map((allBlogPosts: blog) => {
                        let date: Date = new Date(allBlogPosts.createdDate);
                        const month = date.toLocaleString('vn-vn', { day: '2-digit', month: 'long', year: 'numeric' });
                        allBlogPosts.createdDate = month;
                    })
                    setPosts(response.data);
                }

            })
    }, [setPosts])

    return (
        <section className="main-content">
            <div className="container-fluid">
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
                                {posts && posts.map(post => (
                                    <div className="col-md-12 col-sm-6" key={post.id}>
                                        {/* <!-- post --> */}
                                        <div className="post post-list clearfix">
                                            <div className="thumb rounded">

                                                <a href="blog-single.html">
                                                    <div className="inner">
                                                        <img src={post.image} style={{ width: "256px", height: "200px" }} alt="post-title" />
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="details">
                                                <ul className="meta list-inline mb-3">
                                                    <li className="list-inline-item">
                                                        <a href="#"><img src={post.user ? post.user.picture : ""} className="author" alt="author" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />{post.user ? post.user.fullName : ""}</a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#">{post.typePost}</a>
                                                    </li>
                                                    <li className="list-inline-item">{post.createdDate}</li>
                                                </ul>
                                                <h5 className="post-title">
                                                    <a href="blog-single.html">{post.title}</a>
                                                </h5>
                                                <p className="excerpt mb-0">
                                                    {post.content}
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
                                ))}



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
