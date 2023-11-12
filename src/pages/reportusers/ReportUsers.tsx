import { useState } from "react";
import Add from "../../components/Add/Add";
import DataTable from "../../components/dataTable/DataTable";
import { posts } from "../../data";
import "./reportUsers.scss";
import { GridColDef } from "@mui/x-data-grid";
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },

  },
  {
    field: "reporter",
    type: "string",
    headerName: "Reporter",
    width: 100,
  },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 250,
  },
  {
    field: "reason",
    headerName: "Reason",
    type: "string",
    width: 250,

  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 150,
    type: "string",
  },


];

const ReportUsers = () => {

  return (



    <div className="reports">
      <div className="info">
        <h1>Report Users</h1>

      </div>
      <DataTable slug="reports" columns={columns} rows={posts} />

    </div>
  )
};

export default ReportUsers;
