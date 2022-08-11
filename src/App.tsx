import "./App.css";
import { useState } from "react";

function App(): JSX.Element {
  const [inputText, setInputText] = useState("");

  const handleOnEnter = (key: string): void => {
    if (key === "Enter") {
      console.log("entered!");
    }
  };

  const handleInputChange = (input: string): void => {
    setInputText(input)
  }

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
        {/* divs collected here from database in REST API stored in Heroku */}
        <div className="todoListClass"> - go gorceries </div> <div className="editClass">EDIT     </div><div className="deleteClass"> DELETE</div>
        <div className="todoListClass"> - clean laundry </div> <div className="editClass">EDIT </div><div className="deleteClass"> DELETE</div>
        <div className="todoListClass"> - buy charger </div> <div className="editClass">EDIT </div><div className="deleteClass"> DELETE</div>
      </main>
    </>
  );
}

export default App;
