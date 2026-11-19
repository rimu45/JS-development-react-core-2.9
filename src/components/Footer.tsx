import TaskFilter from "./TaskFilter";
import type { Filter } from "../types";

type FooterProps = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  incomplete: number;
  clearCompleted: () => void;
  hasCompletedTasks: boolean;
};

function Footer({
  filter,
  setFilter,
  incomplete,
  clearCompleted,
  hasCompletedTasks,
}: FooterProps) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {incomplete} {incomplete === 1 ? "item" : "items"} left
      </span>
      <TaskFilter filter={filter} setFilter={setFilter} />
      {hasCompletedTasks && (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
}

export default Footer;
