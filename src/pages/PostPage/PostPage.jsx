import React, { useEffect, useMemo, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deletePost, getAllPosts } from "../../service/PostService";

const PAGE_SIZE = 5;

const initialMessage = {
  content: [],
  error: false,
};

const PostPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState(initialMessage);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;
    return posts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, posts]);

  useEffect(() => {
    document.title = "Post Management";
    const fetchData = async () => {
      try {
        const response = await handleGetPosts();
        setPosts(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleGetPosts = async () => {
    try {
      const { data } = await getAllPosts();
      return data.sort((a, b) => {
        return b.id - a.id;
      });
    } catch (error) {
      console.log(error);
    }
    return [];
  };

  const handleDelete = async (postId) => {
    try {
      if (
        window.confirm(`Do you want to delete this post with id: ${postId}?`)
      ) {
        const { data } = await deletePost(postId);
        if (data) {
          window.alert("Delete successfully");
          setPosts(await handleGetPosts());
        }
      }
    } catch (error) {
      console.log(error);
      setMessage({ content: error.response.data.errors, error: true });
    }
  };

  return (
    <div>
      <h1 className="text-center">Post Management</h1>
      <div className="shadow rounded my-3 p-3">
        <div className="row d-flex justify-content-end">
          <div className="col-auto">
            <Button onClick={() => navigate(`/posts/new`)} variant="primary">
              Create New Post
            </Button>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          {message.content.length > 0 && (
            <div
              className={`alert alert-dismissible fade show ${
                message.error ? "alert-danger" : "alert-success"
              }`}
              role="alert"
            >
              {message.content.map((msg) => (
                <p key={msg}>{msg}</p>
              ))}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setMessage(initialMessage)}
              ></button>
            </div>
          )}
        </div>
        <table className="table table-hover" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData &&
              currentTableData.length > 0 &&
              currentTableData.map((post) => {
                return (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td style={{ wordWrap: "break-word" }}>{post.title}</td>
                    <td style={{ wordWrap: "break-word" }}>
                      <Button
                        className="m-1"
                        variant="warning"
                        onClick={() => navigate(`/posts/${post.id}/edit`)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="m-1"
                        variant="danger"
                        onClick={() => {
                          handleDelete(post.id);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          <Pagination
            currentPage={currentPage}
            totalCount={posts.length}
            pageSize={PAGE_SIZE}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
