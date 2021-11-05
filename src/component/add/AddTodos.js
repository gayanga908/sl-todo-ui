import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../../redux/todoSlice';
import { useNavigate } from 'react-router-dom';

const AddTodoComponent = () => {
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    let navigate = useNavigate();
	
    const dispatch = useDispatch();

	const onSubmit = async (event) => {
		event.preventDefault();
		if (name) {
            await Promise.all([
			dispatch(
				addTodoAsync({
					name,
                    description,
                    dueDate
				})
			)
            ]);
		}
        navigate('/');
	};

	return (
		<form onSubmit={onSubmit} className='form-inline mt-3 mb-3'>
			<label className='sr-only'>Title</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Title'
				value={name}
				onChange={(event) => setName(event.target.value)}
			></input>

            <label className='sr-only'>Description</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Title'
				value={description}
				onChange={(event) => setDescription(event.target.value)}
			></input>

            <label className='sr-only'>Due Date</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Title'
				value={dueDate}
				onChange={(event) => setDueDate(event.target.value)}
			></input>

			<button type='submit' className='btn btn-primary mb-2'>
				Submit
			</button>
		</form>
	);
};

export default AddTodoComponent;