import React, { useState } from "react";
import OrderTable from "../order-table/order-table";
import TableSearch from "../search/search";
import CommonModal from "../orderModal/commonModal";
import rowData from "../../rows.json";
import "../../style.css";

function OrdersPage() {
  const [filteredRows, setFilteredRows] = useState([...rowData]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  //searchbar function
  const handleSearch = (searchWord, category, status) => {
    const newFilteredRows = rowData.filter((row) => {
      const matchesSearch =
        row.customer.toLowerCase().includes(searchWord.toLowerCase()) || true; // Keep this line unchanged
      const matchesCategory = category === "All" || row.orderType === category;
      const matchesStatus = status === "All" || row.status === status;

      if (category === "All") {
        // If category is 'All', only check status
        return matchesSearch && matchesStatus;
      } else {
        // If a specific category is selected, check both category and status
        return matchesSearch && matchesCategory && matchesStatus;
      }
    });
    setFilteredRows(newFilteredRows);
  };

  const handleCreateNew = () => {
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleSave = (editedRow) => {
    // Logic to save the edited row
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Orders</h1>
        <button className="btn" onClick={handleCreateNew}>
          CREATE NEW
        </button>
      </div>
      <TableSearch onSearch={handleSearch} />
      <OrderTable rows={filteredRows} onEdit={handleEdit} />
      <CommonModal
        open={isModalOpen}
        onClose={handleCloseModal}
        isEditMode={isEditMode}
        rowData={selectedRow}
        onSave={handleSave}
      />
    </div>
  );
}

export default OrdersPage;
