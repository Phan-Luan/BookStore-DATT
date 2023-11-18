import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import useStyles from "./styles";
import { toast } from "react-toastify";

const CartItem = ({ item, onRemoveFromCart, onUpdateCartQty }) => {
  const classes = useStyles();

  return (
    <Card className="cart-item">
      <CardMedia
        image={item.products.image}
        alt={item.products.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography
          variant="h6">
          {item.products.name}
        </Typography>
        <Typography variant="h6" color="secondary">
          {item.products.sale_price === 0 ? (
            <p>{item.products.price} VND</p>
          ) : (
            <p>
              <del style={{ color: "gray", fontSize: "15px" }}>
                {item.products.price} VND
              </del>{" "}
              - {item.products.sale_price} VND
            </p>
          )}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => {
              const newQuantity = item.quantity - 1;
              if (newQuantity >= 1) {
                onUpdateCartQty(item.id, newQuantity);
              }
            }}>
            -
          </Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => {
              const newQuantity = item.quantity + 1;
              if (newQuantity <= item.products.quantity) {
                onUpdateCartQty(item.id, newQuantity);
              } else {
                toast.warn("Sản phẩm chỉ còn: " + item.products.quantity);
              }
            }}>
            +
          </Button>
        </div>
        <Button
          className={classes.button}
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => onRemoveFromCart(item.id)}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
