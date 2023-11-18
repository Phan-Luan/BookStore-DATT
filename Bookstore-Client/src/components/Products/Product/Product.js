import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardActionArea,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { addCart } from "../../../services/cart";
import { Item } from "semantic-ui-react";

const Product = ({ product }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleAddToCart = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      const idProduct = product.id;
      const formData = {
        quantity: 1,
        user_id: user.user_id,
        product_id: idProduct,
      };

      await addCart(formData);
      toast.success("Thêm sản phẩm thành công");
    } else {
      history.push("/login");
    }
  };

  return (
    <Card key={product.id} className={classes.root}>
      <Link to={`product/${product.id}`}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product.image}
            title={product.name}
          />
        </CardActionArea>
      </Link>
      <CardContent>
        <div className={classes.cardContent}>
          <Typography
            variant="h6"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
            {product.name}
          </Typography>
        </div>
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
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Button
          variant="contained"
          className={classes.button}
          endIcon={<AddShoppingCart />}
          onClick={handleAddToCart}>
          <b>ADD TO CART</b>
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
