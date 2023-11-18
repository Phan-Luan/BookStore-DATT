import React from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { useState } from "react";
import { getOrderDetail } from "../../../services/cart";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { Button, Link } from "@material-ui/core";
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

export default function OrderItem(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [orderDetail, setOrderDetail] = useState([]);
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={async () => {
              if (!open) {
                await getOrderDetail(row.id).then(({ data }) => {
                  setOrderDetail(data);
                });
              }
              setOpen(!open);
            }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.customer_name}</TableCell>
        <TableCell align="center">{row.customer_email}</TableCell>
        <TableCell align="center">{row.customer_phone}</TableCell>
        <TableCell align="center">{row.customer_address}</TableCell>
        <TableCell align="center">{row.payment}</TableCell>
        <TableCell align="center">{row.total}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <hr />
              <Typography variant="h6" gutterBottom component="div">
                Detail Order
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Product Name</TableCell>
                    <TableCell align="center">Product Image</TableCell>
                    <TableCell align="center">Product Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Feedback</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetail.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell align="center">{item.product_name}</TableCell>
                      <TableCell align="center">
                        <img width={100} src={item.product_image} />
                      </TableCell>
                      <TableCell align="center">
                        {item.sale_price > 0
                          ? item.sale_price
                          : item.product_price}
                      </TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">
                        <a className="btn btn-primary" href={`/product/${item.product_id}`}>Feedback</a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
