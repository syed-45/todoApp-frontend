import axios from "axios";
import { useState } from "react";

export interface todoType {
  id: number;
  todo: string;
  creationDate?: Date;
  //   handleEditCLick: any;
}

function TodoList(props: todoType): JSX.Element {
  const [todoReadOnly, setTodoReadOnly] = useState(true);
  const [todoInput, setTodoInput] = useState(props.todo);

  const handleTodoEdit = (editText: string): void => {
    setTodoInput(editText);
  };

  const handleOnEditEnter = (key: string): void => {
    if (key === "Enter") {
      axios.patch(`https://todo-list-syed.herokuapp.com/items/${props.id}`, {
        todo: todoInput,
      });
      setTodoReadOnly(true);
    }
  };

  return (
    <>
      <input
        className="todoListClass"
        value={todoInput}
        readOnly={todoReadOnly}
        id={"inputTodo" + props.id.toString()}
        onChange={(ev) => handleTodoEdit(ev.target.value)}
        onKeyPress={(ev) => handleOnEditEnter(ev.key)}
      ></input>
      <button className="editClass" onClick={() => setTodoReadOnly(false)}>
        EDIT{" "}
      </button>
      <button className="deleteClass"> DELETE</button>
    </>
  );
}

export default TodoList;
