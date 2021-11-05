import React, { useEffect, useState } from 'react';
// import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTodos, deleteTodoAsync, markCompleteAsync } from '../../redux/todoSlice';
import todoService from "../../service/todoService";
import { Link } from "react-router-dom";

const TodoList = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todos);
    // const todo = useSelector((state) => state.todo);

    const [value, setValue] = useState('');

    const onSubmit = async (event) => {
		event.preventDefault();
		if (value) {
			await todoService.saveTodo(value);
		}

        dispatch(getAllTodos());
	};

	useEffect(() => {
		dispatch(getAllTodos());
	}, [dispatch]);

    // useEffect(() => {
	// 	dispatch(getTodo({ id : "3"}));
	// }, [dispatch]);

    const handleDeleteClick = (id) => {
		dispatch(deleteTodoAsync({ id }));
	};

    const handleMarkDoneClick = async (todo) => {
        await Promise.all([
            dispatch(markCompleteAsync(
                {   
                    id: todo.id,
                    name: todo.name,
                    description: todo.description,
                    dueDate: todo.dueDate,
                    status: "Done" 
                    }
                    ))
        ]);
		

                dispatch(getAllTodos());
	};

	return (
        <div>
            <Link to={{pathname : `/add`}}>Add Todo</Link>
            <ul className='list-group'>
           
           {todos.map((todo) => (
               <div>
                   <h1>{todo.name}</h1>
                   <p>{todo.description}</p>
                   <p>{todo.status}</p>
                   <Link to={{pathname : `/edit/${todo.id}`}}>edit</Link>
                   <button onClick={() => handleDeleteClick(todo.id)} className='btn btn-danger'>
					    Delete
				    </button>
                    <button onClick={() => handleMarkDoneClick(todo)} className='btn btn-danger'>
					    Mark done
				    </button>
                   <br></br>
               </div>
               
           ))}
       </ul>

       <div>
        <form onSubmit={onSubmit} className='form-inline mt-3 mb-3'>
                <label className='sr-only'>Name</label>
                <input
                    type='text'
                    className='form-control mb-2 mr-sm-2'
                    placeholder='Add todo...'
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                ></input>

                <button type='submit' className='btn btn-primary mb-2'>
                    Submit
                </button>
            </form>
       </div>

                {/* <div>
                    get one todo
                   <h1>{todo.name}</h1>
                   <p>{todo.description}</p>
                   <p>{todo.status}</p>
                   <br></br>
               </div> */}
        </div>
		
	);
};

export default TodoList;