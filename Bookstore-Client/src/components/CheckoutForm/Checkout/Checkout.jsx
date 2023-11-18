import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getCarts, placeOrder } from "../../../services/cart";
import AddressForm from "../AddressForm";
import Review from "../Review";
import PaymentForm from "../PaymentForm";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    paddingTop: "50px",
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step, state) {
  switch (step) {
    case 0:
      return <AddressForm onAddressDataChange={state} />;
    case 1:
      return <PaymentForm onAddressDataChange={state} />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addressData, setAddressData] = useState({
    customer_name: "",
    customer_address: "",
    customer_email: "",
    customer_phone: "",
    payment: "cod",
  });
  const [maDH, setMaDH] = useState("");

  let user = JSON.parse(sessionStorage.getItem("user"));
  let dataAddressUser = JSON.parse(sessionStorage.getItem("dataUser"));
  const fetchCart = async (id) => {
    const { data } = await getCarts(id);
    setData(data);
  };
  useEffect(() => {
    if (user) {
      fetchCart(user.user_id);
    }
  }, []);
  useEffect(() => {
    let total = 0;

    for (const item of data) {
      const price =
        item.products.sale_price > 0 ? item.products.sale_price : item.products.price;

      total += item.quantity * price;
    }
    setTotalPrice(total);
  }, [data]);
  const isValidAddressData = (data) => {
    if (
      data.customer_name.trim() === "" ||
      data.customer_address.trim() === "" ||
      data.customer_email.trim() === "" ||
      data.customer_phone.trim() === ""
    ) {
      toast.error("Chưa nhập đủ dữ liệu");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.customer_email)) {
      toast.error("Chưa đúng định dạng email");
      return false;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(data.customer_phone)) {
      toast.error("Chưa nhập phone đúng định dạng");
      return false;
    }
    return true;
  };

  const handleAddressDataChange = (data) => {
    setAddressData((prevData) => ({ ...prevData, ...data }));
  };

  const handleNext = () => {
    if (activeStep === 0 || activeStep === 1) {
      if (isValidAddressData(addressData)) {
        sessionStorage.setItem("dataUser", JSON.stringify(addressData));
        setActiveStep(activeStep + 1);
      }
    }
  };

  const handlePlaceOrder = async () => {
    const formData = {
      customer_name: dataAddressUser.customer_name,
      customer_email: dataAddressUser.customer_email,
      customer_phone: dataAddressUser.customer_phone,
      customer_address: dataAddressUser.customer_address,
      payment: dataAddressUser.payment,
      total: totalPrice,
      user_id: user.user_id,
    };
    await placeOrder(formData).then(({ data }) => {
      sessionStorage.removeItem("dataUser");
      setActiveStep(activeStep + 1);
      setMaDH(data.order_id);
    });
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === 3 ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is # {maDH}. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, handleAddressDataChange)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={
                      activeStep === steps.length - 1
                        ? handlePlaceOrder
                        : handleNext
                    }
                    className={classes.button}>
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
