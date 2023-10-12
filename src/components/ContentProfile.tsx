import { useUserStore } from "../store/store";
import defaultAvatar from '../assets/images/default-avatar.png';
import { useEffect, useState } from "react";
import { getBlogPostByAuthor } from "../APICall/apiConfig";
import { blog, extractTextFromHtml } from "./MainContent";

import { PostPreview2 } from "./PostPreview";

export default function ContentProfile() {
    const { user } = useUserStore();
    const [blogPost, setBlogPost] = useState<blog[]>([]);
    useEffect(() => {
        console.log("user", user?.id);
        getBlogPostByAuthor(user?.id)
            .then((response) => {
                setBlogPost(response.data.data);
                console.log("dataBlog", response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });

    }, [setBlogPost]);

    return (
        <section className="main-content">
            <div className="container-xl">
                <div className="row gy-4">
                    <div className="col-lg-8">
                        <div className="row gy-4">


                            {blogPost && blogPost.map(post => (
                                <div className="col-sm-6">
                                    {/* <!-- post --> */}

                                    <div className="post post-grid rounded bordered">
                                        <div className="thumb top-rounded">
                                            <a
                                                href="category.html"
                                                className="category-badge position-absolute"
                                            >{post.typePost}</a>
                                            <span className="post-format">
                                                <i className="icon-picture"></i>
                                            </span>
                                            <a href="blog-single.html">
                                                <div className="inner">
                                                    <img
                                                        style={{ width: "356px", height: "238px" }}
                                                        src={post?.image}
                                                        alt="post-title"
                                                    />
                                                </div>
                                            </a>
                                        </div>
                                        <div className="details">
                                            <ul className="meta list-inline mb-0">
                                                <li className="list-inline-item">
                                                    <a href="#"
                                                    ><img
                                                            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                                            src={post.user.picture}
                                                            className="author"
                                                            alt="author"
                                                        />{post?.user.fullname}</a>
                                                </li>
                                                <li className="list-inline-item">{new Date(post.createdDate).toLocaleDateString("vn-VN")}</li>
                                            </ul>
                                            <h5 className="post-title mb-3 mt-3">
                                                <a href="blog-single.html"
                                                >{post.title}</a>
                                            </h5>
                                            <p className="excerpt mb-0">
                                                <PostPreview2 content={extractTextFromHtml(post.content)} maxLength={100} />
                                            </p>
                                        </div>
                                        <div className="post-bottom clearfix d-flex align-items-center">
                                            <div className="social-share me-auto">
                                                <button className="toggle-button icon-share"></button>

                                            </div>
                                            <div className="more-button float-end">
                                                <a href="blog-single.html"
                                                ><span className="icon-options"></span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}




                        </div>

                        <nav>
                            <ul className="pagination justify-content-center">
                                <li className="page-item active" aria-current="page">
                                    <span className="page-link">1</span>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-4">
                        {/* <!-- sidebar --> */}
                        <div className="sidebar">
                            {/* <!-- widget about -->

                <!-- widget popular posts -->

                <!-- widget categories --> */}
                            <div className="widget rounded">
                                <div className="widget-content text-center">
                                    <a className="navbar-brand" href="personal.html"
                                    ><img src={user?.picture ? user?.picture : defaultAvatar} alt="logo"
                                        /></a>
                                    <a href="personal.html" className="d-block text-logo"
                                    >{user?.fullname}<span className="dot">.</span></a>
                                    <span className="slogan d-block"
                                    >
                                        {user?.email} <strong> {user?.roles.map((index) => (
                                            <span key={index}> | {index}</span>
                                        ))}
                                        </strong></span>
                                </div>
                            </div>
                            <div className="widget rounded">
                                <div className="widget-content">
                                    <ul className="list" style={{ listStyle: "none" }}>
                                        <li>
                                            <a href="#">Tổng số lượt xem bài viết</a><span>(5)</span>
                                        </li>
                                        <li>
                                            <a href="#">Đang theo dõi các người dùng</a><span>(2)</span>
                                        </li>
                                        <li>
                                            <a href="#">Các người dùng đang theo dõi</a><span>(4)</span>
                                        </li>
                                        <li><a href="#">Bài viết</a><span>(1)</span></li>
                                        <li><a href="#">Bookmark</a><span>(7)</span></li>
                                        <li><a href="#">Tổng số câu hỏi</a><span>(3)</span></li>
                                        <li>
                                            <a href="#">Tổng số câu trả lời</a><span>(3)</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* <!-- widget newsletter -->

                <!-- widget post carousel -->

                <!-- widget advertisement -->

                <!-- widget tags --> */}
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
    )
}
