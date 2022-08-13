import { useState } from "react";

export interface todoType {
  id: number;
  todo: string;
  creationDate?: Date;
  //   handleEditCLick: any;
}

function TodoList(props: todoType): JSX.Element {
  const [todoEdit, setTodoEdit] = useState(true);
  return (
    <>
      <input
        className="todoListClass"
        placeholder={props.todo}
        readOnly={todoEdit}
        id={"inputTodo" + props.id.toString()}
      ></input>
      <div className="editClass" onClick={() => setTodoEdit(false)}>
        EDIT{" "}
      </div>
      <div className="deleteClass"> DELETE</div>
    </>
  );
}

export default TodoList;
