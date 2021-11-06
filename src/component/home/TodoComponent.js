import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllTodos, deleteTodoAsync, markCompleteAsync } from '../../redux/todoSlice';
import './TodoComponent.css'


const TodoComponent = ({
  id,
  name,
  description,
  dueDate,
  status
}) => {

    let button;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleEditClick = () => navigate(`/edit/${id}`);
    const handleDeleteClick = () => {
		dispatch(deleteTodoAsync({ id }));
	};

    const handleMarkDoneClick = async (status) => {
        await Promise.all([
            dispatch(markCompleteAsync(
                {   
                    id,
                    name,
                    description,
                    dueDate,
                    status 
                    }
                ))
        ]);
		

                dispatch(getAllTodos());
	};

    if ((status === "Done")) {
        button = <button onClick={() => handleMarkDoneClick("Pending")} className='btn btn-secondary'> Mark Undone </button>
    } else {
        button = <button onClick={() => handleMarkDoneClick("Done")} className='btn btn-success'> Mark Done </button>
    }

  return (

    <div className="todo-container">
        {/* <div className="row">
            <div className="col-md-9, col-sm-9">
                <h1>{name}</h1>
                <p>{description}</p>
                <p>{dueDate}</p>
            </div>
            <div className="col-md-3, col-sm-3 action-column">
                <div className="edit-row"><button onClick={() => handleEditClick() }> Edit </button></div>
                <div className="status-row"><p>{status}</p></div>
                <div className="done-delete-btn-row">
                    <button onClick={() => handleDeleteClick()} className='btn btn-danger'> Delete </button>
                    {button}
                </div>               
            </div>
        </div> */}

        <div class="card">
            <div class="card-body">
            <div className="row">
                <div className="col-md-9, col-sm-9">
                    <h5 class="card-title">{name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{dueDate}</h6>
                    <p class="card-text">{description}</p>
                </div>
                <div className="col-md-3, col-sm-3 action-column">
                    {/* <div className="edit-row"></div> */}
                    <div className="status-row">
                        {/* <button className="edit-btn" onClick={() => handleEditClick() }> Edit </button> */}
                        <button type="button" class="btn btn-outline-secondary"  onClick={() => handleEditClick() }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                            </svg>
                            <span class="visually-hidden">Button</span>
                         </button>
                        <p>{status}</p>
                    </div>
                    <div className="done-delete-btn-row row">
                        <div className="col-sm-6 col-md-6 col-xs-12 delete-btn-column">
                            <button onClick={() => handleDeleteClick()} className='btn btn-danger'> Delete </button>
                        </div>
                        <div className="col-sm-6 col-md-6 col-xs-12">
                            {button}
                        </div>
                        
                        
                    </div>               
                </div>
                </div>
            </div>
</div>
    </div>
  );
};

export default TodoComponent;