import React from 'react';
import { useParams } from "react-router";
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTodos, markCompleteAsync } from '../../redux/todoSlice';
import "./ViewTodoComponent.css";

const ViewTodoComponent = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const todo = useSelector((state) => state.todos.find(todo => todo.id == id));
    const handleBackButtonClick = () => navigate(`/`);
    let button;

    const getDateValue = () => {
        if (todo.dueDate) {
            const d = new Date(todo.dueDate);
            return `Due on ${d.toLocaleDateString("en-US")}`;
        }
        return null;
    }

    const handleMarkDoneClick = async (status) => {
        await Promise.all([
            dispatch(markCompleteAsync(
                {   
                    id: todo.id,
                    name: todo.name,
                    description: todo.description,
                    dueDate: todo.dueDate,
                    status 
                    }
                ))
        ]);
		

                dispatch(getAllTodos());
	};

    if ((todo.status === "Done")) {
        button = <button onClick={() => handleMarkDoneClick("Pending")} className='btn btn-secondary'> Mark as Pending
        </button>
    } else {
        button = <button onClick={() => handleMarkDoneClick("Done")} className='btn btn-success'> Mark as Completed
        </button>
    }

    return(
        <div className="container view-component">
            <div class="card">
                <div class="card-body">
                    <div className="row todo-name-row">
                        <h1 class="card-title">{todo.name}</h1>
                    </div>
                    <div className="row todo-description-row">
                        <p class="card-text">{todo.description}</p>
                    </div>
                    <div className="row todo-dueDate-staus-row">
                        <div className="col-md-6">
                            <p class="card-text">Status - {todo.status}</p>
                        </div>
                        <div className="col-md-6">
                            <p class="card-text">{getDateValue()}</p>
                        </div>
                    </div>
                    <div className="row todo-button-row">
                        <div className="col-md-6">
                            <button onClick={handleBackButtonClick} className='btn btn-warning'> Back </button>
                        </div>
                        <div className="col-md-6">
                            {button}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewTodoComponent;