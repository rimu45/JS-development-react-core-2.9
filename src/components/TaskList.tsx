import Task from './Task';

function TaskList (props: {
  tasks: {
    id: number;
    description: string;
    completed: boolean;
    createdAt: Date;
    editing? : boolean;
  }[];
}) {
  return (
    <ul className = "todo-list">
      {props.tasks.map((task) => (
        <Task 
        key = {task.id}
        description= {task.description}
        completed = {task.completed}
        editing={task.editing}
        createdAt = {task.createdAt}
        
        />
      ))}
    </ul>
  );
}

export default TaskList;