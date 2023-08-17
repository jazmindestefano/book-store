import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function BasicTable({ columns, rows }) {
  const [data, setData] = useState([]);

  // console.log({ data, rows });

  const fetchDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      setData(data.filter((row) => row._id !== id));
    } catch (error) {
      return {};
    }
  };

  useEffect(() => {
    setData(rows);
  }, [rows]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns?.map((column, i) => (
              <TableCell key={i} align="left">
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data?.map((row, i) => (
              <TableRow key={i}>
                <TableCell align="left">
                  <Link to={`http://localhost:3000/books/${row._id}`}>
                    {row.name}
                  </Link>
                </TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="left">{row.author}</TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="left">
                  {row.available ? "Available" : "Not available"}
                </TableCell>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => fetchDeleteBook(row._id)}
                  >
                    Delete
                  </Button>
                  <Button variant="contained" color="info">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
