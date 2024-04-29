import React, { useState } from "react";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";
const Feedback = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !message) {
      toast.error("Filed should not be empty");
      return;
    }

    axios
      .post(
        `${server}/feedback/create-feedback`,
        {
          subject,
          message,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        toast.success("Feedback has been submitted");
      })
      .catch((error) => {
        console.error(error);
        // Handle error, e.g., show an error message to the user
      });

    // Clear the form fields after submission
    setSubject("");
    setMessage("");
  };

  return (
    <div className="h-full flex align-center justify-center">
      <div className="w-[95%] lg:w-[70%] my-3 bg-[#fff]">
        <form className="space-y-6 p-3" onSubmit={handleSubmit}>
          {/* Subject input field */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="subject"
                autoComplete="off"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="appearance-none mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Message input field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <div className="mt-1">
              <textarea
                rows="10"
                name="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full mt-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="text-center">
            <input
              className="w-[50%] bg-[#3a24db] h-[40px] border border-[#3a24db] text-center rounded-[3px] mt-8 cursor-pointer text-[#fff] hover:opacity-80 transition-opacity duration-300"
              type="submit"
              value="Submit"
              style={{ fontFamily: "Open Sans", fontWeight: 500 }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
