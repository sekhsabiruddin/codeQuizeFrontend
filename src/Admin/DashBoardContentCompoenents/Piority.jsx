import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Priority = () => {
  const [priorityIds, setPriorityIds] = useState([]);
  const [priorityQuestions, setPriorityQuestions] = useState([]);
  const allQuestion = useSelector((state) => state.allQuestion.questions);
  const loading = useSelector((state) => state.allQuestion.isLoading);

  useEffect(() => {
    const storedPriority = localStorage.getItem("priority");
    if (storedPriority) {
      setPriorityIds(JSON.parse(storedPriority));
    }

    // Filter allQuestion based on priorityIds
    const filteredQuestions = allQuestion.filter((question) =>
      priorityIds.includes(question._id)
    );
    setPriorityQuestions(filteredQuestions);
  }, [priorityIds, allQuestion]); // Update when priorityIds or allQuestion change

  const removeFromPriority = (idToRemove) => {
    const updatedPriorityIds = priorityIds.filter((id) => id !== idToRemove);
    setPriorityIds(updatedPriorityIds);
    localStorage.setItem("priority", JSON.stringify(updatedPriorityIds));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell align="center">1st Option</TableCell>
            <TableCell align="center">2nd Option</TableCell>
            <TableCell align="center">3rd Option</TableCell>
            <TableCell align="center">4th Option</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {priorityQuestions.map((question) => (
            <TableRow key={question._id}>
              <TableCell component="th" scope="row">
                {question.question}
              </TableCell>
              {question.options.map((option, index) => (
                <TableCell key={index} align="center">
                  {option}
                </TableCell>
              ))}
              <TableCell align="center">
                <IconButton
                  color="primary"
                  aria-label="remove priority"
                  onClick={() => removeFromPriority(question._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Priority;
