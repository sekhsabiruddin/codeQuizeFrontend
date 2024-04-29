import React, { useState } from "react";
import { Modal, Backdrop, Fade, Button, TextField, Grid } from "@mui/material";

import { useDispatch } from "react-redux";
import { updateQuestion } from "../../redux/actions/allquestion";
import { toast } from "react-toastify";
const QuestionModal = ({ open, handleClose, question }) => {
  const [updatedQuestion, setUpdatedQuestion] = useState(question);

  const dispatch = useDispatch();
  const handleUpdate = async () => {
    if (!updatedQuestion.question || updatedQuestion.question.trim() === "") {
      toast.error("Question field cannot be empty");
      return;
    }

    if (
      updatedQuestion.options.some((option) => !option || option.trim() === "")
    ) {
      toast.error("Option fields cannot be empty");
      return;
    }

    if (!updatedQuestion.options.includes(updatedQuestion.answer)) {
      toast.error("Answer should be one of the provided options");
      return;
    }

    await dispatch(updateQuestion(updatedQuestion._id, updatedQuestion));

    handleClose();
    // Dispatch API action here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedQuestion({ ...updatedQuestion, [name]: value });
  };

  return (
    <div className="bg-[#fff]" style={{ width: "50%" }}>
      <Modal
        className="flex justify-center align-center min-h-[100vh] mt-10 "
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        closeAfterTransition
      >
        <Fade
          in={open}
          className="px-5 py-10 h-[90vh] w-[60%] bg-[#ffff] rounded-md"
        >
          <div className="mt-10 ">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Question"
                  name="question"
                  value={updatedQuestion.question}
                  onChange={handleChange}
                />
              </Grid>
              {updatedQuestion.options.map((option, index) => (
                <Grid item xs={6} key={index}>
                  <TextField
                    fullWidth
                    label={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "options",
                          value: updatedQuestion.options.map((opt, i) =>
                            i === index ? e.target.value : opt
                          ),
                        },
                      })
                    }
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Answer"
                  name="answer"
                  value={updatedQuestion.answer}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <div className="text-center mt-10">
              <Button
                variant="contained"
                color="primary"
                className="w-[50%]"
                onClick={handleUpdate}
              >
                Update
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default QuestionModal;
