import * as React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { getAllResult } from "../../../redux/actions/result";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Contest = () => {
  const dispatch = useDispatch();
  const allResult = useSelector((state) => state.result.results);
  console.log("Result :", allResult);

  useEffect(() => {
    dispatch(getAllResult());
  }, []);

  // Function to format date as "4-13-2024" instead of "4/13/2024"
  const formatDate = (dateString) => {
    const dateParts = dateString.split("/");
    return `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
  };

  return (
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
          {allResult.map((row) => (
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
  );
};

export default Contest;
