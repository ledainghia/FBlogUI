import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import { userRows } from "../../data";
import { useState } from "react";
import Add from "../../components/Add/Add";
import Popup from "../../components/popUp/PopUp";
import { Button } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: "img", headerName: "Avatar", width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "./noavatar.png"} alt="" />
    }
  },
  // {field:"status",headerName:"Status",width:100,type:"boolean"},

  {
    field: 'fullname',
    headerName: 'Full name',
    type: "string",
    width: 150,
    editable: true,
  },

  {
    field: 'email',
    headerName: 'Email',
    type: "string",
    width: 200,
    editable: true,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    type: "string",
    width: 150,
    editable: true,
  },

  {
    field: 'verified',
    headerName: 'Verified',
    type: "boolean",
    width: 100,
    editable: true,
  },
  {
    field: 'role',
    headerName: 'Role',
    type: "string",
    width: 100,
    editable: true,
  },

  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];



const Users = () => {
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);


  return (



    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      <DataTable slug="users" columns={columns} rows={userRows} />
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}

    </div>



  )
}

export default Users;
