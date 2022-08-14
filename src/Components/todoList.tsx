import axios from "axios";
import { useState } from "react";

export interface todoType {
  id: number;
  todo: string;
  checked: boolean;
  // creationDate?: Date;
  onClick: (id: number) => void;
}

function TodoList(props: todoType): JSX.Element {
  const [todoReadOnly, setTodoReadOnly] = useState(true);
  const [todoInput, setTodoInput] = useState(props.todo);
  const [checked, setChecked] = useState(props.checked);
  const [checkSign, setCheckSign] = useState(checked ? "● " : "◯ ");

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

  const handleCheckClick = (): void => {
    console.log("checked");
    axios
      .patch(`https://todo-list-syed.herokuapp.com/items/${props.id}`, {
        checked: !checked,
      })
      .then(() => {
        if (!checked === true) {
          setCheckSign("● ");
        } else {
          setCheckSign("◯ ");
        }
        setChecked(!checked);
      });
  };

  return (
    <div className="listClass">
      <div className="checkClass" onClick={() => handleCheckClick()}>
        {checkSign}
      </div>
      <input
        className="todoListClass"
        value={todoInput}
        readOnly={todoReadOnly}
        onChange={(ev) => handleTodoEdit(ev.target.value)}
        onKeyPress={(ev) => handleOnEditEnter(ev.key)}
        style={{ textDecoration: checked ? "line-through" : "none" }}
      ></input>
      <button className="editClass" onClick={() => setTodoReadOnly(false)}>
        EDIT
      </button>
      <button className="deleteClass" onClick={() => props.onClick(props.id)}>
        DELETE
      </button>
    </div>
  );
}

export default TodoList;
