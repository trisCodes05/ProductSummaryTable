import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Pagination } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CommonModal from "../orderModal/commonModal";

const columns = [
  { field: "id", headerName: "ID", width: 60 },
  { field: "shipFY", headerName: "Ship FY", width: 100 },
  { field: "date", headerName: "Date", width: 120 },
  { field: "status", headerName: "Status", width: 100 },
  { field: "customer", headerName: "Customer", width: 100 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "country", headerName: "Country", width: 150 },
  { field: "shipping", headerName: "Shipping", width: 150 },
  { field: "source", headerName: "Source", width: 120 },
  { field: "orderType", headerName: "Order Type", width: 120 },
];

const CustomHeader = ({ columns, onChangePage, pageCount }) => {
  return (
    <div className="custom-header">
      <div className="table-header">
        <h2>Product Summary</h2>
      </div>

      <div className="header-dropdown">
        <div className="column-dropdown">
          <p>Show</p>
          <select>
            <option value="">All Column</option>
            {columns.map((column) => (
              <option key={column.field} value={column.field}>
                {column.headerName}
              </option>
            ))}
          </select>
        </div>
        <button className="btn">DISPATCH SELECTED</button>
        <Pagination
          count={pageCount}
          color="primary"
          shape="rounded"
          onChange={onChangePage}
        />
      </div>
    </div>
  );
};

const OrderTable = ({ rows, onEdit }) => {
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const totalPageCount = Math.ceil(rows.length / pageSize);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleRows = rows.slice(startIndex, endIndex);

  const [selectedRow, setSelectedRow] = useState(null); // State for selected row
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const handleEditClick = (params) => {
    // Set the selected row
    setSelectedRow(params.row);
    
    // Open the modal
    setIsModalOpen(true);

    // Call the onEdit function if provided
    if (onEdit) {
      onEdit(params.row);
    }
  };

  const handleCloseModal = () => {
    // Close the modal
    setIsModalOpen(false);
    
    // Reset the selected row
    setSelectedRow(null);
  };

  return (
    <div className="Products-table">
      <CustomHeader
        columns={columns}
        onChangePage={handleChangePage}
        pageCount={totalPageCount}
      />
      <DataGrid
        rows={visibleRows}
        columns={[
          ...columns,
          {
            field: "edit",
            headerName: "",
            width: 100,
            sortable: false,
            renderCell: (params) => (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleEditClick(params)}
              >
                <EditIcon />
              </div>
            ),
          },
        ]}
        pageSize={pageSize}
        checkboxSelection
        color="primary"
        hideFooter
        editable
      />
      <CommonModal open={isModalOpen} onClose={handleCloseModal} rowData={selectedRow} />
    </div>
  );
};

export default OrderTable;