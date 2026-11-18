import TaskFilter from "./TaskFilter";

type FooterProps = {
  filter: string;
  setFilter: (filter: string) => void;
  incomplete: number
  clearCompleted: () => void
};

function Footer({ filter, setFilter, incomplete, clearCompleted }: FooterProps) {
  return (
    <footer className="footer">
      <span className="todo-count">{incomplete} items left</span>
      <TaskFilter 
      filter={filter} 
      setFilter={setFilter} 
      />
      <button className="clear-completed"
      onClick={clearCompleted}
      >Clear completed</button>
    </footer>
  );
}

export default Footer;
