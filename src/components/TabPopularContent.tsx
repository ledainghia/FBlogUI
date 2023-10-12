import { useState, useEffect } from "react";
import { getPopularBlogPostByView } from "../APICall/apiConfig";
import { blog } from "./MainContent";

export default function TabPopularContent() {
    const [popularBlogPostByView, setPopularBlogPostByView] = useState<blog[] | null>(null);

    useEffect(() => {

        getPopularBlogPostByView()
            .then((response) => {
                console.log("getPopularBlogPostByView", response.data.data)

                setPopularBlogPostByView(response.data.data.slice(0, 5));
            })
            .catch((error) => {
                console.log(error);
            });

    }, [setPopularBlogPostByView]);
    return (
        <div className="tab-content" id="postsTabContent">



            <div className="tab-pane fade show active" >
                {popularBlogPostByView && popularBlogPostByView.map(post => (
                    <div className="post post-list-sm circle" key={post.postId}>
                        <div className="thumb circle">
                            <a href="blog-single.html">
                                <div className="inner">
                                    <img style={{ width: "50px", height: "50px" }}
                                        src={post?.image}
                                        alt="post-title" />
                                </div>
                            </a>
                        </div>
                        <div className="details clearfix">
                            <h6 className="post-title my-0">
                                <a href="blog-single.html">{post.title}</a>
                            </h6>
                            <ul className="meta list-inline mt-1 mb-0">
                                <li className="list-inline-item">{post.user.fullName}</li>
                                <li className="list-inline-item">{post ? new Date(post.createdDate).toLocaleDateString('vn-VN') : null}</li>
                            </ul>
                        </div>
                    </div>

                ))}

                {popularBlogPostByView ? null : <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><div className="loader" ></div> <h5>Loading...</h5></div>}

            </div>


        </div>

    )
}
