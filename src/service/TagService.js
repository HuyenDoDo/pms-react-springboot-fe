import instance from "../AxiosConfig";

const getAllTags = async () => {
  const data = await instance.get("/tags");
  return data;
};

const createTag = async (tag) => {
  const data = await instance.post("/tags", tag);
  return data;
};

const deleteTag = async (id) => {
  const data = await instance.delete(`/tags/${id}`);
  return data;
};

const editTag = async (id, tag) => {
  const data = await instance.put(`/tags/${id}`, tag);
  return data;
};

const getTagPagination = async (pageNo, pageSize, sortBy, sortDir) => {
  const data = await instance.get(
    `/tags/pagination?pageNo=${pageNo || 0}&pageSize=${pageSize || 10}&sortBy=${
      sortBy || "id"
    }&sortDir=${sortDir || "asc"}`
  );
  return data;
};
export { getAllTags, createTag, deleteTag, editTag, getTagPagination };
