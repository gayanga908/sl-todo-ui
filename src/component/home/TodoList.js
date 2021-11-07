/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTodos } from '../../redux/todoSlice';
import TodoComponent from './TodoComponent';
import {useNavigate} from 'react-router-dom';
import "./TodoListComponent.css"

const TodoList = () => {
	const dispatch = useDispatch();
	const pendingTodos = useSelector((state) => state.todos.filter(todo => todo.status == "Pending"));
    const completedTodos = useSelector((state) => state.todos.filter(todo => todo.status == "Done"));
    const navigate = useNavigate();
    const handleAddClick = () => navigate(`/add`);
    console.log(completedTodos);

	useEffect(() => {
		dispatch(getAllTodos());
	}, [dispatch]);

	return (
        <div className='container'>
            <div className='row home-header'>
                <div className='col-md-10 col-sm-10'>
                    <h1>Todo assignment</h1>
                </div>
                <div className='col-md-2 col-sm-2 add-btn-column'>
                    <button type="button" className="btn btn-primary"  onClick={() => handleAddClick() }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="pending-todo-container">
                <div className="row">
                    <h2> Pending Todos </h2>
                </div>
                {pendingTodos.map((todo) => (
                    <TodoComponent id={todo.id} name={todo.name} description={todo.description} status={todo.status} dueDate={todo.dueDate} />    
                ))}
            </div>

            <div className="completed-todo-container">
                <div className="row">
                   <h2> Completed Todos </h2>
                    
                </div>
                {completedTodos.map((todo) => (
                    <TodoComponent id={todo.id} name={todo.name} description={todo.description} status={todo.status} dueDate={todo.dueDate} />    
                ))}
            </div>
           
        </div>
		
	);
};

export default TodoList;