import { useState, useEffect } from 'react';

function Task(props: {
  id: number;
  description: string;
  completed: boolean;
  createdAt: Date;
  editing?: boolean;
  onToggle: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onSave: (id: number, description: string) => void;
}) {
  const [value, setValue] = useState(props.description);

  useEffect(() => {
    setValue(props.description);
  }, [props.description]);

  return (
    <li
      className={`${props.completed ? 'completed' : ''} ${props.editing ? 'editing' : ''}`}
    >
      <div className="view">
        <input
          id={`toggle-${props.id}`}
          className="toggle"
          type="checkbox"
          checked={props.completed}
          onChange={() => {
            props.onToggle(props.id);
          }}
        />

        <label htmlFor={`toggle-${props.id}`}>
          <span className="description">{props.description}</span>
        </label>

        <button
          className="icon icon-edit"
          onClick={() => {
            props.onEdit(props.id);
          }}
        ></button>

        <button className="icon icon-destroy"
         onClick={() => {
            props.onDelete(props.id);
          }}
        ></button>
      </div>

      {props.editing && (
        <input
          className="edit"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              props.onSave(props.id, value);
            }
          }}
          autoFocus
        />
      )}
    </li>
  );
}

export default Task;