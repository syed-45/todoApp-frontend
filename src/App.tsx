import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import TodoList, { todoType } from "./Components/todoList";

// function updateTodoDB() {
//   axios.post("https://todo-list-syed.herokuapp.com/items/",{"todo":"go shopping!"})
//     .then((res) => console.log(res));
// }

// updateTodoDB()

function App(): JSX.Element {
  const [inputText, setInputText] = useState("");
  const [allTodos, setAllTodos] = useState<JSX.Element[]>([]);

  useEffect(() => {
    axios.get("https://todo-list-syed.herokuapp.com/items/").then((res) => {
      console.log(res);
      setAllTodos(
        res.data.map((oneData: { todo: string; id: number }) => (
          <TodoList todo={oneData.todo} id={oneData.id} key={oneData.id} />
        ))
      );
    });
  }, []);

  const handleOnEnter = (key: string): void => {
    if (key === "Enter") {
      console.log("entered!");
      //send current input to backend
      axios
        .post("https://todo-list-syed.herokuapp.com/items/", {
          todo: inputText,
        })
        .then((res) =>
          setAllTodos([
            ...allTodos,
            <TodoList
              todo={res.data.todo}
              id={res.data.id}
              key={res.data.id}
            />,
          ])
        );
      setInputText("");
    }
  };

  const handleInputChange = (input: string): void => {
    setInputText(input);
  };

  // const handleEditCLick

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
        {allTodos}
        <div className="todoListClass"> - go gorceries </div>{" "}
        <div className="editClass">EDIT </div>
        <div className="deleteClass"> DELETE</div>
        <div className="todoListClass"> - clean laundry </div>{" "}
        <div className="editClass">EDIT </div>
        <div className="deleteClass"> DELETE</div>
        <div className="todoListClass"> - buy charger </div>{" "}
        <div className="editClass">EDIT </div>
        <div className="deleteClass"> DELETE</div>
      </main>
    </>
  );
}

export default App;
