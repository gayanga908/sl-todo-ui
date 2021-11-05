import axios from 'axios';

const TodoService = {

    getAllTodos : async() => {
        let response = await axios.get('http://localhost:8080/api/todos');
        return response.data;
    },

    saveTodo : async (value) => {
        await axios.post('http://localhost:8080/api/todos', {
            name: value,
            description: 'test desc',
            status : "pending"
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

}

export default TodoService;