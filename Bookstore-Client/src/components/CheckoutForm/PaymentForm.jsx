import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

export default function PaymentForm({ onAddressDataChange }) {
  const [addressData, setAddressData] = useState({
    payment: "cod", 
  });

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("dataUser"));
    if (data) {
      setAddressData(data);
    }
  }, []);

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setAddressData({ ...addressData, [name]: value });
    onAddressDataChange({ ...addressData, [name]: value });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RadioGroup
            name="payment"
            value={addressData.payment}
            onChange={handleAddressChange}>
            <FormControlLabel
              value="cod"
              control={<Radio color="secondary" />}
              label="Thanh toán khi nhận hàng"
            />
            <FormControlLabel
              value="online"
              control={<Radio color="secondary" />}
              label="Thanh toán trực tuyến"
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
