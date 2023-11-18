import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";

function FormComment({ onSubmitComment }) {
  const [value, setValue] = useState(1);
  const [commentText, setCommentText] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = () => {
    const commentData = {
      rating: value,
      content: commentText,
    };

    onSubmitComment(commentData);
    setValue(1);
    setCommentText("");
  };

  return (
    <>
      <div
        className="card-footer py-3 border-0"
        style={{ background: "#f8f9fa" }}>
        <div className="d-flex flex-start w-100">
          <img
            className="rounded-circle shadow-1-strong me-3"
            src={
              user
                ? user.image
                : "https://tse3.mm.bing.net/th?id=OIP.ULYowpbnr0VtDEqJ6P7tfQHaHa&pid=Api&P=0&h=220"
            }
            alt="avatar"
            width="40"
            height="40"
          />
          <div className="form-outline w-100">
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>
            <textarea
              className="form-control"
              id="textAreaExample"
              rows="4"
              style={{ background: "#fff" }}
              value={commentText}
              onChange={handleCommentTextChange}></textarea>
          </div>
        </div>
        <div className="float-end mt-2 pt-1">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleSubmit}>
            Post comment
          </button>
          <button type="button" className="btn btn-outline-primary btn-sm">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default FormComment;
