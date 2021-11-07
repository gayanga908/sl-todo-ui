import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAllTodos = createAsyncThunk(
	'todos/getAllTodos',
	async () => {
		const resp = await fetch('http://localhost:8080/api/todos');
		if (resp.ok) {
			const todos = await resp.json();
			return { todos };
		}
	}
);

export const addTodoAsync = createAsyncThunk(
	'todos/addTodoAsync',
	async (payload) => {
		const resp = await fetch('http://localhost:8080/api/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(
                { 
                    name: payload.name,
                    description: payload.description,
                    dueDate: payload.dueDate,
                    status: "Pending"
                }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);

export const markCompleteAsync = createAsyncThunk(
	'todos/markCompleteAsync',
	async (payload) => {
		const resp = await fetch(`http://localhost:8080/api/todos/${payload.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ 
                name: payload.name,
                description: payload.description,
                dueDate: payload.dueDate, 
                status: payload.status 
            }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);

export const updateTodoAsync = createAsyncThunk(
	'todos/updateTodoAsync',
	async (payload) => {
		const resp = await fetch(`http://localhost:8080/api/todos/${payload.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(
                { 
                    name: payload.name,
                    description: payload.description,
                    dueDate: payload.dueDate, 
                    status: payload.status
                }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);

export const deleteTodoAsync = createAsyncThunk(
	'todos/deleteTodoAsync',
	async (payload) => {
		const resp = await fetch(`http://localhost:8080/api/todos/${payload.id}`, {
			method: 'DELETE',
		});

		if (resp.ok) {
			return { id: payload.id };
		}
	}
);

export const todoSlice = createSlice({
	name: 'todos',
	initialState: [],
	reducers: {
		addTodo: (state, action) => {
			const todo = {
                name: action.payload.name,
                description: action.payload.description,
                dueDate: action.payload.dueDate,
                status: "Pending",
			};
			state.push(todo);
		},
		completeTodo: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload.id);
			state[index].name = action.payload.name;
            state[index].description = action.payload.description;
            state[index].dueDate = action.payload.dueDate;
            state[index].status = action.payload.status;
		},
        updateTodo: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload.id);
			state[index].name = action.payload.name;
            state[index].description = action.payload.description;
            state[index].dueDate = action.payload.dueDate;
            state[index].status = action.payload.status;
		},
		deleteTodo: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id);
		},
	},
	extraReducers: {
		[getAllTodos.fulfilled]: (state, action) => {
			return action.payload.todos;
		},
		[addTodoAsync.fulfilled]: (state, action) => {
			state.push(action.payload.todo);
		},
		[markCompleteAsync.fulfilled]: (state, action) => {
			const index = state.findIndex(
				(todo) => todo.id === action.payload.todo.id
			);
			state[index].name = action.payload.name;
            state[index].description = action.payload.description;
            state[index].dueDate = action.payload.dueDate;
            state[index].status = action.payload.status;
		},
        [updateTodoAsync.fulfilled]: (state, action) => {
			const index = state.findIndex(
				(todo) => todo.id === action.payload.todo.id
			);
			state[index].name = action.payload.name;
            state[index].description = action.payload.description;
            state[index].dueDate = action.payload.dueDate;
            state[index].status = action.payload.status;
		},
		[deleteTodoAsync.fulfilled]: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id);
		},
	},
});

export const { addTodo, updateTodo, deleteTodo, completeTodo } = todoSlice.actions;

export default todoSlice.reducer;