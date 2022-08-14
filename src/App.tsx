import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import TodoList from "./Components/todoList";

function App(): JSX.Element {
  const [inputText, setInputText] = useState("");
  const [allTodos, setAllTodos] = useState<JSX.Element[]>([]);

  useEffect(() => {
    axios.get("https://todo-list-syed.herokuapp.com/items/").then((res) => {
      console.log(res);
      setAllTodos(
        res.data.map(
          (oneData: { todo: string; id: number; checked: boolean }) => (
            <TodoList
              todo={oneData.todo}
              id={oneData.id}
              key={oneData.id}
              onClick={handleDeleteClick}
              checked={oneData.checked}
            />
          )
        )
      );
    });
  }, []);

  const handleOnEnter = (key: string): void => {
    if (key === "Enter") {
      axios
        .post("https://todo-list-syed.herokuapp.com/items/", {
          todo: inputText,
          checked: false,
        })
        .then((res) =>
          setAllTodos([
            ...allTodos,
            <TodoList
              todo={res.data.todo}
              id={res.data.id}
              key={res.data.id}
              onClick={handleDeleteClick}
              checked={false}
            />,
          ])
        );
      setInputText("");
    }
  };

  const handleInputChange = (input: string): void => {
    setInputText(input);
  };

  const handleDeleteClick = (id: number): void => {
    const currentTodos = [...allTodos];
    const removeIndex = currentTodos.findIndex((todo) => {
      if (todo.key) {
        return parseInt(todo.key.toString()) === id;
      }
      return false;
    });
    // currentTodos.splice(removeIndex);
    // setAllTodos(currentTodos)
    console.log(removeIndex);
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
      <main>{allTodos}</main>
    </>
  );
}

export default App;
