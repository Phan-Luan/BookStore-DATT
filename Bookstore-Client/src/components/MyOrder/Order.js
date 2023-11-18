import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import useStyles from "./styles";
import { useState } from "react";
import { useEffect } from "react";
import { myorder } from "../../services/cart";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import OrderItem from "./OrderItem/OrderItem";

export default function Order() {
  const classes = useStyles();
  const [order, setOrder] = useState([]);
  const { user_id } = JSON.parse(sessionStorage.getItem("user"));
  useEffect(() => {
    try {
      myorder(user_id).then(({ data }) => {
        console.log(data);
        setOrder(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      {order.length > 0 ? (
        <TableContainer component={Paper} className={classes.heightContainer}>
          <Typography className="mt-2" variant="h4">
            My Order
          </Typography>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width={30}>
                  Action
                </TableCell>
                <TableCell align="center">Customer Name</TableCell>
                <TableCell align="center">Customer Email</TableCell>
                <TableCell align="center">Customer Phone</TableCell>
                <TableCell align="center">Customer Address</TableCell>
                <TableCell align="center">Payment</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.map((row) => (
                <OrderItem key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>
          <Typography
            style={{ marginTop: 100, textAlign: "center" }}
            className="mx-auto"
            variant="h4">
            Giỏ hàng trống <br />
            <Button
              textAlign="center"
              variant="span"
              color="primary"
              component={Link}
              to="/">
              Mua sắm
            </Button>
          </Typography>
        </>
      )}
    </>
  );
}
