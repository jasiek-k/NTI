import { getRequest, postRequest } from "./apiService";

const newsRoute = "/news";
const commentsRoute = "/comments";
const postRoute = "/post";

export const getAllPosts = async () => {
  const posts = await getRequest(newsRoute);

  return posts;
};

export const addNewComment = async (data) => {
  await postRequest(commentsRoute, data);
};

export const addNewPost = async (data) => {
  await postRequest(postRoute, data);
};
