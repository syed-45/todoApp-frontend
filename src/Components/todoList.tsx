export interface todoType {
  id: number;
  todo: string;
  creationDate?: Date;
}

function TodoList(props: todoType): JSX.Element {
  return (
    <>
      <div className="todoListClass"> {props.todo} </div>
      <div className="editClass">EDIT </div>
      <div className="deleteClass"> DELETE</div>
    </>
  );
}

export default TodoList;
