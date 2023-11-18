import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { getCarts } from "../../services/cart";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [totalPrice, setTotalPrice] = useState(0);
  let user = JSON.parse(sessionStorage.getItem("user"));
  let dataAddressUser = JSON.parse(sessionStorage.getItem("dataUser"));

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

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {data.map((item) => (
          <ListItem className={classes.listItem} key={item.id}>
            <ListItemText primary={item.products.name} />
            x
            <ListItemText primary={item.quantity} />
            <Typography variant="body2">
              {item.products.sale_price > 0 ? (
                <>
                  <del>
                    <b>{item.products.price}</b>
                  </del>{" "}
                  - <b>{item.products.sale_price}</b>
                </>
              ) : (
                <b>{item.products.price}</b>
              )}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {totalPrice} vnd
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{dataAddressUser.customer_name}</Typography>
          <Typography gutterBottom>{dataAddressUser.customer_phone}</Typography>
          <Typography gutterBottom>{dataAddressUser.customer_email}</Typography>
          <Typography gutterBottom>
            {dataAddressUser.customer_address}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>{dataAddressUser.payment}</Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
