import Task from "./Task";
import type { TodoTask } from "../types";

type TaskListProps = {
  tasks: TodoTask[];
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onSave: (id: string, description: string) => void;
  onDelete: (id: string) => void;
  onCancel: (id: string) => void;
};

function TaskList(props: TaskListProps) {
  return (
    <ul className="todo-list">
      {props.tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          description={task.description}
          completed={task.completed}
          editing={task.editing}
          createdAt={task.createdAt}
          onToggle={props.onToggle}
          onEdit={props.onEdit}
          onSave={props.onSave}
          onDelete={props.onDelete}
          onCancel={props.onCancel}
        />
      ))}
    </ul>
  );
}

export default TaskList;
