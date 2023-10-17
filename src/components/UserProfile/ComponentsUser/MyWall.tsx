import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import {
  getBlogPostByAuthor,
  getCountViewOfBlogByUser,
  getCountPostMarkByUser,
  getUserInfor,
  getFollowerCount,
  getFollowingCount,
} from "../../../APICall/apiConfig";
import { userLogin } from "../../../store/store";
import { blog, extractTextFromHtml, theme } from "../../MainContent";
import { PostPreview2 } from "../../PostPreview";
import defaultAvatar from "../../../assets/images/default-avatar.png";

import { getUserFromLocalStorage } from "../../../constants/userLocal";
export default function MyWall() {
  const userCurrent: userLogin | null = getUserFromLocalStorage();
  const [blogPost, setBlogPost] = useState<blog[] | null>(null);
  const [followerCount, setFollowerCount] = useState<number | null>(null);
  const [followingCount, setFollowingCount] = useState<number | null>(null);
  const userID = userCurrent?.id.toString();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [countViewOfBlog, setCountViewOfBlog] = useState<number>(0);
  const [countPostMark, setCountPostMark] = useState<number>(0);
  let limitPostPerPage = 5;
  const [blogPostsCount, setBlogPostsCount] = useState<number>(0);
  const [user, setUser] = useState<userLogin | null>(null);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    event.preventDefault();
    setPage(value);
  };

  useEffect(() => {
    getBlogPostByAuthor(userID, page.toString(), limitPostPerPage.toString())
      .then((response) => {
        setBlogPost(response.data.data.dtoList);
        console.log("dataBlog", response.data);
        setBlogPostsCount(response.data.data.elementCount);
        setTotalPages(
          Math.ceil(response.data.data.elementCount / limitPostPerPage)
        );
      })
      .catch((error) => {
        console.log(error);
      });
    getCountViewOfBlogByUser(userID)
      .then((response) => {
        console.log("getCountViewOfBlog", response.data);
        setCountViewOfBlog(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    getCountPostMarkByUser(userID)
      .then((response) => {
        console.log("getCountPostMarkByUser", response.data);
        setCountPostMark(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getUserInfor(userID)
      .then((response) => {
        console.log("getUserInfor", response.data);
        setUser(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [
    setBlogPost,
    userID,
    page,
    setTotalPages,
    setCountViewOfBlog,
    setCountPostMark,
    setBlogPostsCount,
    setUser,
  ]);

  useEffect(() => {
    getFollowerCount(userID)
      .then((response) => {
        console.log("getFollowerCount", response.data.data);
        setFollowerCount(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setFollowerCount, userID]);

  useEffect(() => {
    getFollowingCount(userID)
      .then((response) => {
        console.log("getFollowerCount", response.data.data);
        setFollowingCount(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setFollowingCount, userID]);

  return (
    <>
      <section className="main-content">
        <div className="container-xl">
          <div className="row gy-4">
            <div className="col-md-7">
              <div className="row gy-4">
                {blogPost ? null : (
                  <div
                    className="col-md-12"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="loader"></div> <h5>Loading...</h5>
                  </div>
                )}
                {blogPost && blogPost.length === 0 ? (
                  <div
                    className="col-md-12"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h5>Không có bài viết nào</h5>
                  </div>
                ) : null}
                {blogPost &&
                  blogPost.length > 0 &&
                  blogPost.map((post) => (
                    <div
                      className="col-sm-12 col-md-12 col-xl-12"
                      key={post.postId}
                    >
                      {/* <!-- post --> */}

                      <div className="post post-grid rounded bordered">
                        <div className="thumb top-rounded">
                          <a
                            href="category.html"
                            className="category-badge position-absolute"
                          >
                            {post.typePost}
                          </a>
                          <span className="post-format">
                            <i className="icon-picture"></i>
                          </span>
                          <Link to={`/blog/${post.postId}`}>
                            <div className="inner">
                              <img
                                style={{
                                  width: "100%",
                                  height: "325px",
                                  objectFit: "cover",
                                }}
                                src={post?.image}
                                alt="post-title"
                              />
                            </div>
                          </Link>
                        </div>
                        <div className="details">
                          {userCurrent &&
                          userCurrent.id != post.user.id ? null : (
                            <a
                              href="#"
                              className="btn btn-outline-danger btn-sm float-end"
                            >
                              Xóa
                            </a>
                          )}
                          <ul className="meta list-inline mb-0">
                            <li className="list-inline-item">
                              <a href="#">
                                <img
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                  }}
                                  src={post.user.image}
                                  className="author"
                                  alt="author"
                                />
                                {post?.user.fullName}
                              </a>
                            </li>
                            <li className="list-inline-item">
                              {new Date(post.createdDate).toLocaleDateString(
                                "vn-VN"
                              )}
                            </li>
                          </ul>
                          <h5 className="post-title mb-3 mt-3">
                            <Link to={`/blog/${post.postId}`}>
                              {post.title}
                            </Link>
                          </h5>
                          <p className="excerpt mb-0">
                            <PostPreview2
                              content={extractTextFromHtml(post.content)}
                              maxLength={100}
                            />
                          </p>
                        </div>
                        <div className="post-bottom clearfix d-flex align-items-center">
                          <div className="social-share me-auto">
                            <button className="toggle-button icon-share"></button>
                          </div>
                          <div className="more-button float-end">
                            <a href="blog-single.html">
                              <span className="icon-options"></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="mt-4"></div>
              <ThemeProvider theme={theme}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  style={{ display: "flex", justifyContent: "center" }}
                  variant="outlined"
                  shape="rounded"
                />
              </ThemeProvider>
            </div>
            <div className="col-md-5">
              {/* <!-- sidebar --> */}
              <div className="sidebar">
                {/* <!-- widget about -->

                <!-- widget popular posts -->

                <!-- widget categories --> */}
                <div className="widget rounded">
                  <div className="widget-content text-center">
                    <a className="navbar-brand" href="personal.html">
                      <img src={user ? user.image : defaultAvatar} alt="logo" />
                    </a>
                    <a href="personal.html" className="d-block text-logo mt-1">
                      {user && user.fullName}
                      <span className="dot">.</span>
                    </a>
                    <span className="slogan d-block">
                      {user && user.email}{" "}
                      <strong>
                        {" "}
                        {user &&
                          user.roles.map((index) => (
                            <span key={index}> | {index}</span>
                          ))}
                      </strong>
                    </span>
                  </div>
                </div>
                <div className="widget rounded">
                  <div className="widget-content">
                    <ul className="list" style={{ listStyle: "none" }}>
                      <li>
                        <a href="#">Tổng số lượt xem bài viết</a>
                        <span>({countViewOfBlog})</span>
                      </li>
                      <li>
                        <a href="#">Đang theo dõi các người dùng</a>
                        <span>({followingCount})</span>
                      </li>
                      <li>
                        <a href="#">Các người dùng đang theo dõi</a>
                        <span>({followerCount})</span>
                      </li>
                      <li>
                        <a href="#">Bài viết</a>
                        <span>({blogPostsCount})</span>
                      </li>
                      <li>
                        <a href="#">Bookmark</a>
                        <span>({countPostMark})</span>
                      </li>
                      <li>
                        <a href="#">Tổng số câu hỏi</a>
                        <span>(3)</span>
                      </li>
                      <li>
                        <a href="#">Tổng số câu trả lời</a>
                        <span>(3)</span>
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
                    <a href="#" className="tag">
                      #Trending
                    </a>
                    <a href="#" className="tag">
                      #Video
                    </a>
                    <a href="#" className="tag">
                      #Featured
                    </a>
                    <a href="#" className="tag">
                      #Gallery
                    </a>
                    <a href="#" className="tag">
                      #Celebrities
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
