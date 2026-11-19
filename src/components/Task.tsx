import { useState, useEffect } from "react";
import { formatDistance } from "date-fns";
import type { TodoTask } from "../types";

type TaskProps = TodoTask & {
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSave: (id: string, description: string) => void;
  onCancel: (id: string) => void;
};
function Task({ editing = false, ...props }: TaskProps) {
  const [value, setValue] = useState(props.description);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(props.description);
  }, [props.description]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <li
      className={`${props.completed ? "completed" : ""} ${editing ? "editing" : ""}`}
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
          <span className="created">
            created{" "}
            {formatDistance(props.createdAt, now, {
              addSuffix: true,
              includeSeconds: true,
            })}
          </span>
        </label>

        <button
          className="icon icon-edit"
          onClick={() => {
            props.onEdit(props.id);
          }}
        ></button>

        <button
          className="icon icon-destroy"
          onClick={() => {
            props.onDelete(props.id);
          }}
        ></button>
      </div>

      {editing && (
        <input
          className="edit"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              props.onSave(props.id, value);
            }
            if (event.key === "Escape") {
              props.onCancel(props.id);
            }
          }}
          onBlur={() => props.onSave(props.id, value.trim())}
          autoFocus
        />
      )}
    </li>
  );
}

export default Task;
