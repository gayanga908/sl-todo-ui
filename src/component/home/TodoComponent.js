import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getAllTodos,
  deleteTodoAsync,
  markCompleteAsync,
} from "../../redux/todoSlice";
import "./TodoComponent.css";

const TodoComponent = ({ id, name, description, dueDate, status }) => {
  let button;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEditClick = () => navigate(`/edit/${id}`);
  const handleViewDetailsClick = () => navigate(`/view/${id}`);
  const handleDeleteClick = () => {
    dispatch(deleteTodoAsync({ id }));
  };

  const handleMarkDoneClick = async (status) => {
    await Promise.all([
      dispatch(
        markCompleteAsync({
          id,
          name,
          description,
          dueDate,
          status,
        })
      ),
    ]);

    dispatch(getAllTodos());
  };

  if (status === "Done") {
    button = (
      <button
        onClick={() => handleMarkDoneClick("Pending")}
        className="btn btn-secondary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-check-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
        <span class="visually-hidden">Mark pending Button</span>
      </button>
    );
  } else {
    button = (
      <button
        onClick={() => handleMarkDoneClick("Done")}
        className="btn btn-success"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        </svg>
        <span class="visually-hidden">Mark done Button</span>
      </button>
    );
  }

  return (
    <div className="todo-container">
      <div class="card">
        <div class="card-body">
          <div className="row">
            <div className="col-md-9 col-sm-9">
              <h5 class="card-title">{name}</h5>
            </div>
            <div className="col-md-3 col-sm-12 action-column">
              <div
                class="btn-group"
                role="group"
                aria-label="Basic outlined example"
              >
                {button}

                <button
                  type="button"
                  class="btn btn-outline-primary"
                  onClick={() => handleViewDetailsClick()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-card-text"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                    <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                  </svg>
                  <span class="visually-hidden">View Button</span>
                </button>

                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  onClick={() => handleEditClick()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    ></path>
                  </svg>
                  <span class="visually-hidden">Edit Button</span>
                </button>
                <button
                  onClick={() => handleDeleteClick()}
                  className="btn btn-danger"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-x-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoComponent;
