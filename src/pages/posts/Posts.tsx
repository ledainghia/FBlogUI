import { useState } from "react";
import Add from "../../components/Add/Add";
import DataTable from "../../components/dataTable/DataTable";
import { posts } from "../../data";
import "./posts.scss";
import { GridColDef } from "@mui/x-data-grid";
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 250,
  },
  {
    field: "category",
    type: "string",
    headerName: "Category",
    width: 100,
  },
  {
    field: "author",
    type: "string",
    headerName: "Author",
    width: 100,
  },
  {
    field: "votes",
    headerName: "Votes",
    type: "string",
    width: 100,
  },
  {
    field: "isApproved",
    headerName: "Is Approved",
    type: "boolean",
    width: 100,
  },
  {
    field: "approvedBy",
    headerName: "Approved by",
    type: "string",
    width: 100,
  },

  {
    field: "createdAt",
    headerName: "Created At",
    width: 150,
    type: "string",
  },


];

const Posts = () => {
  const [open, setOpen] = useState(false);
  return (



    <div className="posts">
      <div className="info">
        <h1>Posts</h1>
        <button onClick={() => setOpen(true)}>Add new Posts</button>
      </div>
      <DataTable slug="posts" columns={columns} rows={posts} />
      {open && <Add slug="post" columns={columns} setOpen={setOpen} />}
    </div>
  )
};

export default Posts;
