import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import {
  deleteCart,
  deleteCartUesr,
  getCarts,
  updateCart,
} from "../../services/cart";

const Cart = () => {
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const classes = useStyles();
  let user = JSON.parse(sessionStorage.getItem("user"));
  useEffect(() => {
    let total = 0;

    for (const item of data) {
      const price =
        item.products.sale_price > 0
          ? item.products.sale_price
          : item.products.price;

      total += item.quantity * price;
    }

    setTotalPrice(total);
  }, [data]);

  const fetchCart = async (id) => {
    const { data } = await getCarts(id);
    setData(data);
  };
  useEffect(() => {
    if (user) {
      fetchCart(user.user_id);
    }
  }, []);

  const handleRemoveFromCart = () => {
    try {
      deleteCart(id).then(() => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };
  const handleRemoveAllCart = () => {
    try {
      if (user) {
        deleteCartUesr(user.user_id).then(() => {
          setData([]);
        });
      }
    } catch (error) {
      console.error("Lỗi khi xóa toàn bộ sản phẩm:", error);
    }
  };
  const handleUpdateCartQty = async (lineItemId, newQuantity) => {
    try {
      const response = await updateCart({ quantity: newQuantity }, lineItemId);
      setData((prevData) => {
        return prevData.map((item) => {
          if (item.id === lineItemId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng sản phẩm:", error);
    }
  };

  const renderCart = () => (
    <>
      <Grid container spacing={4}>
        {data.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem
              item={lineItem}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h5">
          Subtotal:<b> {totalPrice} </b>
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleRemoveAllCart}>
            Empty cart
          </Button>
          <Button
            className={classes.checkoutButton}
            component={Link}
            to="/checkout"
            size="large"
            type="button"
            variant="contained">
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container className={classes.heightContainer}>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h5" gutterBottom>
        <b>Your Shopping Cart</b>
      </Typography>
      <hr />
      {data.length > 0 ? renderCart() : <b>No product</b>}
    </Container>
  );
};

export default Cart;
