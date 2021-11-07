/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTodoAsync, getAllTodos } from "../../redux/todoSlice";
import DatePicker from "react-datepicker";
import { useAlert } from 'react-alert'
import "react-datepicker/dist/react-datepicker.css";

const EditTodo = () => {
  const { id } = useParams();
  const todo = useSelector((state) =>
    state.todos.find((todo) => todo.id == id)
  );

  const [name, setName] = useState(todo.name);
  const [description, setDescription] = useState(todo.description);
  const [dueDate, setDueDate] = useState(new Date(todo.dueDate));

  let navigate = useNavigate();
  const handleBackButtonClick = () => navigate(`/`);

  const dispatch = useDispatch();
  const alert = useAlert()

  const onSubmit = async (event) => {
    event.preventDefault();
    if (name == null || name === ""){
        alert.error('Name cannot be empty!')
    } else if (description !== "" && description.length > 500) {
        alert.error('Description cannot have more than 500 charactors')
    } else {
        await Promise.all([
        dispatch(
            updateTodoAsync({
            id,
            name,
            description,
            dueDate: dueDate,
            status: todo.status,
            })
        ),
        alert.success('Todo Updated')
        ]);
        dispatch(getAllTodos());
        navigate("/");
    }
  };

  return (
    <div>
      <div className="container view-component">
        <div class="card">
          <div class="card-body">
            <div className="row todo-name-row">
              <h1 class="card-title">Edit - {todo.name}</h1>
            </div>

            <div className="todo-form">
              <form onSubmit={onSubmit} className="form-inline mt-3 mb-3">
                <label className="sr-only">Name</label>
                <input
                  name="name"
                  type="text"
                  className="form-control mb-2 mr-sm-2"
                  placeholder="Todo name"
                  defaultValue={todo.name}
                  onChange={(event) => setName(event.target.value)}
                ></input>

                <label className="sr-only">Description</label>
                <textarea
                  name="description"
                  type="text"
                  className="form-control mb-2 mr-sm-2"
                  placeholder="Todo description"
                  defaultValue={todo.description}
                  onChange={(event) => setDescription(event.target.value)}
                ></textarea>

                <label className="sr-only">Due Date</label>
                <DatePicker
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
                  minDate={new Date()}
                />

                <div className="row todo-button-row">
                  <div className="col-md-6">
                    <button
                      onClick={handleBackButtonClick}
                      className="btn btn-warning"
                    >
                      Back
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      type="submit"
                      className="btn btn-primary mb-2 edit-submit-button"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
