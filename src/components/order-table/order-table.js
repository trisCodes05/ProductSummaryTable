import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Checkbox,
  FormControl,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
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

const CustomHeader = ({
  columns,
  onChangePage,
  pageCount,
  columnSelected,
  setColumnSelected,
}) => {
  
  const handleColumnSelect = (event) => {
    const { value } = event.target;
    setColumnSelected(value);
  };

  return (
    <div className="custom-header">
      <div className="table-header">
        <h2>Product Summary</h2>
      </div>

      <div className="header-dropdown">
        <div className="column-dropdown">
          <p>Show</p>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              multiple
              value={columnSelected}
              onChange={handleColumnSelect}
              renderValue={(selected) =>
                selected.includes("All Columns")
                  ? "All Columns"
                  : selected.join(", ")
              }
              sx={{ width: 200 }}
            >
              {columns.map((column) => (
                <MenuItem key={column.field} value={column.field}>
                  <Checkbox checked={columnSelected.includes(column.field)} />
                  {column.headerName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
  const [selectedColumns, setSelectedColumns] = useState([
    "All Columns",
    ...columns.map((column) => column.field),
  ]); //adding all options to selectedColumns

  //Pagination
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const totalPageCount = Math.ceil(rows.length / pageSize);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleRows = rows.slice(startIndex, endIndex);

  //Edit Row
  const [selectedRow, setSelectedRow] = useState(null); // State for selected row
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const handleEditClick = (params) => {
    setSelectedRow(params.row); // Set the selected row
    setIsModalOpen(true);

    // Call the onEdit function if provided/ if OrderTable component
    if (onEdit) {
      onEdit(params.row);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null); // Reset the selected row
  };

  return (
    <div className="Products-table">
      <CustomHeader
        columns={columns}
        onChangePage={handleChangePage}
        pageCount={totalPageCount}
        columnSelected={selectedColumns}
        setColumnSelected={setSelectedColumns}
      />

      <DataGrid
        rows={visibleRows}
        columns={[
          ...columns.filter((column) => selectedColumns.includes(column.field)),
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
              </div> //edit for each row
            ),
          },
        ]}
        pageSize={pageSize}
        checkboxSelection
        color="primary"
        hideFooter
        editable
      />

      <CommonModal
        open={isModalOpen}
        onClose={handleCloseModal}
        rowData={selectedRow}
      />
    </div>
  );
};

export default OrderTable;
