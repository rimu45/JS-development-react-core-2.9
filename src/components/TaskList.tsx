import Task from './Task';

function TaskList(props: {
  tasks: {
    id: number;
    description: string;
    completed: boolean;
    createdAt: Date;
    editing?: boolean;
  }[];
  onToggle: (id: number) => void;
  onEdit: (id: number) => void;
  onSave: (id: number, description: string) => void;
  onDelete: (id: number) => void;
}) {
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
        />
      ))}
    </ul>
  );
}

export default TaskList;