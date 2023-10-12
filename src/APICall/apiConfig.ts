import axios from "axios";
import { BASE_URL } from "./baseURL";

export const getBlogPostByAuthor = (authorID: number | undefined) => {
    return axios.get(BASE_URL + "/api/v1/auth/blogPosts/getBlogPostByAuthor/" + authorID);
};

export const getPopularBlogPostByView = () => {
    return axios.get(BASE_URL + "/api/v1/auth/blogPosts/getPopularBlogPostByView");
}

export const getPopularBlogPostByVote = () => {
    return axios.get(BASE_URL + "/api/v1/auth/blogPosts/getPopularBlogPostByVote");
}