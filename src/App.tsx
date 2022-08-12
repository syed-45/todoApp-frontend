import "./App.css";
import { useState } from "react";
import axios from "axios";

// function updateTodoDB() {
//   axios.post("https://todo-list-syed.herokuapp.com/items/",{"todo":"go shopping!"})
//     .then((res) => console.log(res));
// }

// updateTodoDB()

function App(): JSX.Element {
  const [inputText, setInputText] = useState("");
  const [text, setText] = useState("");

  const handleOnEnter = (key: string): void => {
    if (key === "Enter") {
      console.log("entered!");
      //send current input to backend
      axios.get("https://todo-list-syed.herokuapp.com/items/").then((res) => {
        console.log(res);
        setText(res.data[7].todo);
      });
    }
  };

  const handleInputChange = (input: string): void => {
    setInputText(input);
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
        {/* divs collected here from database in REST API stored in Heroku DB */}
        {text}
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
