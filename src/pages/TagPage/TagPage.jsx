import React, { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import Pagination from "../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNotify,
  createTagFunc,
  deleteTagFunc,
  editTagFunc,
  fetchTagsFunc,
  // selectAllTags,
  // selectTagError,
  // selectTagMessage,
} from "../../redux/TagSlice";
const PAGE_SIZE = 5;

const Tag = () => {
  const { tags, message, error } = useSelector((state) => ({
    ...state.tags,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Tag Management";

    dispatch(fetchTagsFunc());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearNotify());
    };
  }, [dispatch]);
  const [tagName, setTagName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;
    return tags.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, tags]);

  const handleEditTag = async (tagId) => {
    const newName = window.prompt("Edit tag name:");
    if (newName && newName !== "") {
      dispatch(editTagFunc({ id: tagId, data: { name: newName } }));
    }
    setTagName("");
  };

  const handleDeleteTag = async (tagId) => {
    dispatch(deleteTagFunc({ id: tagId }));
  };

  const handleCreateTag = async (event) => {
    event.preventDefault();
    dispatch(createTagFunc({ data: { name: tagName } }));
    setTagName("");
  };

  return (
    <div>
      <h1 className="text-center">Tag Management</h1>
      <div className="shadow rounded my-3 p-3">
        {message && message.length > 0 && (
          <div
            className={`alert alert-dismissible fade show ${
              error ? "alert-danger" : "alert-success"
            }`}
            role="alert"
          >
            {message.map((msg) => (
              <p key={msg}>{msg}</p>
            ))}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => dispatch(clearNotify())}
            ></button>
          </div>
        )}

        <form
          className="row d-flex justify-content-end"
          onSubmit={handleCreateTag}
        >
          <div className="col-auto">
            <input
              className="form-control"
              type="text"
              placeholder="New tag"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="col-auto">
            <Button
              type="submit"
              variant="primary"
              onClick={(e) => handleCreateTag(e)}
            >
              Add
            </Button>
          </div>
        </form>

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
              currentTableData.map((tag) => {
                return (
                  <tr key={tag.id}>
                    <td>{tag.id}</td>
                    <td style={{ wordWrap: "break-word" }}>{tag.name}</td>
                    <td style={{ wordWrap: "break-word" }}>
                      <Button
                        className="m-1"
                        variant="warning"
                        onClick={() => handleEditTag(tag.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="m-1"
                        variant="danger"
                        onClick={() => handleDeleteTag(tag.id)}
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
            totalCount={tags.length}
            pageSize={PAGE_SIZE}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Tag;
