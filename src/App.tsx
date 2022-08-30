import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import TodoList from "./Components/todoList";

interface todoData {
  todo: string;
  id: number;
  checked: boolean;
}

function App(): JSX.Element {
  const [inputText, setInputText] = useState("");
  const [allTodos, setAllTodos] = useState<todoData[]>([]);

  useEffect(() => {
    axios.get("https://todo-list-syed.herokuapp.com/items/").then((res) => {
      setAllTodos(res.data);
    });
  }, []);

  const handleOnEnter = (key: string): void => {
    if (key === "Enter") {
      axios
        .post("https://todo-list-syed.herokuapp.com/items/", {
          todo: inputText,
          checked: false,
        })
        .then((res) => setAllTodos([...allTodos, res.data]));
      setInputText("");
    }
  };

  const handleInputChange = (input: string): void => {
    setInputText(input);
  };

  const handleDeleteClick = (id: number): void => {
    console.log(id);

    axios
      .delete(`https://todo-list-syed.herokuapp.com/items/${id}`)
      .then(() => setAllTodos(allTodos.filter((oneData) => oneData.id !== id)));
  };

  return (
    <>
      <h1>TODO APP</h1>
      <input
        className="addTodoClass"
        value={inputText}
        onKeyPress={(ev) => handleOnEnter(ev.key)}
        onChange={(ev) => handleInputChange(ev.target.value)}
        placeholder="Create a new todo..."
      ></input>
      <main>
        {allTodos.map((oneData) => (
          <TodoList
            todo={oneData.todo}
            id={oneData.id}
            key={oneData.id}
            onClick={handleDeleteClick}
            checked={oneData.checked}
          />
        ))}
      </main>
    </>
  );
}

export default App;
