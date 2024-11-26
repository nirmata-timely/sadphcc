import React, { useState } from "react";
import Side from "../dashboard/side";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTaskAssign = () => {
  const navigate = useNavigate();

  // State for task fields
  const [taskname, settaskname] = useState("");
  const [description, setdescription] = useState("");
  const [schedtime, setschedtime] = useState("");
  const [taskErrors, setTaskErrors] = useState({});

  // Validate input fields
  const validateTask = () => {
    const newErrors = {};
    if (!taskname.trim()) newErrors.taskname = "Task name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!schedtime) newErrors.schedtime = "Schedule time is required";
    setTaskErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit task to backend
  const onSubmitTask = async () => {
    if (!validateTask()) {
      alert("Please fill in all required fields.");
      return;
    }

    const taskData = {
      task_name: taskname.trim(),
      description: description.trim(),
      sched_time: schedtime,
    };

    try {
      const response = await axios.post(
        "http://localhost:5124/taskslist",
        taskData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from server:", response.data);

      if (response.data && response.data.success) {
        alert("Task created successfully!");
        navigate("/TasksList");
      } else {
        alert(
          "Failed to create task: " + (response.data.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error creating task:", error);
      if (error.response) {
        alert(
          "Error creating task: " +
            (error.response.data.message || "Server responded with an error.")
        );
      } else {
        alert("Error creating task: " + error.message);
      }
    }
  };

  return (
    <div>
      <Side />
      <div className="create-task">
        <h4>Create Task</h4>
        <div className="form-group">
          <label className="taskname">
            Task Name: <span className="required"></span>
          </label>
          <input
            className={`title ${taskErrors.taskname ? "error" : ""}`}
            type="text"
            placeholder="Enter task title"
            value={taskname}
            onChange={(e) => settaskname(e.target.value)}
          />
          {taskErrors.taskname && (
            <small className="error-text">{taskErrors.taskname}</small>
          )}
        </div>

        <div className="form-group">
          <label className="taskdescription">
            Description: <span className="required"></span>
          </label>
          <textarea
            placeholder="Enter task description"
            className={`desc ${taskErrors.description ? "error" : ""}`}
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          ></textarea>
          {taskErrors.description && (
            <small className="error-text">{taskErrors.description}</small>
          )}
        </div>

        <div className="form-group">
          <label className="tasktime">
            Scheduled Time: <span className="required"></span>
          </label>
          <input
            type="time"
            className={`time ${taskErrors.schedtime ? "error" : ""}`}
            value={schedtime}
            onChange={(e) => setschedtime(e.target.value)}
          />
          {taskErrors.schedtime && (
            <small className="error-text">{taskErrors.schedtime}</small>
          )}
        </div>

        <button
          className="save-createtask"
          type="button"
          onClick={onSubmitTask}
        >
          Save Task
        </button>
      </div>
    </div>
  );
};

export default CreateTaskAssign;
