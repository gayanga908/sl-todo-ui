/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateTodoAsync, getAllTodos } from '../../redux/todoSlice';
import todoService from "../../service/todoService";
import { Link } from "react-router-dom";


const EditTodo = ({ match }) => {

    const { id } = useParams();
    const [ todoId ] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [todoNew, setTodoNew] = useState('');

    const todo = useSelector((state) => {
        const todo = state.todos.find(todo => todo.id == id);
        // setName(todo.name);
        // setDescription(todo.description);
        // setDueDate(todo.dueDate);
        //setStatus(todo.status);
        return todo;
    });
    console.log(id);
    console.log(todo);
        
    

    let navigate = useNavigate();
	
    const dispatch = useDispatch();

	const onSubmit = async (event) => {
		event.preventDefault();
		if (name) {
            await Promise.all([
			dispatch(
				updateTodoAsync({
                    id,
					name,
                    description,
                    dueDate,
                    status: todo.status
				})
			)
            ]);
		}
        dispatch(getAllTodos());
        navigate('/');
	};

    return (
        <div>
            <form onSubmit={onSubmit} className='form-inline mt-3 mb-3'>
                <label className='sr-only'>Title</label>
                <input
                    name='name'
                    type='text'
                    className='form-control mb-2 mr-sm-2'
                    placeholder='Title'
                    // value={name}
                    defaultValue={todo.name}
                    onChange={(event) => setName(event.target.value)}
                ></input>

                <label className='sr-only'>Description</label>
                <input
                    name='description'
                    type='text'
                    className='form-control mb-2 mr-sm-2'
                    placeholder='Title'
                    //value={description}
                    defaultValue={todo.description}
                    onChange={(event) => setDescription(event.target.value)}
                ></input>

                <label className='sr-only'>Due Date</label>
                <input
                    name='dueDate'
                    type='text'
                    className='form-control mb-2 mr-sm-2'
                    placeholder='Title'
                    // value={dueDate}
                    defaultValue={todo.dueDate}
                    onChange={(event) => setDueDate(event.target.value)}
                ></input>

                <button type='submit' className='btn btn-primary mb-2'>
                    Submit
                </button>
            </form>

            <Link to={{pathname : `/`}}>Back to home</Link>
        </div>
	);
    

}

export default EditTodo;