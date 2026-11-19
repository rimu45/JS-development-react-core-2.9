import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import "./App.css";
import type { TodoTask, Filter } from "./types";

function App() {
  const [tasks, setTasks] = useState<TodoTask[]>(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);

      return parsedTasks.map((task: TodoTask) => ({
        ...task,
        createdAt: new Date(task.createdAt),
      }));
    }

    return [
      {
        id: "1",
        description: "Completed task",
        completed: true,
        createdAt: new Date(),
      },
      {
        id: "2",
        description: "Editing task",
        completed: false,
        editing: true,
        createdAt: new Date(),
      },
      {
        id: "3",
        description: "Active task",
        completed: false,
        createdAt: new Date(),
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(value: string) {
    if (value.trim() === "") {
      return;
    }
    const newTask = {
      id: crypto.randomUUID(),
      description: value.trim(),
      completed: false,
      createdAt: new Date(),
    };

    setTasks((prev) => [newTask, ...prev]);
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      }),
    );
  }

  function startEditing(id: string) {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            editing: true,
          };
        }
        return {
          ...task,
          editing: false,
        };
      }),
    );
  }

  function cancelEditing(id: string) {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            editing: false,
          };
        }
        return task;
      }),
    );
  }
  function saveTask(id: string, description: string) {
    if (description.trim() === "") {
      return;
    }
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            description: description.trim(),
            editing: false,
          };
        }
        return task;
      }),
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) =>
      prev.filter((task) => {
        return task.id !== id;
      }),
    );
  }

  const [filter, setFilter] = useState<Filter>("all");
  function filterTask() {
    if (filter === "active") {
      return tasks.filter((task) => {
        return !task.completed;
      });
    }
    if (filter === "completed") {
      return tasks.filter((task) => {
        return task.completed;
      });
    }
    return tasks;
  }

  const activeTasks = tasks.filter((task) => !task.completed);

  const activeCount = activeTasks.length;

  const hasCompletedTasks = tasks.some((task) => task.completed);

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  return (
    <section className="todoapp">
      <NewTaskForm onAdd={addTask} />
      <section className="main">
        <TaskList
          tasks={filterTask()}
          onToggle={toggleTask}
          onEdit={startEditing}
          onSave={saveTask}
          onDelete={deleteTask}
          onCancel={cancelEditing}
        />
        <Footer
          filter={filter}
          setFilter={setFilter}
          incomplete={activeCount}
          clearCompleted={clearCompleted}
          hasCompletedTasks={hasCompletedTasks}
        />
      </section>
    </section>
  );
}

export default App;
