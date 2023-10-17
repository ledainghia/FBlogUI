import axios from "axios";
import { BASE_URL } from "./baseURL";

export const getBlogPostByAuthor = (
  authorID: string | undefined,
  page: string,
  size: string
) => {
  return axios.get(
    BASE_URL +
      "/api/v1/auth/blogPosts/getBlogPostByAuthor/" +
      authorID +
      "/" +
      page +
      "/" +
      size
  );
};

export const getUserInfor = (authorID: string | undefined) => {
  return axios.get(BASE_URL + "/api/v1/auth/user/getUser/" + authorID);
};

export const getPopularBlogPostByView = () => {
  return axios.get(
    BASE_URL + "/api/v1/auth/blogPosts/getPopularBlogPostByView"
  );
};

export const getPopularBlogPostByVote = () => {
  return axios.get(
    BASE_URL + "/api/v1/auth/blogPosts/getPopularBlogPostByVote"
  );
};

export const getFollowerCount = (authorID: string | undefined) => {
  return axios.get(BASE_URL + "/api/v1/auth/user/follower/count/" + authorID);
};

export const getFollowingCount = (authorID: string | undefined) => {
  return axios.get(BASE_URL + "/api/v1/auth/user/following/count/" + authorID);
};

export const getCountViewOfBlogByUser = (authorID: string | undefined) => {
  return axios.get(BASE_URL + "/api/v1/auth/user/countViewOfBlog/" + authorID);
};
export const getCountPostMarkByUser = (authorID: string | undefined) => {
  return axios.get(
    BASE_URL + "/api/v1/auth/user/countPostMarkByUser/" + authorID
  );
};

export const getNoticationByUser = (authorID: string | undefined) => {
  return axios.get(BASE_URL + "/notification/" + authorID);
};

export const checkFollow = (
  followerID: string | undefined,
  followingID: string | undefined
) => {
  return axios.post(BASE_URL + "/api/v1/auth/user/checkFollowAction", {
    followerID,
    followingID,
  });
};
