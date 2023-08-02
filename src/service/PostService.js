import instance from "../AxiosConfig";

const getAllPosts = async () => {
  const data = await instance.get("/posts");
  return data;
};

const createPost = async (post) => {
  const data = await instance.post("/posts", post);
  return data;
};

const deletePost = async (id) => {
  const data = await instance.delete(`/posts/${id}`);
  return data;
};

const editPost = async (id, post) => {
  const data = await instance.put(`/posts/${id}`, post);
  return data;
};

const getPostById = async (id) => {
  const data = await instance.get(`/posts/${id}`);
  return data;
};

export { getAllPosts, getPostById, createPost, deletePost, editPost };
