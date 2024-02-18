import React, { useState, useEffect } from "react";
import { Modal, TextField, MenuItem, Button } from "@mui/material";

const CommonModal = ({ open, onClose, rowData }) => {
  const isNewRow = !rowData; // Check if it's a new row or editing an existing one

  const [formData, setFormData] = useState({
    date: "",
    status: "",
    customer: "",
    email: "",
    country: "",
    source: "",
    orderType: ""
  });

  useEffect(() => {
    if (!isNewRow) {
      setFormData({ ...rowData });
    } else {
      setFormData({
        date: "",
        status: "",
        customer: "",
        email: "",
        country: "",
        source: "",
        orderType: ""
      });
    }
  }, [rowData, isNewRow]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    
    onClose(); 
  };

  return (
    <Modal open={open} onClose={onClose} 
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "70%", 
      maxWidth: 400, 
    }}>
      <div style={{ backgroundColor: "#fff", padding: 30, borderRadius: 4, minWidth: 200 }}>
        <h2>{isNewRow ? "Create New Order" : "Edit Order"}</h2>
        <TextField name="date" label="Date" type="date" value={formData.date} onChange={handleChange} fullWidth margin="normal" focused/>
        <TextField name="status" label="Status" select value={formData.status} onChange={handleChange} fullWidth margin="normal">
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Processing">Processing</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
        <TextField name="customer" label="Customer" value={formData.customer} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="email" label="Email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="country" label="Country" value={formData.country} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="source" label="Source" value={formData.source} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="orderType" label="Order Type" value={formData.orderType} onChange={handleChange} fullWidth margin="normal" />
        <div style={{ marginTop: 20, textAlign: "right" }}>
          <Button variant="outlined" color="primary" onClick={onClose} style={{ marginRight: 10 }}>
            Close
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {isNewRow ? "Create" : "Save Changes"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CommonModal;
