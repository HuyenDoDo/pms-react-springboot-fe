import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getAllTags } from "../../../service/TagService";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../../service/PostService";

const initialState = {
  title: "",
  content: "",
  active: false,
  tagIds: [],
};

const initialMessage = {
  content: [],
  error: false,
};

const NewPostForm = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState(initialState);
  const [message, setMessage] = useState(initialMessage);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await handleFetchTags();
        setTags(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleFetchTags = async () => {
    const { data } = await getAllTags();
    const customTags = data.map((tag) => {
      return { ...tag, isSelected: false };
    });
    return customTags;
  };

  const handleClear = async () => {
    setTags(await handleFetchTags());
    setPost(initialState);
  };

  const handleSelectTag = (selectedTag) => {
    const updatedTags = tags.map((tag) => {
      if (tag.id === selectedTag.id) {
        tag.isSelected = !tag.isSelected;
      }
      return tag;
    });
    setTags(updatedTags);
    setSelectedTags(updatedTags.filter((tag) => tag.isSelected === true));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const savingPost = { ...post, tagIds: selectedTags.map((tag) => tag.id) };
      const response = await createPost(savingPost);
      if (response.data)
        setMessage({
          content: ["Post was created successfully"],
          error: false,
        });
      handleClear();
    } catch (error) {
      console.log(error);
      setMessage({ content: error.response.data.errors, error: true });
    }
  };

  const handleOnChange = (event) => {
    setPost((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <div>
      <h1 className="text-center">New Post</h1>
      <div className="shadow rounded my-3 p-5">
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
        <form onSubmit={handleSubmit}>
          <div className="row">
            <h2>Tags</h2>
            <div className="p-3">
              {tags.map((tag) => (
                <Button
                  key={tag.id}
                  className="p-2 m-1"
                  variant={`${tag.isSelected ? "primary" : "secondary"}`}
                  onClick={() => {
                    handleSelectTag(tag);
                  }}
                >
                  {tag.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="row">
            <h2>Form</h2>
            <div className="col-12 mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Title must have atleast 2 characters"
                name="title"
                value={post.title}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
            </div>
            <div className="col-12 mb-3">
              <label className="form-label">Content</label>
              <textarea
                className="form-control"
                placeholder="Content must have atleast 2 characters"
                rows={3}
                name="content"
                value={post.content}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              ></textarea>
            </div>
            <div className="col-12 mb-3 d-flex justify-content-end">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  checked={post.active}
                  onChange={() => setPost({ ...post, active: !post.active })}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckChecked"
                >
                  Active
                </label>
              </div>
            </div>
            <div className="col-12 mb-3 d-flex justify-content-between">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  navigate("/posts");
                }}
              >
                Go back
              </Button>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPostForm;
