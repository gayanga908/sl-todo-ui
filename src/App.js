import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import EditTodo from './component/edit/EditTodoComponent';
import TodoList from './component/home/TodoList';
import AddTodoComponent from './component/add/AddTodoComponent';
import ViewTodoComponent from './component/View/ViewTodoComponent';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/add" element={<AddTodoComponent />} />
          <Route path="/view/:id" element={<ViewTodoComponent />} />
          <Route path="/edit/:id" element={<EditTodo />} />
        </Routes>
    </Router>
    // <TodoList />
    
  );
}

export default App;
