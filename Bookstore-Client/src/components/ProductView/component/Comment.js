import React from "react";
import ItemComment from "./ItemComment";
import FormComment from "./FormComment";
import { useState } from "react";
import { useEffect } from "react";
import { getComments, postComments } from "../../../services/comment";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { Box, Button, Typography } from "@material-ui/core";
import { Rating } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Comment = () => {
  const [value, setValue] = useState(1);
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const getAllComments = async () => {
    getComments(id).then(({ data }) => {
      setComments(data);
    });
  };
  useEffect(() => {
    if (id) {
      getAllComments();
    }
  }, []);
  const addComment = async (commentData) => {
    const data = {
      user_id: user.user_id,
      product_id: id,
      content: commentData.content,
      rating: commentData.rating,
    };
    await postComments(data).then(() => {
      getAllComments();
    });
  };
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container my-5 py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12 col-lg-10 col-xl-8">
            <div className="card">
              <Typography
                className="mt-2 mx-2"
                style={{ fontWeight: "bold" }}
                variant="h5">
                Bình luận - Đánh giá
              </Typography>
              {comments.map((item) => (
                <ItemComment content={item} />
              ))}
              {!user ? (
                <>
                  <Typography
                    className="mt-2 mx-auto text-danger"
                    style={{ fontWeight: "bold" }}
                    variant="h5">
                    Đăng nhập để Bình luận - Đánh giá
                  </Typography>
                  <Button
                    className="col-md-2 bg-danger text-white mx-auto my-2"
                    component={Link}
                    to="/login"
                    variant="contained">
                    Login
                  </Button>
                </>
              ) : (
                <FormComment onSubmitComment={addComment} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comment;
