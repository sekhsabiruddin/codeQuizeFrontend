import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Pagination,
} from "@mui/material";
import { getAllResult } from "../../../redux/actions/result";
import { useDispatch, useSelector } from "react-redux";

const Contest = () => {
  const dispatch = useDispatch();
  const allResult = useSelector((state) => state.result.results);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 8; // Number of results per page

  useEffect(() => {
    dispatch(getAllResult());
  }, []);

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = allResult.slice(indexOfFirstResult, indexOfLastResult);

  const formatDate = (dateString) => {
    const dateParts = dateString.split("/");
    return `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Solved</TableCell>
              <TableCell>Unsolved</TableCell>
              <TableCell>Not Attend</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentResults.map((row) => (
              <TableRow key={row._id}>
                <TableCell>
                  {formatDate(new Date(row.createdAt).toLocaleDateString())}
                </TableCell>
                <TableCell>
                  {new Date(row.createdAt).toLocaleTimeString()}
                </TableCell>
                <TableCell>{row.solved}</TableCell>
                <TableCell>{row.unsolved}</TableCell>
                <TableCell>{row.not_attend}</TableCell>
                <TableCell>{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <Pagination
        count={Math.ceil(allResult.length / resultsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        className="mt-2 "
      />
    </div>
  );
};

export default Contest;
