import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAsync, getAllTodos } from "../../redux/todoSlice";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useAlert } from 'react-alert'
import "react-datepicker/dist/react-datepicker.css";

const AddTodoComponent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());

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
              addTodoAsync({
                name,
                description,
                dueDate,
              })
            ),
            alert.success('Todo saved')
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
              <h1 class="card-title">Add Todo</h1>
            </div>

            <div className="todo-form">
              <form onSubmit={onSubmit} className="form-inline mt-3 mb-3">
                <label className="sr-only">Name</label>
                <input
                  type="text"
                  className="form-control mb-2 mr-sm-2"
                  placeholder="Todo name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                ></input>

                <label className="sr-only">Description</label>
                <textarea
                  type="text"
                  className="form-control mb-2 mr-sm-2"
                  placeholder="Todo description"
                  value={description}
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
                    <button type="submit" className="btn btn-primary mb-2">
                      Save
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

export default AddTodoComponent;
