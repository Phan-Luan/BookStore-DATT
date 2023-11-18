import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useEffect } from "react";

export default function AddressForm({ onAddressDataChange }) {
  const [addressData, setAddressData] = useState({
    customer_name: "",
    customer_address: "",
    customer_email: "",
    customer_phone: "",
  });
  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("dataUser"));
    if (data) {
      setAddressData(data);
    }
  }, []);
  const handleAddressChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setAddressData({ ...addressData, [name]: newValue });
    onAddressDataChange({ ...addressData, [name]: newValue }); // Gửi dữ liệu ra ngoài
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="customer_name"
            name="customer_name"
            label="Username"
            fullWidth
            value={addressData.customer_name}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="customer_address"
            name="customer_address"
            label="Address"
            fullWidth
            value={addressData.customer_address}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="customer_email"
            name="customer_email"
            label="Email"
            fullWidth
            value={addressData.customer_email}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="customer_phone"
            name="customer_phone"
            label="Phone"
            fullWidth
            value={addressData.customer_phone}
            onChange={handleAddressChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
