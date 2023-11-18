import React from "react";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import { Link, useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";
import { getBook } from "../../services/book";
import { AddShoppingCart } from "@material-ui/icons";
import { addCart } from "../../services/cart";
import Comment from "./component/Comment";
import { toast } from "react-toastify";
import useStyles from "./styles";
const createMarkup = (text) => {
  return { __html: text };
};

const ProductView = () => {
  const [product, setProduct] = useState({});
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const fetchProduct = async (id) => {
    const response = await getBook(id);
    const { name, price, sale_price, image, quantity, description } =
      response.data;
    setProduct({
      name,
      quantity,
      description,
      image,
      price,
      sale_price,
    });
  };

  useEffect(() => {
    fetchProduct(id);
  }, []);
  const handleAddToCart = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      const formData = {
        quantity: 1,
        user_id: user.user_id,
        product_id: id,
      };

      await addCart(formData);
      toast.success("Thêm sản phẩm thành công");
    } else {
      history.push("/login");
    }
  };
  return (
    <>
      <Container className="product-view">
        <Grid container>
          <Grid item xs={12} md={6} className="image-wrapper">
            <img src={product.image} alt={product.name} />
          </Grid>
          <Grid item xs={12} md={5} className="text">
            <Typography variant="h2">
              <b>{product.name}</b>
            </Typography>
            <Typography
              variant="p"
              dangerouslySetInnerHTML={createMarkup(product.description)}
            />
            <div className={classes.cardContent}>
              <Typography variant="h6" color="secondary">
                {product.sale_price === 0 ? (
                  <p>{product.price} VND</p>
                ) : (
                  <p>
                    <del style={{ color: "gray", fontSize: "15px" }}>
                      {product.price} VND
                    </del>{" "}
                    - {product.sale_price} VND
                  </p>
                )}
              </Typography>
            </div>
            <br />
            <Grid container spacing={4} className="flex justify-content-center">
              <Grid className="flex justify-content-center mb-3">
                <Button
                  size="large"
                  className="custom-button"
                  endIcon={<AddShoppingCart />}
                  onClick={handleAddToCart}>
                  ADD TO CART
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Comment />
    </>
  );
};

export default ProductView;
