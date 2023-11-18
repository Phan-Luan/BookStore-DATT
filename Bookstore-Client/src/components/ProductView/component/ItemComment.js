import React from "react";
import { Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

function ItemComment({ content }) {
  return (
    <>
      <div className="card-body">
        <div className="d-flex flex-start">
          <img
            className="rounded-circle shadow-1-strong me-3"
            src={content.user.image}
            alt="avatar"
            width="60"
            height="60"
          />
          <div>
            <h6 className="fw-bold text-primary mb-1">{content.user.name}</h6>
            <p className="text-muted small mb-0">
              Shared publicly - {content.created_at}
            </p>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating name="read-only" value={content.rating} readOnly />
            </Box>
            <p className="mt-3 mb-4 pb-2">{content.content}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemComment;
