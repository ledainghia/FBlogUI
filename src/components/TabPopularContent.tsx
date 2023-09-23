
export default function TabPopularContent() {
    return (
        <div className="tab-content" id="postsTabContent">

            <div className="lds-dual-ring"></div>

            <div className="tab-pane fade show active" >

                <div className="post post-list-sm circle">
                    <div className="thumb circle">
                        <a href="blog-single.html">
                            <div className="inner">
                                <img style={{ width: "50px", height: "50px" }}
                                    src="https://4.bp.blogspot.com/-ou-a_Aa1t7A/W6IhNc3Q0gI/AAAAAAAAD6Y/pwh44arKiuM_NBqB1H7Pz4-7QhUxAgZkACLcBGAs/s1600/spring-boot-logo.png"
                                    alt="post-title" />
                            </div>
                        </a>
                    </div>
                    <div className="details clearfix">
                        <h6 className="post-title my-0">
                            <a href="blog-single.html">Series làm chủ Spring Boot, từ Zero to Hero</a>
                        </h6>
                        <ul className="meta list-inline mt-1 mb-0">
                            <li className="list-inline-item">29 March 2021</li>
                        </ul>
                    </div>
                </div>

                <div className="post post-list-sm circle">
                    <div className="thumb circle">
                        <a href="blog-single.html">
                            <div className="inner">
                                <img
                                    src="data:image/png;base64,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"
                                    alt="post-title" />
                            </div>
                        </a>
                    </div>
                    <div className="details clearfix">
                        <h6 className="post-title my-0">
                            <a href="blog-single.html">Javascript Nâng Cao</a>
                        </h6>
                        <ul className="meta list-inline mt-1 mb-0">
                            <li className="list-inline-item">29 March 2021</li>
                        </ul>
                    </div>
                </div>

                <div className="post post-list-sm circle">
                    <div className="thumb circle">
                        <a href="blog-single.html">
                            <div className="inner">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqYfbaJ3eCkft5cB1BjSSN8pwLqODTGLTqOXQyIUhvWQSVSPgyG6bI5iH4S3mCVPdIV7w&usqp=CAU"
                                    alt="post-title" />
                            </div>
                        </a>
                    </div>
                    <div className="details clearfix">
                        <h6 className="post-title my-0">
                            <a href="blog-single.html">Cách để trở thành trùm JS</a>
                        </h6>
                        <ul className="meta list-inline mt-1 mb-0">
                            <li className="list-inline-item">29 March 2021</li>
                        </ul>
                    </div>
                </div>

                <div className="post post-list-sm circle">
                    <div className="thumb circle">
                        <a href="blog-single.html">
                            <div className="inner">
                                <img src="images/posts/tabs-4.jpg" alt="post-title" />
                            </div>
                        </a>
                    </div>
                    <div className="details clearfix">
                        <h6 className="post-title my-0">
                            <a href="blog-single.html">Cách trở thành lập trình viên lương 10 số</a>
                        </h6>
                        <ul className="meta list-inline mt-1 mb-0">
                            <li className="list-inline-item">29 March 2021</li>
                        </ul>
                    </div>
                </div>
            </div>


        </div>

    )
}
