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
import { TablePagination } from "@mui/material";
import QuestionModal from "./QuestionModel";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { getAllQuestion } from "../../redux/actions/allquestion";
import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { server } from "../../server";
import Loading from "../../components/Loading/Loading";
const AllQuestion = () => {
  const allQuestion = useSelector((state) => state.allQuestion.questions);
  const loading = useSelector((state) => state.allQuestion.isLoading);
  const dispatch = useDispatch();
  const [priorityIds, setPriorityIds] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editQuestion, setEditQuestion] = useState(null);

  useEffect(() => {
    const storedPriority = JSON.parse(localStorage.getItem("priority"));
    if (storedPriority) {
      setPriorityIds(storedPriority);
    }
  }, []);
  if (loading) {
    return <Loading />;
  }
  const handleEdit = (question) => {
    setEditQuestion(question);
  };
  const handleCloseModal = () => {
    setEditQuestion(null);
    dispatch(getAllQuestion());
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const togglePriority = (questionId) => {
    console.log("priorityIds", priorityIds);

    const updatedPriorityIds = [...priorityIds];
    const questionIndex = updatedPriorityIds.indexOf(questionId);
    if (questionIndex === -1) {
      updatedPriorityIds.push(questionId); // Add the questionId if not present
    } else {
      updatedPriorityIds.splice(questionIndex, 1); // Remove the questionId if already present
    }
    setPriorityIds(updatedPriorityIds);
    localStorage.setItem("priority", JSON.stringify(updatedPriorityIds)); // Store updated priority IDs in localStorage
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = await Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this question!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      });

      if (confirmDelete.isConfirmed) {
        // Dispatch the deleteQuestion action
        const response = await axios.delete(
          `${server}/question/delete-question/${id}`
        );

        // Check if the deletion was successful
        if (response.status === 200) {
          // Provide feedback to the user
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Question deleted successfully",
          });
          dispatch(getAllQuestion());
        } else {
          // Provide feedback to the user if deletion failed
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete question",
          });
        }
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      // Provide feedback to the user if there's an error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete question",
      });
    }
  };

  return (
    <>
      <div className="max-h-[100%] overflow-auto">
        <TableContainer
          component={Paper}
          style={{ overflowX: "auto", borderLeft: "0.6px solid #ddd" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Question</TableCell>
                <TableCell align="center">1st Option</TableCell>
                <TableCell align="center">2nd Option</TableCell>
                <TableCell align="center">3rd Option</TableCell>
                <TableCell align="center">4th Option</TableCell>
                <TableCell align="center">Priority</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allQuestion
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((question) => (
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
                        style={{
                          color: priorityIds.includes(question._id)
                            ? "gold"
                            : "grey",
                        }}
                        aria-label="priority"
                        onClick={() => togglePriority(question._id)}
                      >
                        <StarIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        style={{ color: "green" }}
                        aria-label="edit"
                        onClick={() => handleEdit(question)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton style={{ color: "red" }} aria-label="delete">
                        <DeleteIcon
                          onClick={() => handleDelete(question._id)}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allQuestion.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      {editQuestion && (
        <QuestionModal
          open={!!editQuestion}
          handleClose={handleCloseModal}
          question={editQuestion}
        />
      )}
    </>
  );
};

export default AllQuestion;
