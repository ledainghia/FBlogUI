import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from '@mui/material/Pagination';
import { orange } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PostPreview from "./PostPreview";
import { Link } from "react-router-dom";
import EstimatedReadingTime from './EstimatedReadingTime';



export const theme = createTheme({
    palette: {
        primary: {
            main: orange[300],
            light: orange[300],
            dark: orange[300],


        },
        secondary: {
            main: orange[200],
        },
    },



});
interface userLogin {
    id: number,
    user: string,
    email: string,
    role: string,
    roles: [],
    fullName: string,
    image: string,

}
interface tagList {
    tagId: number,
    tagName: string,
}
export interface blog {
    typePost: string,
    title: string,
    content: string,
    categoryName: string,
    createdDate: string,
    modifiedDate: Date,
    approvedBy: number,
    status: boolean,
    isApproved: boolean,
    image: string,
    views: number,
    voteCount: number,
    postComments: [],
    tagList: tagList[],
    postId: number,
    user: userLogin,
    blogPostCount: number,
    commentCount: number,


}

export function extractTextFromHtml(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const elements = doc.querySelectorAll("h2, div, p, span, h1, h3, h4, h5, h6, ul, li, a, img, iframe, blockquote, pre");
    let text = "";
    for (let i = 0; i < elements.length; i++) {
        text += elements[i].textContent + " ";
    }
    return text.trim();
}

export default function MainContent() {
    let allBlogPosts: blog[] | null = null;

    const [posts, setPosts] = useState<blog[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    let limitPostPerPage = 5;



    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        event.preventDefault();
        setPage(value);
    };


    useEffect(() => {
        axios.get(`https://api.fublog.tech/api/v1/auth/blogPosts/getAllBlog/${page}/${limitPostPerPage}`)
            .then((response) => {
                allBlogPosts = response.data.data.dtoList;
                console.log("allBlogPosts", allBlogPosts)
                const blogPostsCount: number = response.data.data.elementCount;;
                console.log("blogPostsCount", response.data);
                if (allBlogPosts) {
                    const blogPosts = allBlogPosts.map((allBlogPosts: blog) => {
                        let date: Date = new Date(allBlogPosts.createdDate);
                        const month = date.toLocaleString('vn-vn', { day: '2-digit', month: 'long', year: 'numeric' });
                        allBlogPosts.createdDate = month;
                        allBlogPosts.content = extractTextFromHtml(allBlogPosts.content);
                        return allBlogPosts;
                    })

                    setPosts(blogPosts);
                    setTotalPages(Math.ceil(blogPostsCount / limitPostPerPage));
                    console.log(blogPostsCount)
                }

            })
    }, [page])





    return (
        <section className="main-content">
            <div className="container-fluid">
                <div className="row gy-4">
                    <div className="col-lg-9">
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
                                    <div className="col-md-12 col-sm-6" key={post.postId}>
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
                                                        <Link to={`/profile/${post.user.id}`}><img src={post.user ? post.user.image : ""} className="author" alt="author" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />{post.user ? post.user.fullName : ""}</Link>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#">{post.typePost}</a>
                                                    </li>
                                                    <li className="list-inline-item">{post.createdDate}</li>
                                                    <EstimatedReadingTime articleText={post.content} />
                                                </ul>
                                                <h5 className="post-title">
                                                    <Link to={`/blog/${post.postId}`}>{post.title}</Link>
                                                </h5>
                                                <PostPreview content={post.content} maxLength={400} />
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

                            <ThemeProvider theme={theme}>
                                <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" style={{ display: "flex", justifyContent: "center" }} variant="outlined" shape="rounded" />
                            </ThemeProvider>

                        </div>
                    </div>
                    <div className="col-lg-3">
                        {/* <!-- sidebar --> */}
                        <div className="sidebar">
                            {/* <!-- widget about --> */}
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
